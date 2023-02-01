import express from "express";
import {
    showUsers,
    showUsersById,
    createUser,
    updateUser,
    destroyUser,
} from "../controllers/UserCont.js";

import {
    showTablets,
} from "../controllers/TabletCont.js";

import { loginUser, validateToken } from "../controllers/AuthCont.js";

const router = express.Router();
//users
router.get("/users", showUsers);
router.get("/users:id", showUsersById);
router.post("/user", createUser);
router.put("/users:id", updateUser);
router.delete("/users:id", destroyUser);
router.post('/login', loginUser);
router.post('/protected', validateToken);

//tablets
router.get("/tablets", showTablets);

export default router;