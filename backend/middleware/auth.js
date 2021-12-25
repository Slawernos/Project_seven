const jwt = require('jsonwebtoken')
const express = require('express')


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        jwt.verify(token, process.env.SUPERSECRET, (err, decoded) => {
            if (err) {
                throw 'invalid user ID';
            } else {
                req.authenticated = decoded;
                next();
            }
        })
    }
    catch (err) {
        res.status(401).json({ error: err.message });
    }

}

