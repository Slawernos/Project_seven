const jwt = require('jsonwebtoken')
const express = require('express')

exports.pingAuth = (req, res, next) => {

    try {
        const token = JSON.parse(req.headers.authorization);
        jwt.verify(token.token, process.env.SUPERSECRET, (err, decoded) => {
            if (err) {
                throw 'invalid user ID';
            } else {
                res.sendStatus(201);
            }
        })
    }
    catch (err) {
        res.status(401).json({ error: err.message });
    }

}
exports.auth = (req, res, next) => {
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

