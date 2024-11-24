const router = require("express").Router();
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const { createCard, getCardsByBoardId, updateCard, deleteCard, updateCardBoard, getUsers} = require("./card.controller");

router.post('/add-card', createCard);
router.post('/update-board', updateCardBoard)
router.get('/get-users', getUsers)

// router.get('/cards/:boardId', getCardsByBoardId);
router.put('/update/:id', updateCard);
router.delete('/delete/:id', deleteCard);

module.exports = router;