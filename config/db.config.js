module.exports = {
    HOST: "localhost",
    PORT: "8000",
    USER: "root",
    PASSWORD: "shubham",
    DB: "Crud",
    dialect: "mssql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};