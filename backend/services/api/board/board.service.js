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
            const result = await knex(TABLE_NAME.Board).where({ userId });
            resObj.success = true;
            resObj.data = result;
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
};
