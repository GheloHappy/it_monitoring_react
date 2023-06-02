import db from "../config/database.js";

export const getRequests= (result) => {
    db.query("SELECT * FROM requests ORDER BY date_requested DESC",
    (err,results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const getRequestsById = (id, result) => {
    db.query("SELECT * FROM requests WHERE id = ?ORDER BY date_requested DESC",
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


export const insertRequest = (data, result) => {
    db.query("INSERT INTO requests SET ?", 
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

export const updateRequestById = (data, id, result) => {
    db.query("UPDATE requests SET date_received = ?, pending = ? WHERE id = ?",
    [
        data.date_received,
        data.pending,
        id
    ],
    (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}