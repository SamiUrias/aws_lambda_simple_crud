const dbConnection = require('../../dbConnection')

const  getBooks = async () =>  {
    let pool = await dbConnection.createDatabasePool();
    return await new Promise((resolve, reject) => {
        let bookList =  pool.query('SELECT * FROM books', function (err, results) {
            if(err) {  reject(err);  }
            resolve(results);
        });
    })
};

const getSingleBook = async (paramsId) =>  {
    console.log('Inside get single book');
    let pool = await dbConnection.createDatabasePool();
    return await new Promise((resolve, reject) => {
        let bookList =  pool.query(`SELECT * FROM books WHERE id = '${paramsId}'`, function (err, results) {
            if(err) {  reject(err);  }
            resolve(results);
        });
    })
};

const addBooks = async (bookObject) => {
    let pool = await dbConnection.createDatabasePool();
    console.log('Inside addBooks', bookObject)
    let insertId = await new Promise( (resolve, reject) => {

        let insertQuery = `INSERT INTO books (title, content) 
                            values ('${bookObject.title}', 
                                    '${bookObject.content}'
                            )`;


         pool.query(insertQuery, function (err, results) {
            if(err) {  reject(err);  }
            resolve(results.insertId);
        });
    });


    let getInsertedElementQuery = `SELECT * FROM books WHERE id = ${insertId}`;
    return await new Promise((resolve, reject)=> {
        pool.query(getInsertedElementQuery, function (err, results) {
            if (err) {
                reject(err);
            }
            resolve(results);
        })
    })
};

const updateBook = async (bookObject, paramsId) => {
    let pool = await dbConnection.createDatabasePool();
    console.log('Inside updateBookModel', bookObject)
    let affectedRows = await new Promise( (resolve, reject) => {

        let updateQuery = `UPDATE books SET 
                            title = '${bookObject.title}',
                            content = '${bookObject.content}',
                            author = '${bookObject.author}'
                          WHERE id = ${paramsId}`;


        console.log(updateQuery)
        pool.query(updateQuery, function (err, results) {
            if(err) {  reject(err);  }
            console.log(results)
            resolve(results.affectedRows);
        });
    });


    let getInsertedElementQuery = `SELECT * FROM books WHERE id = ${paramsId}`;
    return await new Promise((resolve, reject)=> {
        pool.query(getInsertedElementQuery, function (err, results) {
            if (err) {
                reject(err);
            }
            resolve(results);
        })
    })
};


const deleteBook = async (paramsId) =>  {
    let pool = await dbConnection.createDatabasePool();
    console.log('D:', paramsId)
    let singleBook = await getSingleBook(paramsId);
    console.log('SB', singleBook)

    await new Promise((resolve, reject) => {
        console.log(paramsId)
        pool.query(`DELETE FROM books WHERE id = '${paramsId}'`, function (err, results) {
            if(err) {  reject(err);  }
            resolve(results);
        });
    });

    return singleBook;
};

module.exports = {
    addBooks,
    getBooks,
    getSingleBook,
    updateBook,
    deleteBook
};