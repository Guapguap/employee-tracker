const inquirer = require('inquirer')
const mysql = require("mysql2");
const consoleTable = require("console.table");

const server = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: '', //Enter your MySQL password here.
  database: "employees_db",
});

server.connect((err) => {
  console.log(err);
  if (err) throw err;

  runDatabase();
});

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
            // viewAllDepts();
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
            addDepartment() 

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

function addDepartment() { 

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

  ]).then(function(answers) {
      connection.query("INSERT INTO department SET ? ",
          {
              name: answers.name,
              id: answers.id
          },
          function(err) {
              if (err) throw err
              console.table(res);
              runEmployeeDB();
          }
      )
  })
}