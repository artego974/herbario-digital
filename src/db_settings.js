const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "herbario",
})

connection.connect((err)=>{
    if(!err){
        console.log("Servidor Conectado")
    } else {
        console.error(`ERRO: ${err}`)
    }
    
})

module.exports = connection