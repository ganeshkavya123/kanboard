const { _createCard, _getCardsByBoardId, _updateCard, _deleteCard } = require('./card.service');
const { API_RESPONSE_MESSAGES, API_RESPONSE_STATUS_CODE } = require('../../../common/constants');

module.exports = {
    createCard: async (req, res) => {
        const { title, description, status, board_id } = req.body;

        const result = await _createCard({ title, description, status, board_id });
        if (result.success) {
            return res.status(201).json({
                status: API_RESPONSE_STATUS_CODE.SUCCESS,
                message: API_RESPONSE_MESSAGES.SUCCESS,
                data: result.data,
            });
        }
        return res.status(500).json({
            status: API_RESPONSE_STATUS_CODE.FAILED,
            message: result.message,
        });
    },

    getCardsByBoardId: async (req, res) => {
        const { boardId } = req.params;
        const result = await _getCardsByBoardId(boardId);
        
        if (result.success) {
            return res.json({
                status: API_RESPONSE_STATUS_CODE.SUCCESS,
                message: API_RESPONSE_MESSAGES.SUCCESS,
                data: result.data,
            });
        }
        return res.status(500).json({
            status: API_RESPONSE_STATUS_CODE.FAILED,
            message: result.message,
        });
    },

    updateCard: async (req, res) => {
        const { id } = req.params;
        const updates = req.body;

        const result = await _updateCard(id, updates);
        if (result.success) {
            return res.json({
                status: API_RESPONSE_STATUS_CODE.SUCCESS,
                message: result.message,
            });
        }
        return res.status(500).json({
            status: API_RESPONSE_STATUS_CODE.FAILED,
            message: result.message,
        });
    },

    deleteCard: async (req, res) => {
        const { id } = req.params;

        const result = await _deleteCard(id);
        if (result.success) {
            return res.json({
                status: API_RESPONSE_STATUS_CODE.SUCCESS,
                message: result.message,
            });
        }
        return res.status(500).json({
            status: API_RESPONSE_STATUS_CODE.FAILED,
            message: result.message,
        });
    },
};
