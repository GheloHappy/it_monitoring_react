import db from "../config/database.js";

export const getTabletsTransactions = (result) => {
    db.query("SELECT transactions.transaction, transactions.company, transactions.assigned_name, transactions.item_type," +
    "transactions.qty , transactions.remarks, transactions.date_received, transactions.date_returned, tablets.item_name, tablets.model," + 
    "tablets.serial, tablets.serial, tablets.others FROM transactions LEFT JOIN tablets ON transactions.item_id = tablets.id",
    (err,results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const getLatestTranByItemId = (id, result) => {
    db.query("SELECT transaction FROM transactions WHERE item_id = ? ORDER BY date_added DESC LIMIT 1", 
    [id], 
    (err,results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const insertTabletTransaction= (data, result) => {
    db.query("INSERT INTO transactions SET ?", 
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
