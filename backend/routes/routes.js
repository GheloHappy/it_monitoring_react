import express from "express";
import {
    showUsers,
    showUsersById,
    createUser,
    updateUser,
    destroyUser,
} from "../controllers/UserCont.js";

const router = express.Router();

router.get("/users", showUsers);
router.get("/users:id", showUsersById);
router.post("/user", createUser);
router.put("/users:id", updateUser);
router.delete("/users:id", destroyUser);

export default router;