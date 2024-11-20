const DATABASE_DEV = {
    DB_TYPE: "mysql",
    DB_HOST: "127.0.0.1",
    DB_USER: "root",
    DB_PASS: "root123",
    DB_NAME: "kanboard",
    DB_PORT: "3306",  
    KNEX_DEBUG: false,
}

const COMMON_DEV = {
    PORT: 3001,
    JWT_SECRET:'secret'
}


module.exports = {
    apps: [
        //------------- WEB SERVICE --------//
        {
        name: "BACKEND-SERVICES",
        script: "./services/api/app.js",
        watch: true,
        // ignore_watch: ["Uploads", "public/category/images"],
        cwd: "./",
        exec_mode: "cluster",
        instances: 1,
        env: {
          ...DATABASE_DEV,
          ...COMMON_DEV,
        },
        env_production: {
          //Tobe Added
        },
        log_date_format: "YYYY-MM-DD HH:mm Z",
      },
    ]
}