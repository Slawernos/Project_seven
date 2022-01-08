const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool, Client } = require('pg')
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


exports.login = async (req, res, next) => {
    const pool = new Pool(
        {
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            host: 'localhost',
            port: 5432
        })

    pool.query('SELECT username,passhash,shortdesc FROM userstable WHERE username=$1', [req.body.username], (sqlerror, result) => {

        if (sqlerror) {
            res.status(500).json({ error: sqlerror })
        }
        else {
            try {
                bcrypt.compare(req.body.password, result.rows[0].passhash).then((loggedIn) => {
                    if (loggedIn) {
                        const token = jwt.sign({
                            user: req.body.username
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