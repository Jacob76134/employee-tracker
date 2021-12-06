require('events').EventEmitter.prototype._maxListeners = 100;
const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const connection = require('./config/connection'); 

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection.connect((error) => {
    if (error) throw error;
    mainMenu();
});


//MAIN MENU

function mainMenu() {

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type: 'list',
        message:'Please select an option',
        name: 'choices',
        choices: ['View all departments', 
            'View all roles', 'View all employees', 
            'Add a department', 
            'Add a role', 
            'Add an employee',
            'Update an employee role']
    }
  ])

  .then((answers) => {
    const {choices} = answers;
    
    console.log(choices);

    switch(choices){
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      default:
        break;
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  })

};

//VIEW FUNCTIONS

function viewAllDepartments() {  
  connection.query(
    "SELECT id, department_name FROM department",
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      mainMenu();
    }           
  )};

function viewAllRoles(){
  connection.query(
    "SELECT * FROM role INNER JOIN department ON role.department_id = department.id",
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      mainMenu();
    }
)};

function viewAllEmployees(){
  connection.query(
    "SELECT * FROM employee",
    function (err, results) {
      if (err) {
        console.log(err);
      }
      console.table(results);
      mainMenu();
    }
)};
    
 //ADD AND UPDATE FUNCTIONS 

function addDepartment(){

 inquirer
  .prompt([
    {
    type: 'input',
    message:'Name the department you would like to add',
    name: 'department_name',
    }
  ])
  .then((answers) => {
    
    connection.query(
        "INSERT INTO department SET department_name = ?",
        answers.department_name,
        function (err, results) {
          if (err) {
            console.log(err);
          }
          viewAllDepartments();
          // mainMenu();
        }           
    )
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
})};

  
function addRole (){

  inquirer
  .prompt([

    {
    type: 'input',
    message:'Name the role you would like to add',
    name: 'title',
    },

    {
    type: 'input',
    message:'Enter the salary for this role',
    name: 'salary',
    },

    {
    type: 'input',
    message:'Enter the department id for this role',
    name: 'department_id',
    }

  ])
  .then((answers) => {

    connection.query(
    "INSERT INTO role SET ?",
    {
    title: answers.title,
    salary: answers.salary,
    department_id: answers.department_id,
    },
    function (err, results) {
      if (err) {
        console.log(err);
      }
      viewAllRoles();
      // mainMenu();
    }
    )


  })
  .catch((error) => {
    if (error.isTtyError) {
    // Prompt couldn't be rendered in the current environment
      console.log(error);
    } else {
    // Something else went wrong
    }
  });
};

    
function addEmployee (){

  inquirer
  .prompt([

    {
    type: 'input',
    message:'Name the first name of this employee',
    name: 'first_name',
    },

    {
    type: 'input',
    message:'Enter the last name of this employee',
    name: 'last_name',
    },

    {
    type: 'input',
    message:'Enter the role id for this employee',
    name: 'role_id',
    },

    {
    type: 'input',
    message:'Enter the manager id for this employee',
    name: 'manager_id',
    }

  ])
  .then((answers) => {

    connection.query(
    "INSERT INTO employee SET ?",
    {
    first_name: answers.first_name,
    last_name: answers.last_name,
    role_id: answers.role_id,
    manager_id: answers.manager_id
    },
    function (err, results) {
      if (err) {
      console.log(err);
      }
      viewAllEmployees();
      // mainMenu();
    }           
    )
  })

  .catch((error) => {
    if (error.isTtyError) {
    // Prompt couldn't be rendered in the current environment
    } else {
    // Something else went wrong
    }
  });
};
        
        
function updateEmployeeRole (){

  inquirer
  .prompt([

    {
    type: 'input',
    message:'Enter the id of the employee for the role change',
    name: 'change_id',
    },

    {
    type: 'input',
    message:'Enter the new role id for this employee',
    name: 'role_id',
    },

  ])
  .then((answers) => {

    connection.query(
    "UPDATE employee SET role_id = ? WHERE id = ?",
    [answers.role_id, answers.change_id],

    function (err, results) {
      if (err) {
      console.log(err);
      }
      viewAllEmployees();
      console.log("========================");
      // mainMenu();
    }           
    )
  })

  .catch((error) => {
    if (error.isTtyError) {
    // Prompt couldn't be rendered in the current environment
    } else {
    // Something else went wrong
    }
  });
};