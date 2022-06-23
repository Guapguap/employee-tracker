// const connection = require("./connection");

// class DB {
//     constructor(connection) {
//         this.connection = connection;
//     }

//     createDepartment(department) {
//         return this.connection.query("INSERT INTO department SET ?", department);
//     }

//     viewAllDepartments() {
//         return this.connection.query("SELECT department.id AS ID, department.name AS Department FROM department",
//         function (res) {
            
//                 console.table(res)
    
//         });
//     }
// }

// module.exports = new DB(connection);