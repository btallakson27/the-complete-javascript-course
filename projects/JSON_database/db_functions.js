const fs = require ('fs') // fs refers to the File System module. This core module provides an API for interacting with the
// file system on your computer. It allows Node.js applications to perform various operations related to files and directories.

function readDb(dbName ='db.json'){
    // read JSON object from file
    const data=fs.readFileSync(dbName, 'utf-8') // accesses the data from the File System (your local computer?)

    // parse the JSON from JSON to object and return it
    const converted_data=JSON.parse(data) // parse converts JSON data to a regular JS object.
    return converted_data
}

function writeDb(obj, dbName ='db.json'){
    // check that a user has passed in an object
    if (!obj){
        return
    }

    try{
        // convert our object to the JSON format
        let converted_data=JSON.stringify(obj) // stringify turns an object into JSON
        fs.writeFileSync(dbName, converted_data)
        console.log('Save successful')
        // save JSON to our JSON database

    }catch (err) {
        console.log('Failed to save data\n', err.message)
    }
}

module.exports={ // this is a moduler file and we do this to make sure they're accessible in other files
    readDb, writeDb
}
