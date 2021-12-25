const { Pool, Client } = require('pg')
require('dotenv').config()

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
    pool.query("SELECT userstable.username as userid, postid, content, date, title FROM posts INNER JOIN userstable on posts.userid=userstable.userid ORDER BY date DESC LIMIT 5", (sqlerror, result) => {

        if (sqlerror) {
            res.status(500).json({ error: sqlerror })
        }
        else {
            try {

                setTimeout(() => {
                    res.status(200).json(result.rows)
                }, 1500);


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
        if (req.body.next) {
            console.log('next')
            pool.query("SELECT userstable.username as userid, postid, content, date, title FROM posts INNER JOIN userstable on posts.userid=userstable.userid  WHERE date<$1 ORDER BY date DESC LIMIT 5", [req.body.date], (sqlerror, result) => {

                if (sqlerror) {
                    res.status(500).json({ error: sqlerror })
                }
                else {
                    try {

                        setTimeout(() => {
                            res.status(200).json(result.rows)
                        }, 1500);


                    }
                    catch (err) {
                        res.status(500).json({ error: err.message })
                    }
                }

            })
        }
        else {
            console.log('prev')
            console.log(req.body.date)
            pool.query("SELECT * FROM (SELECT userstable.username as userid, postid, content, date, title FROM posts INNER JOIN userstable on posts.userid=userstable.userid WHERE date>$1 ORDER BY date ASC LIMIT 5) as luke ORDER BY date DESC", [req.body.date], (sqlerror, result) => {

                if (sqlerror) {
                    res.status(500).json({ error: sqlerror })
                }
                else {
                    try {

                        setTimeout(() => {
                            res.status(200).json(result.rows)
                        }, 1500);


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
        pool.query('INSERT INTO posts(userid,date,content,title) VALUES((SELECT userid FROM userstable WHERE username=$1),$2,$3,$4)', [user, postDate, req.body.post.post, req.body.post.title], (sqlerror, result) => {
            if (sqlerror) {
                res.status(500).json({ error: sqlerror })
            } else {
                setTimeout(() => {
                    res.status(202).json({ message: 'Success' })
                }, 3000);

            }


        });
    }
    catch (err) {
        res.status(500).json({ error: error })
    }

}


//update post


//delete post
exports.deletePost = (req, res, next) => {


}



//like or dislike post

exports.likePost = (req, res, next) => {


}
