const dbConnection = require('../../dbConnection')

const  getAuthors = async () =>  {
    let pool = await dbConnection.createDatabasePool();
    let authorsResults =  await new Promise((resolve, reject) => {
        let bookList =  pool.query('SELECT * FROM authors', function (err, results) {
            if(err) {  reject(err);  }
            resolve(results);
        });
    });

    let bookIndex = 0;
    while(bookIndex <= authorsResults.length - 1) {
        console.log(authorsResults[bookIndex]);
        let books =  await new Promise((resolve, reject) => {

            let query = `select books.* from books join booksauthors ba on books.id = ba.book where ba.author = '${authorsResults[bookIndex].id}'`;
            console.log(query);
            pool.query(query, function (err, results) {
                if(err) {  reject(err);  }
                resolve(results);
            });
        });

        authorsResults[bookIndex].books = books;
        bookIndex++
    }

    return authorsResults;
};

const getSingleAuthor = async (paramsId) =>  {
    console.log('Inside get single book')
    let pool = await dbConnection.createDatabasePool();
    let authorsResults =  await new Promise((resolve, reject) => {
        let bookList =  pool.query(`SELECT * FROM authors WHERE id = '${paramsId}'`, function (err, results) {
            if(err) {  reject(err);  }
            resolve(results);
        });
    });

    // Add the books list
    console.log('here')
    let bookIndex = 0;
    while(bookIndex <= authorsResults.length - 1) {
        console.log(authorsResults[bookIndex]);
        let books =  await new Promise((resolve, reject) => {

            let query = `select books.* from books join booksauthors ba on books.id = ba.book where ba.author = '${authorsResults[bookIndex].id}'`;
            console.log(query);
          pool.query(query, function (err, results) {
                if(err) {  reject(err);  }
                resolve(results);
            });
        });

        authorsResults[bookIndex].books = books;
        bookIndex++
    }

    return authorsResults
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