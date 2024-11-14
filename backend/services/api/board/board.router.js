const router = require("express").Router();
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const {authenticateToken} = require('../middleware/auth.middleware');
const { getBoards, createBoard, deleteBoard } = require("./board.controller");

router.get("/get-boards", getBoards )
router.post("/create-board", createBoard)
router.post("/delete-board", deleteBoard)

module.exports = router;