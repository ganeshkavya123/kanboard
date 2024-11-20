const { _createCard, _getCardsByBoardId, _updateCard, _deleteCard, _updateCardBoard, _getUsers } = require('./card.service');
const { API_RESPONSE_MESSAGES, API_RESPONSE_STATUS_CODE } = require('../../../common/constants');

module.exports = {
    createCard: async (req, res) => {
        const { title, label, user, dueDate, boardId } = req.body;

        const result = await _createCard({ title, label, user, dueDate, boardId});
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
    updateCardBoard: async (req, res) => {
        const { cardId, targetBoardId } = req.body; 
      
        try {
          const result = await _updateCardBoard(cardId, targetBoardId);
      
          if (result.success) {
            return res.status(200).json({
              status: API_RESPONSE_STATUS_CODE.SUCCESS,
              message: API_RESPONSE_MESSAGES.SUCCESS,
            });
          }
      
          return res.status(400).json({
            status: API_RESPONSE_STATUS_CODE.FAILED,
            message: result.message,
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            status: API_RESPONSE_STATUS_CODE.FAILED,
            message: 'Error updating card boardId',
          });
        }
      },
      getUsers : async (req, res) => {
      
        try {
          const result = await _getUsers();
          console.log('result');

            console.log(result);
            
          if (result.success) {
            return res.status(200).json({
              status: API_RESPONSE_STATUS_CODE.SUCCESS,
              message: API_RESPONSE_MESSAGES.SUCCESS,
              data: result.data,
            });
          }
      
          return res.status(400).json({
            status: API_RESPONSE_STATUS_CODE.FAILED,
            message: result.message,
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            status: API_RESPONSE_STATUS_CODE.FAILED,
            message: 'Error updating card boardId',
          });
        }
      }, 
};
