import db from "../config/database.js";

export const getRequests= (result) => {
    db.query("SELECT * FROM requests ORDER BY date_requested ASC",
    (err,results) => {
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