const inquirer = require('inquirer');
require("console.table");
// creates a promise with this imported file 
const connection = require('./db/connection');

// const db = require("./db");


// async function permisifies the function - waits for a promise to fulfill
// async waits for a promise before executing 
// const init = async() => {
//   console.log('connection success');
//   runDatabase();
// }

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
    console.log("-----------------------")
    console.log("*** DEPARTMENT LIST ***")
    console.log("-----------------------")
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
      {
        name: "id",
        type: "input",
        message: "What is the new Department ID number? "
      }
  ])
  .then((answers) => {

    // inserting the following key value pairs into the table 
      connection.query("INSERT INTO department SET ? ",
          {
            name: answers.name,
            id: answers.id
          },
          (err) => {
              if (err) throw err

              // stores answers in table 
              console.table(answers);
              runDatabase()
          }
      )
  })
}
// DEPARTMENTS SECTION END

// ROLES SECTION
// function viewAllRoles() {
//   connection.query("SELECT role.id AS Dept_ID, role.title AS Title FROM role",
//   function(err, res) {
//     if (err) throw err
//     console.log("------------------")
//     console.log("*** ROLE LIST ***")
//     console.log("------------------")
//     console.table(res)
//     runDatabase()
// })
// }

function addRole() { 
  connection.query("SELECT role.title AS Title, role.salary AS Salary FROM role LEFT JOIN department.name AS Department FROM department;",   function(err, res) {
    inquirer.prompt([
        {
          name: "title",
          type: "input",
          message: "What is name of the new role?"
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of the new role?"
        } ,
        {
          name: "deptID",
          type: "input",
          message: "What is the department id number?"
        }
    ]).then((answer) => {
          connection.query(`INSERT INTO role (title, salary, departmentID) 
          VALUES (?, ?, ?)`, 
          [answer.title, answer.salary, answer.deptID], 
          (err, res) => {
            if (err) throw err;
            console.table(res);
            runDatabase();
          });
        });;
  });
};


runDatabase();
