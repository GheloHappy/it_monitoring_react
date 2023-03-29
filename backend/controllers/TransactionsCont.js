import { getLatestTranByItemId, insertTransaction  } from "../models/TransactionsModel.js";
//import { getLatestTranByItemId, getTabletsTransactions, insertTransaction  } from "../models/TransactionsModel.js";

// export const showTabletsTransactions = async (req, res) => {
//     getTabletsTransactions((err, results) => {
//         if(err) {
//             res.send(err);
//         } else {
//             res.json(results[0]);
//         }
//     });
// }

export const showLatestTranByItemId = async (req, res) => {
    getLatestTranByItemId(req.params.id, 
        (err, results) => {
            if(err) {
                res.send(err);
            } else {
                res.json(results[0]);
            }
        }
    );
}

export const createTransaction = async (req, res) => {
    const data = req.body;
    insertTransaction(data, (err, results) => {
        if(err) res.send(err);
        else res.json(results);
    })
}