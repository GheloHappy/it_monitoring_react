import db from "../config/database.js";

export const insertLog= (data, result) => {
    db.query("INSERT INTO logs SET ?", 
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

export const getLogs = (result) => {
    db.query("SELECT * FROM logs ORDER BY date_added DESC",
    (err,results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}