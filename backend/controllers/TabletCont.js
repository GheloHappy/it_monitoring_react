import {
    getTablets,
} from "../models/TabletsModel.js";

export const showTablets = async (req, res) => {
    getTablets((err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}