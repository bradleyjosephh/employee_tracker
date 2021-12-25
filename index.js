const inquirer = require('inquirer');
require('console.table');
const mysql = require('mysql2');
const db = mysql.createConnection('mysql://root:rootroot@localhost:3306/employeeTracker_db')


function promptOptions() {
    inquirer.prompt([
        {
            type: "list",
            choices: ["viewEmployee", "viewRole", "addEmployee", "addManager", "viewDepartment", "addDepartment", "addRole", "updateRole", "removeEmployee", "Exit App"],
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
            case "addManager":
                addManager()
                break;
            case "addRole":
                addRole()
                break;
            case "updateRole":
                updateRole()
                break;
            case 'removeEmployee':
                removeEmployee();
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
    console.log('list of deparments')
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
          promptOptions()
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
        type: "list",
        name: 'department_id',
        message: 'What is the department ID?',
        choices: [1, 2, 3, 4, 5, 6, 7, 8]

      },
      {
        type: 'input',
        name: 'salary',
        message: `Please input the new role's salary.`
      }
    ])
      .then(newRole => {
        db.query('INSERT INTO roles SET ?', newRole, err => {
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
        type: 'list',
        name: 'roles_id',
        message: `What is the new employee's role ID?`,
        choices: [1, 2, 3, 4, 5]
      },
      {
        type: 'list',
        name: 'manager_id',
        message: `Please input Manager ID.`,
        choices: [1, 2, 3, 4, 5, 6, 7]


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

  function addManager() {
    inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: 'What is the FIRST name of the manager?'
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'What is the LAST name of the manager?'
      },
      {
        type: 'list',
        name: 'roles_id',
        message: `Manager of which department?`,
        choices: [1, 2, 3, 4, 5, 6, 7, 8]
      },
    //   {
    //     type: 'list',
    //     name: 'manager_id',
    //     message: `Please input Manager ID.`,
    //     choices: []


    //   }
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

function updateRole() {
    db.query('SELECT * FROM EMPLOYEE', function (err, data) {
      if (err) { console.log(err) }
      console.table(data)
      console.log("-----------------------------------------------")
      db.query('SELECT * FROM ROLES', function (err, data) {
        if (err) { console.log(err) }
        console.table(data)
        inquirer.prompt([
          {
            type: 'input',
            message: 'What is the ID of the employee?',
            name: 'id'
          },
          {
            type: 'input',
            message: 'Please input the new Role ID for the employee.',
            name: 'roles_id'
          }
        ])
          .then(updateEmployee => {
            db.query('UPDATE employee SET ? WHERE ?', [{ roles_id: updateEmployee.roles_id }, { id: updateEmployee.id }], () => {
              console.log('The employee role has been updated.')
              promptOptions()
            })
          })
      })
    })
  }

// remove function

  function removeEmployee() {
    db.query('SELECT * FROM employee', function (err, data) {
      if (err) { console.log(err) }
      console.table(data)
      inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: 'Please input Employee ID of employee that is being removed.'
        }
      ])
        .then(removeEmp => {
          db.query('DELETE FROM employee WHERE ?', removeEmp, err => {
            if (err) { console.log(err) }
            console.log(`Employee has been removed!`)
            promptOptions()
          })
        })
    })
  }

//   