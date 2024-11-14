const router = require("express").Router();
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const { createCard, getCardsByBoardId, updateCard, deleteCard } = require("./card.controller");

router.post('/cards', createCard);
router.get('/cards/:boardId', getCardsByBoardId);
router.put('/cards/:id', updateCard);
router.delete('/cards/:id', deleteCard);

module.exports = router;