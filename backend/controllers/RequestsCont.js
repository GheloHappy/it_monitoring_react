import {
    getRequests, insertRequest,
} from "../models/Requests.js";

export const showRequests = async (req, res) => {
    getRequests((err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const createRequest= async (req, res) => {
    const data = req.body;
    insertRequest(data, (err, results) => {
        if(err) res.send(err);
        else res.json(results);
    })
}
