// const inquirer = require("inquirer");
const mysql = require("mysql2");
const consoleTable = require("console.table");

const db = mysql.createConnection({
    host: "localhost",
    port: 5000,
    user: "root",
    password: "", //Enter your MySQL password here.
    database: "employees_db"
});

db.connect( (err) => {

    if (err) throw err;

    runEmployeeDB();

});

function runEmployeeDB() {
    inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do today?",
    name: "action",
    choices: [
            "View All Employees", 
            "View All Departments",
            "View All Roles",
            "View All Employees by Department",
            "View All Employees by Role",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Exit"
            ]
    }
    ])
}