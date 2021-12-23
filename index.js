const inquirer = require('inquirer');
require('console.table');
const mysql = require('mysql2');
const { allowedNodeEnvironmentFlags } = require('process');
const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: 'rootroot',
    database: 'employeeTracker_db'
});

function promptOptions() {
    inquirer.prompt([
        {
            type: "list",
            choices: ["viewEmployee", "viewRole", "addEmployee", "viewDeparment", "addDepartment", "addRole", "updateRole", "removeEmployee", "removeDepartment", "removeRole", "Exit App"],
            messages: "What would you like to do?",
            name: "name",
        }
    ]).then(({ name }) => {
        switch (name) {
            case "viewEmployee":
                viewEmployee()
                break;
            case "viewRole":
                viewRole()
                break;
            case "viewDepartment":
                viewDepartment()
                break;
            case "addEmployee":
                addEmployee()
                break;
            case "addDepartment":
                addDepartment()
                break;
            case "addRole":
                addRole()
                break;
            case "updateRole":
                updateRole()
                break;
            case 'removeDepartment':
                removeDepartment();
                break;
            case 'removeRole':
                removeRoles();
                break;
            case 'removeEmployee':
                removeEmployees();
                break;
            default:
                process.exit(0)
        }
    })
}
// view functions
function viewEmployee() {
    db.query("SELECT * FROM EMPLOYEE", function (err, data) {
        if (err) throw err;
        console.table(data);
        promptOptions()
    })
}


function viewDepartment() {
    db.query("SELECT * FROM DEPARTMENT", function (err, data) {
        if (err) throw err;
        console.table(data);
        promptOptions()
    })
}


function viewRole() {
    db.query("SELECT * FROM ROLES", function (err, data) {
        if (err) throw err;
        console.table(data);
        promptOptions()
    })
}

promptOptions()

// add functions

function addDepartment() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Please input name of new department.'
      }
    ])
      .then(newDepartment => {
        db.query('INSERT INTO department SET name= ?', newDepartment.name, err => {
          if (err) { console.log(err) }
          console.log(`${newDepartment.name} has been added!`)
          start()
        })
      })
  }
  
  function addRole() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Please input name of new role.'
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'What is the department ID?'
      },
      {
        type: 'input',
        name: 'salary',
        message: `Please input the new role's salary.`
      }
    ])
      .then(newRole => {
        db.query('INSERT INTO role SET ?', newRole, err => {
          if (err) { console.log(err) }
          console.log(`${newRole.title} has been added!`)
          promptOptions()
        })
      })
  }
  
  function addEmployee() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'What is the FIRST name of the employee?'
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'What is the LAST name of the employee?'
      },
      {
        type: 'input',
        name: 'roles_id',
        message: `What is the new employee's role ID?`
      },
      {
        type: 'number',
        name: 'manager_id',
        message: `Please input Manager ID.`
      }
    ])
      .then(newEmployee => {
        db.query('INSERT INTO employee SET ?', newEmployee, err => {
          if (err) { console.log(err) }
          console.log(`${newEmployee.first_name} ${newEmployee.last_name} is now added!`)
          promptOptions()
        })
      })
  }

//   update functions

