import jwt from "jsonwebtoken";
import {getUsers} from "../models/UsersModel.js";
import bcrypt from "bcrypt";


export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    getUsers((err, results) => {
        if(err) {
            res.send(err);
        } else {
            //res.json(results);
            //const user = results.find(u => u.username === username && u.password === password);
            const user = results.find(function(u) {
                return u.username === username;
            })
            if (!user) {
                return res.status(401).send({"result":"Username or password is incorrect"});
            }
            bcrypt.compare(password, user.password, (err, hash) => {
                if (err) { 
                    throw err;
                }
                if(hash) {
                    const token = jwt.sign({ id: user.id }, 'jwtSecret');
                    res.send({ 
                        "id":user.id,
                        "name":user.name,
                        token 
                    });
                } else {
                    return res.status(401).send({"result":"Username or password is incorrect"});
                }
            });
        }
    });
}