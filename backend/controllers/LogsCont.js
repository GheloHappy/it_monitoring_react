import { getLogs, insertLog } from "../models/LogsModel.js";


export const createLog = async (req, res) => {
    const data = req.body;
    insertLog(data, (err, results) => {
        if(err) res.send(err);
        else res.json(results);
    })
}

export const showLogs = async (req, res) => {
    getLogs((err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}