const fs = require('fs');
//Crear el archivo .env con la información de API
fs.writeFileSync('./.env', `API=${process.env.API}\n`)
