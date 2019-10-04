const dbConnection = require('../../dbConnection')

const  getRelationship = async () =>  {
    let pool = await dbConnection.createDatabasePool();
    return await new Promise((resolve, reject) => {
        let bookList =  pool.query('SELECT * FROM booksauthors', function (err, results) {
            if(err) {  reject(err);  }
            resolve(results);
        });
    })
};

const getSingleRelationship = async (bookId, authorId) =>  {
    console.log('Inside get single relationship');
    let pool = await dbConnection.createDatabasePool();
    return await new Promise((resolve, reject) => {
        let bookList =  pool.query(`SELECT * FROM booksauthors WHERE book = '${bookId}' and author = '${authorId}'`, function (err, results) {
            if(err) {  reject(err);  }
            resolve(results);
        });
    })
};

const addRelationship = async (bookObject) => {
    let pool = await dbConnection.createDatabasePool();
    console.log('Inside addBooks', bookObject)
    let results = await new Promise( (resolve, reject) => {

        let insertQuery = `INSERT INTO booksauthors (book, author) 
                            values ('${bookObject.book}', 
                                    '${bookObject.author}'
                            )`;


         pool.query(insertQuery, function (err, results) {
            if(err) {  reject(err);  }
            resolve(results);
        });
    });

    console.log(results);

    return await getSingleRelationship(bookObject.book, bookObject.author)
};

const updateRelationship = async (bookObject, bookId, authorId) => {
    let pool = await dbConnection.createDatabasePool();
    console.log('Inside updateBookModel', bookObject)
    let affectedRows = await new Promise( (resolve, reject) => {

        let updateQuery = `UPDATE booksauthors SET 
                            book = '${bookObject.book}',                      
                            author = '${bookObject.author}'
                          WHERE book = ${bookId} and author = ${authorId}`;


        console.log(updateQuery);
        pool.query(updateQuery, function (err, results) {
            if(err) {  reject(err);  }
            console.log(results);
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


const deleteSingleRelationship = async (bookId, authorId) =>  {
    let pool = await dbConnection.createDatabasePool();
    let singleRelationship = await getSingleRelationship(bookId, authorId);
    console.log('SB', singleRelationship);

    await new Promise((resolve, reject) => {
        pool.query(`DELETE FROM booksauthors WHERE book = '${bookId}' and author = '${authorId}'`, function (err, results) {
            if(err) {  reject(err);  }
            resolve(results);
        });
    });

    return singleRelationship;
};

module.exports = {
    addRelationship,
    getRelationship,
    getSingleRelationship,
    updateRelationship,
    deleteSingleRelationship
};