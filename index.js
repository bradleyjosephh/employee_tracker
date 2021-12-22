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
            choices: ["viewEmployee", "viewRole", "addEmployee", "viewDeparment", "addDepartment", "addRole", "updateRole","Exit App"],
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
            default:
                process.exit(0)
        }
    })
}

function viewEmployee(){
    db.query("SELECT * FROM EMPLOYEE", function(err,data){
        if(err) throw err;
        console.table(data);
        promptOptions()
    })
}


function viewDeparment(){
    db.query("SELECT * FROM DEPARTMENT", function(err,data){
        if(err) throw err;
        console.table(data);
        promptOptions()
    })
}


function viewRole(){
    db.query("SELECT * FROM ROLES", function(err,data){
        if(err) throw err;
        console.table(data);
        promptOptions()
    })
}

promptOptions()