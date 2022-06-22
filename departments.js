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
        server.query("INSERT INTO department SET ? ",
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

function viewAllDepts() {

    console.log('hello world')
}

export {addDepartment, viewAllDepts}