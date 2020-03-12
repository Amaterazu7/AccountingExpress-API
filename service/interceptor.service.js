module.exports.response = (res, code, status, data, error = null) => {
    if (error) console.error(`::: ERROR ::: ${ JSON.stringify(error, undefined, 2) }`);
    res.status(code).json( { status: status, data: data, error: error } );
};

module.exports.dbRequest = async (connection, sqlQuery, fields, message, showLength = false) => {
    return await new Promise( async (resolve, reject) => {
        await connection.query( sqlQuery, fields, (error, results) => (error) ? reject(error) : resolve(results) );
    });
};
