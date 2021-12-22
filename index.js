const inquirer = require('inquirer');
const consoleTable = require('console.table');
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
            choices: ["viewEmployee", "viewRole", "addEmployee", "viewDeparment", "addDepartment", "addRole", "updateRole"],
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
                viewDepatment()
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
        }
    })
}