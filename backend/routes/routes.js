import express from "express";

import { loginUser, validateToken } from "../controllers/AuthCont.js";

import {
    showUsers,
    showUsersById,
    createUser,
    updateUser,
    destroyUser,
} from "../controllers/UserCont.js";

import {
    showTablets,
    createTablet,
    updateTablet,
    destroyTablet,
    showTabletById,
    showTabletInventory,
} from "../controllers/TabletCont.js";

import {
    createRequest,
    showRequests,
    showRequestsById,
    updateRequest,
} from "../controllers/RequestsCont.js";

import { 
    createTransaction,
    showLatestTranByItemId, 
} from "../controllers/TransactionsCont.js";

import { createLog, showLogs } from "../controllers/LogsCont.js";

const router = express.Router();
//users
router.get("/users", showUsers);
router.get("/users:id", showUsersById);
router.post("/user", createUser);
router.put("/users:id", updateUser);
router.delete("/users/:id", destroyUser);
router.post('/login', loginUser);
router.post('/protected', validateToken);

//tablets
router.get("/tablets", showTablets);
router.get("/tablets/:id", showTabletById);
router.post("/tablets", createTablet);
router.put("/tablets/:id", updateTablet);
router.delete("/tablets/:id", destroyTablet);

//requests
router.get("/requests", showRequests);
router.get("/requests/:id", showRequestsById);
router.post("/request", createRequest);
router.put("/request/:id", updateRequest);

//transactions
//router.get("/transactions", showTabletsTransactions);
router.get("/transactions/:id", showLatestTranByItemId);
router.post("/transaction", createTransaction);

//inventory
router.get("/inventory", showTabletInventory);

//logs
router.get("/logs", showLogs);
router.post("/log", createLog);
export default router;