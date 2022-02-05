const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool, Client } = require('pg')
var fs = require('fs');
require('dotenv').config()

exports.signUp = async (req, res, next) => {
    const pool = new Pool(
        {
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            host: 'localhost',
            port: 5432
        })
    try {
        if (req.body.password.search(" ") >= 0)
            throw "password cannot contain spaces!"
        if (req.body.username.search(" ") >= 0)
            throw "username cannot contain spaces!"
        if (req.body.username === req.body.password)
            throw "cannot be same password as username!"
        if (req.body.password.length < 5)
            throw "too short Password!"
        if (req.body.username.length < 5)
            throw "too short username"
        bcrypt.hash(req.body.password, 10).then((hash) => {
            try {
                pool.query('INSERT INTO userstable(username,passhash) VALUES ($1,$2)', [req.body.username, hash], (sqlerror, result) => {
                    if (sqlerror) {
                        res.status(500).json({ error: 'user already exist' })
                    } else {
                        setTimeout(() => {
                            res.status(202).json({ message: 'Success' })
                        }, 3000);

                    }


                });
            }
            catch (err) {
                res.status(500).json({ error: 'user already exist' })
            }
        })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: err });
    }


}


exports.login = async (req, res, next) => {
    const pool = new Pool(
        {
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            host: 'localhost',
            port: 5432
        })

    pool.query('SELECT username,passhash,shortdesc,userid FROM userstable WHERE username=$1', [req.body.username], (sqlerror, result) => {

        if (sqlerror) {
            res.status(500).json({ error: sqlerror })
        }
        else {
            try {
                bcrypt.compare(req.body.password, result.rows[0].passhash).then((loggedIn) => {
                    if (loggedIn) {
                        const token = jwt.sign({
                            user: req.body.username,
                            userid: result.rows[0].userid,
                        }, process.env.SUPERSECRET, { expiresIn: 60 * 15 });
                        res.status(201).json({ userId: req.body.username, token: token })
                    }
                    else {
                        res.status(401).json({ error: "Wrong credentials" })

                    }
                }).catch((err) => {
                    res.status(500).json({ error: err })
                })
            }
            catch (err) {
                res.status(500).json({ error: err.message })
            }
        }

    })

}


exports.deleteUser = (req, res, next) => {
    const pool = new Pool(
        {
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            host: 'localhost',
            port: 5432
        })
    pool.query('SELECT img FROM posts WHERE userid=$1', [req.authenticated.userid], (sqlerror, result) => {
        if (sqlerror) {
            res.status(500).json({ message: sqlerror })
        }
        else {
            result.rows.forEach(item => {
                if (item.img != "")
                    fs.unlinkSync('./images/' + item.img)
            })
            pool.query('DELETE FROM userstable WHERE userid=$1', [req.authenticated.userid], (sqlerror, result) => {
                if (sqlerror) {
                    res.status(500).json({ message: sqlerror })
                }
                else {
                    res.status(204).json({ message: "User deleted!" });
                }
            });
        }
    })

}