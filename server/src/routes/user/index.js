const express = require("express");

const userController = require("../../controller/user.controller");
const router = express.Router();

router.post("/subscribe", userController.newUser);
router.get("/verify", userController.checkEmailToken);
router.post("/unsubscribe", userController.deleteUser);

module.exports = router;
