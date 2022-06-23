const inquirer = require('inquirer');
require("console.table");
// creates a promise with this imported file 
const connection = require('./db/connection');

// const db = require("./db");


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
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Exit"
          ]
      },
    ])
    .then(function(answers) {
      switch (answers.action) {

          case "View All Employees":
              viewAllEmployees();
          break;

          case "View All Departments":
              viewAllDepts();
          break;

          case "View All Roles":
              viewAllRoles();
          break;
              
          case "View All Employees by Department":
              viewEmployeesByDept();
          break;

          case "View All Employees by Role":
              viewEmployeesByRole();
          break;

          case "Add Department":
              createDepartment();
          break;

          case "Add Role":
              addRole();
          break;

          case "Add Employee":
              addEmployee();
          break;

          case "Update Employee Role":
              updateEmployeeRole();
          break;

          case "Exit":
              console.log("Goodbye");
              connection.end();
          break;
          }
    });
}

// DEPARTMENTS SECTION
function viewAllDepts() {
  connection.query("SELECT department.id AS ID, department.name AS Department FROM department",
  function(err, res) {
    if (err) throw err
    console.log("")
    console.log("*** DEPARTMENT LIST ***")
    console.log("")
    console.table(res)
    runDatabase()
})
}

// ------------------------

function createDepartment() { 

  inquirer.prompt([
      {
        name: "name",
        type: "input",
        message: "What Department would you like to add? "
      },
      // {
      //     name: "id",
      //     type: "input",
      //     message: "What is the new Department ID number? "
      //   }

  ])
  .then((answers) => {
      connection.query("INSERT INTO department SET ? ",
          {
            name: answers.name,
            // id: answers.id
          },
          (err, res) => {
              if (err) throw err
              console.table(res);
              
          }
      )
      .then(runDatabase());
  })
}
// DEPARTMENTS SECTION END




init();
