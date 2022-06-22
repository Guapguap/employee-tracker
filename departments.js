// const inquirer = require('inquirer')
// const mysql = require("mysql2");
// const consoleTable = require("console.table");

// function addDepartment() { 

//     inquirer.prompt([
//         {
//           name: "name",
//           type: "input",
//           message: "What Department would you like to add? "
//         },
//         {
//             name: "id",
//             type: "input",
//             message: "What is the new Department ID number? "
//           }

//     ]).then(function(answers) {
//         connection.query("INSERT INTO department SET ? ",
//             {
//               name: answers.name,
//               id: answers.id
//             },
//             function(err) {
//                 if (err) throw err
//                 console.table(res);
//                 runEmployeeDB();
//             }
//         )
//     })
//   }