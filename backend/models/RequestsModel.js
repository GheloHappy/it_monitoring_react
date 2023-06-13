import db from "../config/database.js";

export const getRequests = (result) => {
    db.query("SELECT * FROM requests ORDER BY date_requested DESC",
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
}

export const getRequestsById = (id, result) => {
    db.query("SELECT * FROM requests WHERE id = ? ORDER BY date_requested DESC",
        [id],
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
}

export const getRequestsByRef = (id, result) => {
    db.query("SELECT * FROM requests WHERE refnbr = ? ORDER BY date_requested DESC",
        [id],
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
}

export const getRequestLatestId = (result) => {
    db.query("SELECT MAX(id) AS latest_id FROM requests",
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
}

// export const insertRequest = (data, result) => {
//     db.query("INSERT INTO requests SET ?", 
//     [data],
//     (err, results) => { 
//         if(err) {
//             console.log(err);
//             result(err, null);
//         } else {
//             result(null, results);
//         }
//     });
// }

export const insertRequest = (data, result) => {
    const items = data.items; // Extract the items array from the data object
    delete data.items; // Remove the items array from the data object

    // Prepare the bulk insert data as an array of arrays
    const bulkInsertData = items.map((item) => [
        data.department,
        data.date_requested,
        data.purpose,
        data.input_user,
        data.refnbr,
        item.qty,
        item.description,
        item.remarks,
    ]);

    // Perform the bulk insert
    db.query(
        "INSERT INTO requests (department,date_requested,purpose,input_user,refnbr,qty, description, remarks) VALUES ?",
        [bulkInsertData],
        (err, results) => {
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        }
    );
};


export const insertRequestItem = (data, result) => {
    db.query("INSERT INTO requests SET ?",
        [data],
        (err, results) => {
            if (err) {
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
            if (err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });
}