const express = require('express');
const UserRouter = express.Router();
const { Registration, LogIn, userInfoSave, userInfoGet, deleteUser } = require('../Controllers/UserController')

UserRouter.post("/signup", Registration);
UserRouter.post("/login", LogIn);
UserRouter.patch("/saveuserinfo", userInfoSave);
UserRouter.get("/getuserinfo", userInfoGet);
UserRouter.delete("/deleteUser", deleteUser)

module.exports = UserRouter;