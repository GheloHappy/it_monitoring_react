import jwt from "jsonwebtoken";
import { getUsers } from "../models/UsersModel.js";
import bcrypt from "bcrypt";

const secret = process.env.JWT_SECRET || 'secret';

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    getUsers((err, results) => {
        if (err) {
            res.send(err);
        } else {
            //res.json(results);
            //const user = results.find(u => u.username === username && u.password === password);
            const user = results.find(function (u) {
                return u.username === username;
            })
            if (!user) {
                return res.status(401).send({ "result": "Username or password is incorrect" });
            }
            bcrypt.compare(password, user.password, (err, hash) => {
                if (err) {
                    throw err;
                }
                if (hash) {
                    const token = jwt.sign({ id: user.id }, secret, { algorithm: 'HS256' });
                    res.send({
                        "id": user.id,
                        "name": user.name,
                        token
                    });
                } else {
                    return res.status(401).send({ "result": "Username or password is incorrect" });
                }
            });
        }
    });
}

export const validateToken = async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, secret);
        //console.log('Token is valid:', decoded);
        return res.status(200).send({'decoded':'Token is valid:'});
    } catch (error) {
        return res.status(400).send({ error: 'Invalid token' });
    }
}