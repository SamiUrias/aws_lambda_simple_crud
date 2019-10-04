const model = require('./model');

const getAuthors = async () => {
    try {
        return await model.getAuthors();
    } catch (error) {
        console.error('[author controller]', error);
        return null;
    }
};

const getSingleAuthor = async (paramsId) => {
    return new Promise((resolve, reject) => {

        try{
            resolve(model.getSingleAuthor(paramsId))
        } catch (e) {
            reject(e)
        }

    })
};

const addAuthor = async (authorObject) => {
    console.log('Inside addAuthors', authorObject)

    if(!authorObject.name ) {
        console.log('Insider rejection if')
        throw new Error('Invalid parameters');
    }
    return new Promise((resolve, reject) => {
        try {
            resolve(model.addAuthors(authorObject))
        } catch (e) {
            reject(e)
        }
    });
};

const updateAuthor = async (authorObject, paramsId) => {
    console.log('Inside updateAuthor', authorObject)

    if(!authorObject.name) {
        console.log('Insider rejection if')
        throw new Error('Invalid parameters');
    }
    return new Promise((resolve, reject) => {
        try {
            resolve(model.updateAuthor(authorObject, paramsId))
        } catch (e) {
            reject(e)
        }
    });
};

const deleteSingleAuthor = async (paramsId) => {
    return new Promise((resolve, reject) => {
        if( !paramsId ) {
            console.log('Insider rejection if')
            throw new Error('Invalid parameters');
        }

        try{
            resolve(model.deleteSingleAuthor(paramsId))
        } catch (e) {
            reject(e)
        }

    })
};

module.exports = {
    addAuthor,
    getAuthors,
    getSingleAuthor,
    updateAuthor,
    deleteSingleAuthor
};