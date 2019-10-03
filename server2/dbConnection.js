const mysql = require('mysql');

/**
 * The purpose of this function is to create a new database pool.
 * @param pool
 * @returns {Pool}
 */
const createDatabasePool = async ( pool )=> {

    if ( pool === null || pool === undefined || pool === 'undefined') {
        try {
            pool = await mysql.createPool({
                connectionLimit: 1,
                connectTimeout  : 60 * 60 * 1000,
                acquireTimeout  : 60 * 60 * 1000,
                timeout         : 60 * 60 * 1000,
                host: process.env.DATABASE_HOST,
                user: process.env.DATABASE_USER,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_NAME
            });
        } catch (err) {
            throw new Error(err)
        }

    }

    pool.getConnection((err, connection) => {
        if (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Database connection was closed.')
            }
            if (err.code === 'ER_CON_COUNT_ERROR') {
                console.error('Database has too many connections.')
            }
            if (err.code === 'ECONNREFUSED') {
                console.error('Database connection was refused.')
            }
        }

        if (connection) connection.release();

        return
    });
    console.log('The pool has been created successfully');

    setInterval(() => {
    }, 60000)

    return pool;
};


module.exports = {
    createDatabasePool,
};
