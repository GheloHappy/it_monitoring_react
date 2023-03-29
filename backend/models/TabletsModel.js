import db from "../config/database.js";

// export const getTablets = (result) => {
//     db.query("SELECT * FROM tablets ORDER BY id DESC", (err,results) => {
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result(null, results);
//         }
//     });
// }

export const getTablets = (result) => {
    db.query("SELECT tablets.id, tablets.company, tablets.item_name, tablets.model, tablets.dop, tablets.date_added, tablets.serial, " + 
    "tablets.qty, tablets.price, tablets.others, tablets.remarks, latest_transaction.transaction, latest_transaction.assigned_name, latest_transaction.date_recret " + 
    "FROM tablets LEFT JOIN (SELECT item_id, MAX(date_added) AS latest_date_added FROM transactions GROUP BY item_id) AS latest_dates " +
    "ON tablets.id = latest_dates.item_id LEFT JOIN transactions AS latest_transaction ON latest_dates.item_id = latest_transaction.item_id " + 
    "AND latest_dates.latest_date_added = latest_transaction.date_added ORDER BY tablets.id DESC", (err,results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const getTabletById = (id, result) => {
    db.query("SELECT DISTINCT tablets.*, transactions.assigned_name, transactions.transaction, transactions.company as holder_company FROM tablets LEFT JOIN " + 
    "( SELECT item_id, MAX(id) AS id FROM transactions GROUP BY item_id) latest_transactions" + 
    " ON tablets.id = latest_transactions.item_id LEFT JOIN transactions " + 
    "ON latest_transactions.id = transactions.id WHERE tablets.id = ?", 
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

export const getTabletsInventory = (result) => {
    db.query("SELECT DISTINCT id, company, item_name, model, dop, date_added, serial, SUM(qty) AS total_qty, price, others, remarks FROM tablets GROUP BY item_name", 
    (err, results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const insertTablet = (data, result) => {
    db.query("INSERT INTO tablets SET ?", 
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

export const updateTabletById = (data, id, result) => {
    db.query("UPDATE tablets SET company = ?, item_name = ?, model = ?, serial = ?"+
    ", dop = ?, others = ?, remarks = ?, qty = ?, price = ? WHERE id = ?",
    [
        data.company, 
        data.item_name, 
        data.model,
        data.serial,
        data.dop,
        data.others,
        data.remarks,
        data.qty,
        data.price,
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

export const deleteTablet = (id, result) => {
    db.query("DELETE FROM tablets WHERE id = ?", 
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