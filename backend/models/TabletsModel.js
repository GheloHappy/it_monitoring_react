import db from "../config/database.js";

export const getTablets = (result) => {
    db.query("SELECT * FROM tablets ORDER BY id DESC", (err,results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });
}

export const getTabletById = (id, result) => {
    db.query("SELECT * FROM tablets WHERE id = ?", 
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