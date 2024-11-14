const { TABLE_NAME } = require('../../../common/tablenames')
const knex = require('../../../config/knex')
const { API_RESPONSE_MESSAGES, } = require('../../../common/constants')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


module.exports = {

    _display: async (data) => {
        let isSuccess = false;
        let resObj = {
          success: false,
          message: "",
          status_code: 0,
          data:[]
        };
    
        try {
            const result = await knex.select().from(TABLE_NAME.Student)

            resObj.data = result
            isSuccess = true;
            
        }catch(error){
            console.log(error);
        }

        resObj.success = isSuccess;
        return resObj;
    },
    _simpleFileUpload:  async (data) => {
        let isSuccess = false;
        let resObj = {
          success: false,
          message: "",
        //   data:[]
        };
    
        try {

            console.log(data);
            await knex.transaction(async trx => {
                const result = await knex(TABLE_NAME.Files)
                    .insert({
                        name: data.originalname,
                        data: data.buffer,
                        mime_type: data.mimetype
                    },"id");


                    // "filename": "c-sharp.jpg",
                    // "mimetype": "image/jpeg",
                    // "file": "https://servs.com/uploads/1716458611397.jpg"
                resObj.data = {
                    filename: data.originalname,
                    mime_type: data.mimetype,
                    file: ''
                }
                isSuccess = true;
                resObj.message = 'success';
            });
            
        }catch(error){
            console.log(error);
        }

        resObj.success = isSuccess;
        return resObj;
    },
    _fileUploadToFolder:  async (data) => {
        let isSuccess = false;
        let resObj = {
          success: false,
          message: "",
        //   data:[]
        };
    
        try {

            console.log(data);
            await knex.transaction(async trx => {
                const result = await knex(TABLE_NAME.Files)
                    .insert({
                        name: data.originalname,
                        data: data.buffer,
                        mime_type: data.mimetype,
                        path: data.path
                    },"id");


                    // "file": "https://servs.com/uploads/1716458611397.jpg"
                resObj.data = {
                    filename: data.originalname,
                    mime_type: data.mimetype,
                    file_path: data.path
                }
                isSuccess = true;
                resObj.message = 'success';
            });
            
        }catch(error){
            console.log(error);
        }
        
        resObj.success = isSuccess;
        return resObj;
    },
    _registerUser: async (username, email, password) => {
        let resObj = { success: false, data: null };

        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await knex(TABLE_NAME.User).insert({ username, email, password: hashedPassword });

            resObj.success = true;
            resObj.data = { id: result[0], username, email };
        } catch (error) {
            console.log(error);
        }

        return resObj;
    },

    _loginUser: async (email, password) => {
        let resObj = { success: false, data: null };

        try {
            const user = await knex(TABLE_NAME.User).where({ email }).first();
            if (user && await bcrypt.compare(password, user.password)) {
                resObj.success = true;
                resObj.data = { id: user.id, username: user.username, email: user.email };
            }
        } catch (error) {
            console.log(error);
        }

        return resObj;
    },
}