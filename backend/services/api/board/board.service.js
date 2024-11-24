const knex = require('../../../config/knex');
const { TABLE_NAME } = require('../../../common/tablenames');

module.exports = {
    _createBoard: async (userId, title) => {
        let resObj = { success: false, data: null };

        try {
            const result = await knex(TABLE_NAME.Board).insert({ userId, title }, ['id', 'title']);
            resObj.success = true;
            resObj.data = result[0];
        } catch (error) {
            console.log(error);
        }

        return resObj;
    },

    _getBoards: async (userId) => {
        let resObj = { success: false, data: [] };

        try {
            const board = await knex(TABLE_NAME.Board);
            await Promise.all(board.map(async (itm) => {
                console.log('Fetching cards for board:', itm.id);
    
                const cardsOfBoard = await knex(TABLE_NAME.Card).where({ boardId: itm.id });
                
                itm['cards'] = cardsOfBoard.length !== 0 ? cardsOfBoard : [];
            }));
            resObj.success = true;
            resObj.data = board;
        } catch (error) {
            console.log(error);
        }

        return resObj;
    },

    _deleteBoard: async (boardId) => {
        let resObj = { success: false };

        try {
            await knex(TABLE_NAME.Board).where({ id: boardId }).del();
            resObj.success = true;
        } catch (error) {
            console.log(error);
        }

        return resObj;
    },
    _updateBoard: async (id, updates) => {
        try {
            await knex(TABLE_NAME.Board).where({ id }).update(updates);
            return { success: true, message: 'Card updated successfully' };
        } catch (error) {
            console.error(error);
            return { success: false, message: 'Error updating card' };
        }
    },
};
