
// Import and require mysql2
const mysql = require('mysql2');





// Connect to database
const connection = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: 'newpassword',
    database: 'employees_db'
   
  },
  
  console.log(`Connected to the database.`)
 
);

connection.connect(function(error) {
    if(error) {
        throw error
    }
});


module.exports = connection