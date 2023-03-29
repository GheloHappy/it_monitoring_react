import {
    getTablets,
    insertTablet,
    updateTabletById,
    deleteTablet,
    getTabletById,
    getTabletsInventory,
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
                res.json(results[0]);
            }
        }
    );
}

export const showTabletInventory = async (req, res) => {
    getTabletsInventory((err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const createTablet = async (req, res) => {
    const data = req.body;
    insertTablet(data, (err, results) => {
        if(err) res.send(err);
        else res.json(results);
    })
}

export const updateTablet = async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    try {
        // const results = await updateTabletById(data, id, );
        // res.json(results);
        updateTabletById(data, id, (err, results) => {
            if(err) {
                res.send(err);
            } else {
                res.json(results);
            }
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
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