const inquirer = require("inquirer");
require("console.table");
// creates a promise with this imported file
const connection = require("./db/connection");

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
          "Update Employee",
          "Exit",
        ],
      },
    ])
    .then(function (answers) {
      switch (answers.action) {
        case "View All Departments":
          viewAllDepts();
          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "View All Employees":
          viewAllEmployees();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee":
          updateEmployee();
          break;

        case "Exit":
          console.log("-------");
          console.log("Goodbye");
          console.log("-------");
          connection.end();
          break;
      }
    });
}

// DEPARTMENTS SECTION
function viewAllDepts() {
  connection.query(
    "SELECT department.id AS ID, department.name AS Department FROM department",
    function (err, res) {
      if (err) throw err;
      console.log("-----------------------");
      console.log("*** DEPARTMENT LIST ***");
      console.log("-----------------------");
      console.table(res);
      runDatabase();
    }
  );
}

// ------------------------

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What Department would you like to add? ",
      },
      {
        name: "id",
        type: "input",
        message: "What is the new Department ID number? ",
      },
    ])
    .then((answers) => {
      // inserting the following key value pairs into the table
      connection.query(
        "INSERT INTO department SET ? ",
        {
          name: answers.name,
          id: answers.id,
        },
        (err) => {
          if (err) throw err;

          // stores answers in table
          console.table(answers);
          runDatabase();
        }
      );
    });
}
// DEPARTMENTS SECTION END

// ROLES SECTION
function viewAllRoles() {
  connection.query("SELECT * FROM role;",
    function (err, res) {
      if (err) throw err;
      console.log("------------------");
      console.log("*** ROLE LIST ***");
      console.log("------------------");
      console.table(res);
      runDatabase();
    }
  );
}

// ------------------------

function addRole() {
  // inserting the following key value pairs into the table
  connection.query(
    "SELECT role.title AS Title, role.salary AS Salary FROM role LEFT JOIN department.name AS Department FROM department;",
    function (err, res) {
      inquirer
        .prompt([
          {
            name: "title",
            type: "input",
            message: "What is name of the new role?",
          },
          {
            name: "salary",
            type: "input",
            message: "What is the salary of the new role?",
          },
          {
            name: "deptID",
            type: "input",
            message: "What is the department id number?",
          },
        ])
        .then((answer) => {
          connection.query(
            `INSERT INTO role (title, salary, departmentID) 
          VALUES (?, ?, ?)`,

            // values getting inserted
            [answer.title, answer.salary, answer.deptID],

            // function to catch errors/ store the answers into table/ invoke runDatabase when finished
            (err, res) => {
              if (err) throw err;
              console.table(answer);
              runDatabase();
            }
          );
        });
    }
  );
}
// ROLES SECTION END

// EMPLOYEE SECTION 

function addEmployee() { 
  inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "First Name of employee: "
      },
      {
        name: "lastName",
        type: "input",
        message: "Last Name of employee: "
      },
      {
        name: "role",
        type: "input",
        message: "Is the new employee an Intern, Assistant, or Apprentice? "
      },
      {
          name: "manager",
          type: "input",
          message: "Who is managing the new employee? 1. Tom or 2. John: ", 
      }

  ]).then((answer) => {
    connection.query("INSERT INTO employees SET ?", 
    {
        firstName: answer.firstName,
        lastName: answer.lastName,
        role: answer.role,
        managerID: answer.manager    
    }, 
    (err) => {
        if (err) throw err
        console.table(answer)
        runDatabase()
    })

})
}

function updateEmployee() {
  inquirer
  .prompt([
    {
      name: "name",
      type: "input",
      message: "Enter the Last Name of the employee would you like to update?"
    },

    {
      name: "title",
      type: "input",
      message: "What is the employee's new title?"      
    }
  ])
  .then((answer) => {
    connection.query('UPDATE employees SET role = ? WHERE lastName = ?',[answer.title, answer.name],
    
    (err) => {
      if (err) throw err;
      console.table(answer);
      runDatabase();
    });
  });
}

function viewAllEmployees() {
    
  connection.query("SELECT * FROM employees;", 
  function(err, res) {
    if (err) throw err
    console.log ("---------------------");
    console.log("*** EMPLOYEES LIST ***");
    console.log ("---------------------");
    console.table(res)
    runDatabase()
})
}


runDatabase();
