const knex = require('../../../config/knex');
const { TABLE_NAME } = require('../../../common/tablenames');
const { API_RESPONSE_MESSAGES } = require('../../../common/constants');

module.exports = {
    _createCard: async (cardData) => {
        try {
            const [id] = await knex(TABLE_NAME.Card).insert(cardData, 'id');
            return { success: true, data: { id, ...cardData } };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Error creating card' };
        }
    },

    _getCardsByBoardId: async (board_id) => {
        try {
            const cards = await knex(TABLE_NAME.Card).where({ boardId: board_id });
            return { success: true, data: cards };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Error fetching cards' };
        }
    },

    _updateCard: async (id, updates) => {
        try {
            await knex(TABLE_NAME.Card).where({ id }).update(updates);
            return { success: true, message: 'Card updated successfully' };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Error updating card' };
        }
    },

    _deleteCard: async (id) => {
        try {
            await knex(TABLE_NAME.Card).where({ id }).del();
            return { success: true, message: 'Card deleted successfully' };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Error deleting card' };
        }
    },
    _updateCardBoard: async (cardId, targetBoardId) => {
        try {
          const rowsAffected = await knex(TABLE_NAME.Card)
            .where({ id: cardId })
            .update({ boardId: targetBoardId });
      
          if (rowsAffected > 0) {
            return { success: true };
          } else {
            return { success: false, message: 'No rows updated. Invalid cardId or boardId.' };
          }
        } catch (error) {
          console.error(error);
          return { success: false, message: 'Database error while updating boardId' };
        }
      },
      _getUsers: async () => {
        try {
          const data = await knex(TABLE_NAME.User)
          return { success: true, data: data };
        } catch (error) {
          console.error(error);
          return { success: false, message: 'Server Error' };
        }
      },
      

};
