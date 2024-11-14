const { API_RESPONSE_MESSAGES, API_RESPONSE_STATUS_CODE } = require('../../../common/constants');
const { _createBoard, _getBoards, _deleteBoard } = require('./board.service');

module.exports = {
    createBoard: async (req, res) => {
        const { title } = req.body;
        const userId = req.user.id;  
        try {
            const result = await _createBoard(userId, title);

            if (result.success) {
                return res.json({
                    status: API_RESPONSE_STATUS_CODE.SUCCESS,
                    message: API_RESPONSE_MESSAGES.BOARD_CREATED,
                    data: result.data,
                });
            } else {
                return res.status(400).json({
                    status: API_RESPONSE_STATUS_CODE.FAILED,
                    message: API_RESPONSE_MESSAGES.BOARD_CREATION_FAILED,
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: API_RESPONSE_STATUS_CODE.FAILED,
                message: API_RESPONSE_MESSAGES.SERVER_ERROR,
            });
        }
    },

    getBoards: async (req, res) => {
        const userId = req.user.id;

        try {
            const result = await _getBoards(userId);

            return res.json({
                status: API_RESPONSE_STATUS_CODE.SUCCESS,
                message: API_RESPONSE_MESSAGES.SUCCESS,
                data: result.data,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: API_RESPONSE_STATUS_CODE.FAILED,
                message: API_RESPONSE_MESSAGES.SERVER_ERROR,
            });
        }
    },

    deleteBoard: async (req, res) => {
        const { boardId } = req.params;

        try {
            const result = await _deleteBoard(boardId);

            if (result.success) {
                return res.json({
                    status: API_RESPONSE_STATUS_CODE.SUCCESS,
                    message: API_RESPONSE_MESSAGES.BOARD_DELETED,
                });
            } else {
                return res.status(400).json({
                    status: API_RESPONSE_STATUS_CODE.FAILED,
                    message: API_RESPONSE_MESSAGES.BOARD_DELETION_FAILED,
                });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: API_RESPONSE_STATUS_CODE.FAILED,
                message: API_RESPONSE_MESSAGES.SERVER_ERROR,
            });
        }
    },
};
