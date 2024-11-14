const knex = require('../../../config/knex');
const { TABLE_NAME } = require('../../../common/tablenames');

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
};
