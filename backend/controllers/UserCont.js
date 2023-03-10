import bcrypt, { hash } from "bcrypt";
import {
    getUsers,
    getUserById,
    insertUser,
    updateUserById,
    deleteUser,
} from "../models/UsersModel.js";

export const showUsers = async (req, res) => {
    getUsers((err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const showUsersById = async (req, res) => {
    getUserById(req.params.id, 
        (err, results) => {
            if(err) {
                res.send(err);
            } else {
                res.json(results);
            }
        }
    );
}

export const createUser = async (req, res) => {
    const { username, password } = req.body;
    getUsers((err, results) => {
        if(err) {
            res.send(err);
        } else {
            const user = results.find(function(u) {
                return u.username === username;
            })
            if (user) {
                return res.status(401).send({"message":"User already exists."});
            } else {
                const saltRounds = 10;
                
                bcrypt.hash(password, saltRounds, function(err, hash) {
                    if(err) {
                        console.log(err);
                    } else {
                        const data = {
                            "username": req.body.username,
                            "password": hash,
                            "name": req.body.name,
                        }
                    
                        //const data = req.body;
                        insertUser(data,
                            (err, results) => {
                                if(err) {
                                    res.send(err);
                                } else {
                                    res.json(results);
                                }
                            }
                        );
                    }
                });
            }
        }
    });
}

export const updateUser = async (req, res) => {
    const data = req.params.data;
    const id = req.params.id;
    updateUserById(data, id,
        (err, results) => {
            if(err) {
                res.send(err);
            } else {
                res.json(results);
            }
        }
    );
}

export const destroyUser = async (req, res) => {
    const id = req.params.id;
    deleteUser(id,
        (err, results) => {
            if(err) {
                res.send(err);
            } else {
                res.json(results);
            }
        }
    );
}