const dbConnection = require('../../dbConnection')

const  getAuthors = async () =>  {
    let pool = await dbConnection.createDatabasePool();
    return await new Promise((resolve, reject) => {
        let bookList =  pool.query('SELECT * FROM authors', function (err, results) {
            if(err) {  reject(err);  }
            resolve(results);
        });
    })
};

const getSingleAuthor = async (paramsId) =>  {
    console.log('Inside get single book')
    let pool = await dbConnection.createDatabasePool();
    return await new Promise((resolve, reject) => {
        let bookList =  pool.query(`SELECT * FROM authors WHERE id = '${paramsId}'`, function (err, results) {
            if(err) {  reject(err);  }
            resolve(results);
        });
    })
};

const addAuthors = async (authorObject) => {
    let pool = await dbConnection.createDatabasePool();
    console.log('Inside addBooks', authorObject)
    let insertId = await new Promise( (resolve, reject) => {

        let insertQuery = `INSERT INTO authors (name) 
                            values ('${authorObject.name}'
                                   
                            )`;


         pool.query(insertQuery, function (err, results) {
            if(err) {  reject(err);  }
            resolve(results.insertId);
        });
    });


    let getInsertedElementQuery = `SELECT * FROM authors WHERE id = ${insertId}`;
    return await new Promise((resolve, reject)=> {
        pool.query(getInsertedElementQuery, function (err, results) {
            if (err) {
                reject(err);
            }
            resolve(results);
        })
    })
};

const updateAuthor = async (authorObject, paramsId) => {
    let pool = await dbConnection.createDatabasePool();
    console.log('Inside updateBookModel', authorObject)
    let affectedRows = await new Promise( (resolve, reject) => {

        let updateQuery = `UPDATE books SET 
                            name = '${authorObject.title}'
                          WHERE id = ${paramsId}`;


        console.log(updateQuery)
        pool.query(updateQuery, function (err, results) {
            if(err) {  reject(err);  }
            console.log(results)
            resolve(results.affectedRows);
        });
    });


    let getInsertedElementQuery = `SELECT * FROM authors WHERE id = ${paramsId}`;
    return await new Promise((resolve, reject)=> {
        pool.query(getInsertedElementQuery, function (err, results) {
            if (err) {
                reject(err);
            }
            resolve(results);
        })
    })
};


const deleteSingleAuthor = async (paramsId) =>  {
    let pool = await dbConnection.createDatabasePool();
    console.log('D:', paramsId)
    let singleAuthor = await getSingleAuthor(paramsId);
    console.log('SA', singleAuthor)

    await new Promise((resolve, reject) => {
        console.log(paramsId)
        pool.query(`DELETE FROM authors WHERE id = '${paramsId}'`, function (err, results) {
            if(err) {  reject(err);  }
            resolve(results);
        });
    });

    return singleAuthor;
};

module.exports = {
    addAuthors,
    getAuthors,
    getSingleAuthor,
    updateAuthor,
    deleteSingleAuthor
};