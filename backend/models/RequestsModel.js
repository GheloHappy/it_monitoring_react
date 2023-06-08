import db from "../config/database.js";

export const getRequests= (result) => {
    db.query("SELECT * FROM requests_header ORDER BY date_requested DESC",
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
    db.query("SELECT * FROM requests_header WHERE id = ?ORDER BY date_requested DESC",
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

export const getRequestLatestId = (result) => {
    db.query("SELECT MAX(id) AS latest_id FROM requests_header",
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
    db.query("INSERT INTO requests_header SET ?", 
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

export const insertRequestItem = (data, result) => {
    db.query("INSERT INTO requests_line SET ?", 
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
    db.query("UPDATE requests_header SET date_received = ?, pending = ? WHERE id = ?",
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