const { Pool, Client } = require('pg')
require('dotenv').config()
var fs = require('fs');
const { resourceLimits } = require('worker_threads');


//getting top 5 posts
exports.getAll = async (req, res, next) => {

    const pool = new Pool(
        {
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            host: 'localhost',
            port: 5432
        })
    pool.query("SELECT userstable.username as userid,userstable.userid as id, posts.postid, content, date, title,isread FROM posts INNER JOIN userstable on posts.userid=userstable.userid LEFT JOIN (SELECT isread,postid FROM isreadtable  WHERE userid=$1) as ala  on ala.postid=posts.postid ORDER BY date DESC LIMIT 5", [req.authenticated.userid], (sqlerror, result) => {

        if (sqlerror) {
            res.status(500).json({ error: sqlerror })
        }
        else {
            try {
                res.status(200).json(result.rows)

            }

            catch (err) {
                res.status(500).json({ error: err.message })
            }
        }

    })

}

exports.getChunk = async (req, res, next) => {
    const pool = new Pool(
        {
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            host: 'localhost',
            port: 5432
        })
    try {
        if (req.query.next == "true") {
            pool.query("SELECT userstable.username as userid,userstable.userid as id, posts.postid, content, date, title,isread FROM posts INNER JOIN userstable on posts.userid=userstable.userid LEFT JOIN (SELECT isread,postid FROM isreadtable  WHERE userid=$2) as ala  on ala.postid=posts.postid WHERE date<$1 ORDER BY date DESC LIMIT 5", [req.query.id, req.authenticated.userid], (sqlerror, result) => {

                if (sqlerror) {

                    res.status(500).json({ error: sqlerror })
                }
                else {
                    try {

                        res.status(200).json(result.rows)

                    }


                    catch (err) {
                        res.status(500).json({ error: err.message })
                    }
                }

            })
        }
        else {
            pool.query("SELECT userstable.username as userid,userstable.userid as id, posts.postid, content, date, title,isread FROM posts INNER JOIN userstable on posts.userid=userstable.userid LEFT JOIN (SELECT isread,postid FROM isreadtable  WHERE userid=$2) as ala  on ala.postid=posts.postid WHERE date>$1 ORDER BY date DESC LIMIT 5", [req.query.id, req.authenticated.userid], (sqlerror, result) => {
                if (sqlerror) {
                    res.status(500).json({ error: sqlerror })
                }
                else {
                    try {
                        res.status(200).json(result.rows)

                    }


                    catch (err) {
                        res.status(500).json({ error: err.message })
                    }
                }

            })
        }
    }

    catch (err) {
        res.status(500).json({ error: err.message })

    }

}


//getting one post
exports.getOne = async (req, res, next) => {
    const pool = new Pool(
        {
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            host: 'localhost',
            port: 5432
        })
    try {
        pool.query("SELECT userstable.username as userid, posts.postid, content, date, title,isread,isreadtable.userid as readby, img FROM posts INNER JOIN userstable on posts.userid=userstable.userid LEFT JOIN isreadtable on isreadtable.postid=posts.postid WHERE posts.postid=$1", [req.query.id], (sqlerror, result) => {

            if (sqlerror) {
                res.status(500).json({ error: sqlerror })
            }
            else {
                try {
                    if (result.rows[0].img !== "") {
                        let tempImg = result.rows[0].img;
                        const url = req.protocol + '://' + req.get('host');
                        result.rows[0].img = url + "/images/" + tempImg;


                    }
                    let isread = false;
                    result.rows.forEach(item => {
                        if (req.authenticated.userid == item.readby) {
                            isread = true;

                        }
                    })
                    if (!isread) {
                        pool.query("INSERT into isreadtable(userid,postid,isread) VALUES($1,$2,$3) ", [req.authenticated.userid, req.query.id, true], (secondsqlerror, secondresult) => {
                            if (secondsqlerror) {
                                res.status(500).json({ error: secondsqlerror })
                            }
                            else {

                            }
                        })
                    };
                    res.status(200).json(result.rows[0])


                }
                catch (err) {
                    res.status(500).json({ error: err.message })
                }
            }

        })

    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }

}

// adding new post !
exports.addPost = async (req, res, next) => {
    let user = req.authenticated.user;
    let postDate = Date.now();
    const pool = new Pool(
        {
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            host: 'localhost',
            port: 5432
        })
    try {

        let tempPost = JSON.parse(req.body.post)
        let fileName = "";
        if (req.file) {
            fileName = req.file.filename;
        }
        pool.query('INSERT INTO posts(userid,date,content,title,img) VALUES((SELECT userid FROM userstable WHERE username=$1),$2,$3,$4,$5)', [user, postDate, tempPost.post, tempPost.title, fileName], (sqlerror, result) => {
            if (sqlerror) {
                res.status(500).json({ error: sqlerror })
            } else {

                res.status(201).json({ message: 'Success' })


            }


        });
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }

}


//update post
exports.updatePost = (req, res, next) => {



    let user = req.authenticated.user;
    let postDate = Date.now();
    const pool = new Pool(
        {
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            host: 'localhost',
            port: 5432
        })
    try {


        let tempPost = JSON.parse(req.body.post)
        let query = 'UPDATE posts SET content = $1, title = $2 WHERE postid = $3'
        let variables = [tempPost.post, tempPost.title, tempPost.id];
        if (user !== tempPost.userid)
            throw 'Incorrect Request';
        let fileName = "";
        if (req.file) {
            fileName = req.file.filename;
            variables.push(fileName)
            query = 'UPDATE posts SET content = $1, title = $2, img = $4 WHERE postid = $3';
            subQuery = 'SELECT img from posts WHERE postid=$1'
            pool.query(subQuery, [tempPost.id], (sqlerror, result) => {
                if (sqlerror) {
                    res.status(500).json({ error: sqlerror })
                } else {
                    let oldFileName = result.rows[0].img;
                    pool.query(query, variables, (sqlerror, result) => {
                        if (sqlerror) {
                            res.status(500).json({ error: sqlerror })
                        } else {
                            fs.unlinkSync('./images/' + oldFileName)
                            res.status(201).json({ message: req.body })


                        }
                    });


                }
            })
        }
        else {
            pool.query(query, variables, (sqlerror, result) => {
                if (sqlerror) {
                    res.status(500).json({ error: sqlerror })
                } else {
                    res.status(201).json({ message: req.body })


                }
            });
        }

    }
    catch (err) {
        res.status(500).json({ error: err })
    }

}

//delete post
exports.deletePost = (req, res, next) => {

    const pool = new Pool(
        {
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_DATABASE,
            host: 'localhost',
            port: 5432
        })
    try {
        let user = req.authenticated.user;

        pool.query("SELECT userstable.username as userid,img FROM posts INNER JOIN userstable on posts.userid=userstable.userid WHERE postid=$1", [req.query.id], (sqlerror, result) => {
            try {
                var fileName = result.rows[0].img;
                if (user !== result.rows[0].userid)
                    throw 'Incorrect Request';

                pool.query('DELETE FROM posts WHERE postid=$1', [req.query.id], (sqlerror, result) => {
                    if (sqlerror) {
                        res.status(500).json({ error: sqlerror })
                    } else {
                        if (fileName !== '') {
                            fs.unlinkSync('./images/' + fileName)
                        }
                        res.status(201).json({ message: 'DELETED' })


                    }


                });
            }
            catch (err) {
                res.status(500).json({ error: err.message })
            }
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}




