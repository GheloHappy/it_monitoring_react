import db from "../config/database.js";

export const getTablets = (result) => {
    db.query("SELECT * FROM tablets", (err,results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}