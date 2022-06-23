const inquirer = require('inquirer');
require("console.table");
const department = require('./routes/departments');
const db = require("./db");

// creates a promise with this imported file 
const connection = require('./db/connection');
// async function permisifies the function - waits for a promise to fulfill
// async waits for a promise before executing 
const init = async() => {
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
          {
            name: "Add Department",
            value: "ADD_DEPARTMENT"
          },
        //   "View All Departments",
        //   "View All Roles",
        //   "View All Employees",
        //   "Add Department",
        //   "Add Role",
        //   "Add Employee",
        //   "Update Employee Role",
        //   "Exit",
        ],
      },
    ])
    .then(res =>  {
      let choice = res.action;;
      switch (choice) {

        // // View All Departments
        // case "View All Departments":
        //   // department.viewAllDepts;
        //     break;

        // // View All Roles
        // case "View All Roles":
        //     // viewAllRoles();
        //     break;

        // // View all Employees 
        // case "View All Employees":
        //     // viewAllEmployees();
        //     break;

        // Add Department 
          case "ADD_DEPARTMENT":
              addDepartment();
              break;

        // // Add Role
        // case "Add Role":
        //     // addRole();
        //     break;

        // // Add Employee 
        // case "Add Employee":
        //     // addEmployee();
        //     break;

        // // Update Employee Role 
        // case "Update Employee Role":
        // //   updateEmployeeRole();
        //     break;

        //Exit Prompt
        // case "Exit":
        //   process.exit();
        //   break;
        default:
        process.exit();
      }
    });
}

function addDepartment() {
  inquirer 
  .prompt([
    {
      name: "name",
      message: "What is the name of the department?"
    }
  ])
    .then(res => {
      let name = res;
      db.createDepartment(name)
        .then(() => console.log(`Added ${name.name} to the database`))
        .then(() => runDatabase())
    })
}

init();
