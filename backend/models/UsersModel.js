import db from "../config/database.js";

export const getUsers = (result) => {
    db.query("SELECT id,name FROM users", (err,results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const getValidUsers = (result) => {
    db.query("SELECT * FROM users", (err,results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const getUserById = (id, result) => {
    db.query("SELECT * FROM users WHERE id = ?", 
    [id], 
    (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const insertUser = (data, result) => {
    db.query("INSERT INTO users SET ?", 
    [data],
    (err, results) => { 
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const updateUserById = (data, id, result) => {
    db.query("UPDATE users SET username = ?, password = ?, name = ? WHERE id = ?",
    [data.username, data.password, data.name, id],
    (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const deleteUser = (id, result) => {
    db.query("DELETE FROM users WHERE id = ?", 
    [id],
    (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}