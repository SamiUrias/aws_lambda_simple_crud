const model = require('./model');

const getBooks = async () => {
    try {
        return await model.getBooks();
    } catch (error) {
        console.error('[books controller]', error);
        return null;
    }
};

const getSingleBook = async (paramsId) => {
    return new Promise((resolve, reject) => {

        try{
            resolve(model.getSingleBook(paramsId))
        } catch (e) {
            reject(e)
        }

    })
};

const addBooks = async (bookObject) => {
    console.log('Inside addBooks', bookObject)

    if(!bookObject.title || !bookObject.content || !bookObject.author) {
        console.log('Insider rejection if')
        throw new Error('Invalid parameters');
    }
    return new Promise((resolve, reject) => {
        try {
            resolve(model.addBooks(bookObject))
        } catch (e) {
            reject(e)
        }
    });
};

const updateBook = async (bookObject, paramsId) => {
    console.log('Inside updateBook', bookObject)

    if(!bookObject.title || !bookObject.content || !bookObject.author || !bookObject.author || !paramsId) {
        console.log('Insider rejection if')
        throw new Error('Invalid parameters');
    }
    return new Promise((resolve, reject) => {
        try {
            resolve(model.updateBook(bookObject, paramsId))
        } catch (e) {
            reject(e)
        }
    });
};

const deleteSingleBook = async (paramsId) => {
    return new Promise((resolve, reject) => {
        if( !paramsId ) {
            console.log('Insider rejection if')
            throw new Error('Invalid parameters');
        }

        try{
            resolve(model.deleteBook(paramsId))
        } catch (e) {
            reject(e)
        }

    })
};

module.exports = {
    addBooks,
    getBooks,
    getSingleBook,
    updateBook,
    deleteSingleBook
};