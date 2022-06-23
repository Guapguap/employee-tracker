const inquirer = require('inquirer');
const consoleTable = require("console.table");
const department = require('./routes/departments');

// creates a promise with this imported file 
const connection = require('./connection');
// async function permisifies the function - waits for a promise to fulfill
// async waits for a promise before executing 
const init = async() => {
  await connection
  console.log('connection success');
  runDatabase();
}
function runDatabase() {
    inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do today?",
        name: "action",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.action) {

        // View All Departments
        case "View All Departments":
          department.viewAllDepts;
            break;

        // View All Roles
        case "View All Roles":
            // viewAllRoles();
            break;

        // View all Employees 
        case "View All Employees":
            // viewAllEmployees();
            break;

        // Add Department 
        case "Add Department":
          department.addDepartment();

        // Add Role
        case "Add Role":
            // addRole();
            break;

        // Add Employee 
        case "Add Employee":
            // addEmployee();
            break;

        // Update Employee Role 
        case "Update Employee Role":
        //   updateEmployeeRole();
            break;

        //Exit Prompt
        case "Exit":
            // server.end();
            break;
      }
    });
}

init();
