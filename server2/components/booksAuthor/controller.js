const model = require('./model');

const getRelationship = async () => {
    try {
        return await model.getRelationship();
    } catch (error) {
        console.error('[books controller]', error);
        return null;
    }
};

const getSingleRelationship = async (bookId, authorId) => {
    return new Promise((resolve, reject) => {

        try{
            resolve(model.getSingleRelationship(bookId, authorId))
        } catch (e) {
            reject(e)
        }

    })
};

const addRelationship = async (bookObject) => {
    console.log('Inside addBooks', bookObject)

    if(!bookObject.book || !bookObject.author ) {
        console.log('Insider rejection if')
        throw new Error('Invalid parameters');
    }
    return new Promise((resolve, reject) => {
        try {
            resolve(model.addRelationship(bookObject))
        } catch (e) {
            reject(e)
        }
    });
};

const updateRelationship = async (bookObject, bookId, authorId) => {
    console.log('Inside updateBook', bookObject)

    if(!bookObject.book || !bookObject.author || !bookId || !authorId) {
        console.log('Insider rejection if')
        throw new Error('Invalid parameters');
    }
    return new Promise((resolve, reject) => {
        try {
            resolve(model.updateRelationship(bookObject, paramsId))
        } catch (e) {
            reject(e)
        }
    });
};

const deleteSingleRelationship = async (bookId, authorId) => {
    return new Promise((resolve, reject) => {
        if( !bookId || !authorId ) {
            console.log('Insider rejection if')
            throw new Error('Invalid parameters');
        }

        try{
            resolve(model.deleteSingleRelationship(bookId, authorId))
        } catch (e) {
            reject(e)
        }

    })
};

module.exports = {
    addRelationship,
    getRelationship,
    getSingleRelationship,
    updateRelationship,
    deleteSingleRelationship
};