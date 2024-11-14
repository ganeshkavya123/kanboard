const { API_RESPONSE_MESSAGES, API_RESPONSE_STATUS_CODE } = require('../../../common/constants')
const { _display, _simpleFileUpload, _fileUploadToFolder, _registerUser, _loginUser } = require('./home.service')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports={
    display: async (req, res) => {

        const currentDateUtc = new Date(new Date().toUTCString());

        // if(!req.body.BidRequestId){
        //     return res.status(400).json({
        //         status: API_RESPONSE_STATUS_CODE.FAILED,
        //         message: API_RESPONSE_MESSAGES.BAD_REQUEST,
        //     });
        // }

        try{

            let result = await _display();

            if(result.success){

                if(result.data.length!=0){
                    return res.json({
                        status: API_RESPONSE_STATUS_CODE.SUCCESS,
                        message: API_RESPONSE_MESSAGES.SUCCESS,
                        data: result.data
                    });
                }else{
                    return res.json({
                        status: API_RESPONSE_STATUS_CODE.SUCCESS,
                        message: API_RESPONSE_MESSAGES.NO_DATA_FOUND,
                        data: [],
                      });
                }

            }else{
                return res.json({
                    status: API_RESPONSE_STATUS_CODE.FAILED,
                    message: API_RESPONSE_MESSAGES.SERVER_ERROR,
                    data: [],
                  });
            }

        }catch(err){
            console.log(err);
            return res.status(500).json({
                status: API_RESPONSE_STATUS_CODE.FAILED,
                message: API_RESPONSE_MESSAGES.SERVER_ERROR,
            });
        }


    },
    simpleFileUpload: async (req, res) =>{

        try{

            const file = req.file;

            if(!file){
                return res.status(400).json({  //400 - the server could not understand the request because of invalid syntax
                    status: API_RESPONSE_STATUS_CODE.FAILED,
                    message: API_RESPONSE_MESSAGES.NO_FILE_UPLOADED,
                });
            }

            const uploadFile =  await _simpleFileUpload(file)

            if(uploadFile.success){
                return res.json({
                    status: API_RESPONSE_STATUS_CODE.SUCCESS,
                    message: API_RESPONSE_MESSAGES.FILE_UPLOADED,
                    data: uploadFile.data   
                });
            }
            else{
                return res.json({
                    status: API_RESPONSE_STATUS_CODE.FAILED,
                    message: API_RESPONSE_MESSAGES.SERVER_ERROR,
                });   
            }
            

        }catch (err){
            console.log(err);
            return res.status(500).json({
                status: API_RESPONSE_STATUS_CODE.FAILED,
                message: API_RESPONSE_MESSAGES.SERVER_ERROR,
            }); 
        }

    },
    fileUploadToFolder: async (req, res) =>{
        try{

            const file = req.file;
            console.log('--------------file---------',file);
            

            if(!file){
                return res.status(400).json({  //400 - the server could not understand the request because of invalid syntax
                    status: API_RESPONSE_STATUS_CODE.FAILED,
                    message: API_RESPONSE_MESSAGES.NO_FILE_UPLOADED,
                });
            }

            const uploadFile =  await _fileUploadToFolder(file)

            if(uploadFile.success){
                return res.json({
                    status: API_RESPONSE_STATUS_CODE.SUCCESS,
                    message: API_RESPONSE_MESSAGES.FILE_UPLOADED,
                    data: uploadFile.data   
                });
            }
            else{
                return res.json({
                    status: API_RESPONSE_STATUS_CODE.FAILED,
                    message: API_RESPONSE_MESSAGES.SERVER_ERROR,
                });   
            }
            

        }catch (err){
            console.log(err);
            return res.status(500).json({
                status: API_RESPONSE_STATUS_CODE.FAILED,
                message: API_RESPONSE_MESSAGES.SERVER_ERROR,
            }); 
        }

    },

    register: async (req, res) => {
        const { username, email, password } = req.body;

        try {
            const result = await _registerUser(username, email, password);

            if (result.success) {
                return res.json({
                    status: API_RESPONSE_STATUS_CODE.SUCCESS,
                    message: API_RESPONSE_MESSAGES.USER_REGISTERED,
                    data: result.data,
                });
            } else {
                return res.status(400).json({
                    status: API_RESPONSE_STATUS_CODE.FAILED,
                    message: API_RESPONSE_MESSAGES.REGISTRATION_FAILED,
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

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const result = await _loginUser(email, password);

            if (result.success) {
                const token = jwt.sign({ userId: result.data.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.json({
                    status: API_RESPONSE_STATUS_CODE.SUCCESS,
                    message: API_RESPONSE_MESSAGES.LOGIN_SUCCESS,
                    data: { token },
                });
            } else {
                return res.status(401).json({
                    status: API_RESPONSE_STATUS_CODE.FAILED,
                    message: API_RESPONSE_MESSAGES.LOGIN_FAILED,
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
}