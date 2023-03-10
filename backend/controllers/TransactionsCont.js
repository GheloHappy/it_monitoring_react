import { getLatestTranByItemId, getTabletsTransactions  } from "../models/TransactionsModel.js";

export const showTabletsTransactions = async (req, res) => {
    getTabletsTransactions((err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results[0]);
        }
    });
}

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