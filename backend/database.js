const { createPool }=require("mysql");

const pool=createPool({
    timezone: 'utc',//
    // timezone: '+05:30',//
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.DB_NAME,
    multipleStatements: true,
    
});

module.exports=pool;