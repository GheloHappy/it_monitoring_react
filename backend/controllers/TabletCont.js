import {
    getTablets,
    insertTablet,
    updateTabletById,
    deleteTablet,
    getTabletById,
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

export const showTabletById = async (req, res) => {
    getTabletById(req.params.id, 
        (err, results) => {
            if(err) {
                res.send(err);
            } else {
                res.json(results);
            }
        }
    );
}

export const createTablet = async (req, res) => {
    const data = req.body;
    insertTablet(data, (err, results) => {
        if(err) res.send(err);
        else res.json(results);
    })
}

export const updateTablet = async (req, res) => {
    const data = req.params.data;
    const id = req.params.id;
    updateTablet(data, id,
        (err, results) => {
            if(err) {
                res.send(err);
            } else {
                res.json(results);
            }
        }
    );
}

export const destroyTablet = async (req, res) => {
    const id = req.params.id;
    deleteTablet(id,
        (err, results) => {
            if(err) {
                res.send(err);
            } else {
                res.json(results);
            }
        }
    );
}