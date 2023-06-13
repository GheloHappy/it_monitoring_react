import {
    getRequestLatestId,
    getRequests, getRequestsById, getRequestsByRef, insertRequest, insertRequestItem, updateRequestById,
} from "../models/RequestsModel.js";

export const showRequests = async (req, res) => {
    getRequests((err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results);
        }
    });
}

export const showRequestsById = async (req, res) => {
    getRequestsById(req.params.id, 
        (err, results) => {
            if(err) {
                res.send(err);
            } else {
                res.json(results[0]);
            }
        }
    );
}

export const showRequestsByRef = async (req, res) => {
    getRequestsByRef(req.params.id, 
        (err, results) => {
            if(err) {
                res.send(err);
            } else {
                res.json(results);
            }
        }
    );
}


export const showRequestLatestId = async (req, res) => {
    getRequestLatestId((err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.json(results[0]);
        }
    });
}

// export const createRequest= async (req, res) => {
//     const data = req.body;
//     insertRequest(data, (err, results) => {
//         if(err) res.send(err);
//         else res.json(results);
//     })
// }


export const createRequest = async (req, res) => {
    const data = req.body;
    insertRequest(data, (err, results) => {
      if (err) res.send(err);
      else res.json(results);
    });
  };

export const createRequestItem = async (req, res) => {
    const data = req.body;
    insertRequestItem(data, (err, results) => {
        if(err) res.send(err);
        else res.json(results);
    })
}



export const updateRequest = async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    try {
        // const results = await updateTabletById(data, id, );
        // res.json(results);
        updateRequestById(data, id, (err, results) => {
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