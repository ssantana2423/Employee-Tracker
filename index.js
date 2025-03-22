import {pool, connectToDb} from './connection.js';
await connectToDb();
// Import the inquirer package
import inquirer from 'inquirer';
// Import the console.table package
import consoleTable from 'console.table';
// Import the connection.js file
import {pool, connectToDb} from './connection.js';

// Connect to the database
await connectToDb();

// Create a function to display the main menu
function mainMenu() {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
            'View All Departments',
            'View All Roles',
            'View All Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Quit',
            ],
        },
        ])
        .then((answers) => {
        switch (answers.choice) {
            case 'View All Departments':
            viewDepartments();
            break;
            case 'View All Roles':
            viewRoles();
            break;
            case 'View All Employees':
            viewEmployees();
            break;
            case 'Add a Department':
            addDepartment();
            break;
            case 'Add a Role':
            addRole();
            break;
            case 'Add an Employee':
            addEmployee();
            break;
            case 'Update an Employee Role':
            updateEmployeeRole();
            break;
            case 'Quit':
            process.exit(0);
            break;
            default:
            process.exit(0);
        }
        });
    }
    function viewDepartments() {
        pool.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        mainMenu();
        }
        );
    }
    function viewRoles() {
        pool.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        mainMenu();
        }
        );
    }
    function viewEmployees() {
        pool.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res.rows);
        mainMenu();
        }
        );
    }
    function addDepartment() {
        inquirer
        .prompt([
            {
            type: 'input',
            name: 'name',
            message: 'Enter the name of the new department:',
            },
        ])
        .then((answers) => {
            pool.query('INSERT INTO department (name) VALUES ($1)', [answers.name], (err, res) => {
            if (err) throw err;
            console.log('Department added.');
            mainMenu();
            }
            );
        });
    }
    mainMenu();
    function addRole() {
        inquirer
        .prompt([
            {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the new role:',
            },
            {
            type: 'input',
            name: 'salary',
            message: 'Enter the salary of the new role:',
            },
            {
            type: 'input',
            name: 'department_id',
            message: 'Enter the department ID of the new role:',
            },
        ])
        .then((answers) => {
            pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [answers.title, answers.salary, answers.department_id], (err, res) => {
            if (err) throw err;
            console.log('Role added.');
            mainMenu();
            }
            );
        });
    }
    function addEmployee() {
        inquirer
        .prompt([
            {
            type: 'input',
            name: 'first_name',
            message: "Enter the employee's first name:",
            },
            {
            type: 'input',
            name: 'last_name',
            message: "Enter the employee's last name:",
            },
            {
            type: 'input',
            name: 'role_id',
            message: "Enter the employee's role ID:",
            },
            {
            type: 'input',
            name: 'manager_id',
            message: "Enter the employee's manager ID:",
            },
        ])
        .then((answers) => {
            pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answers.first_name, answers.last_name, answers.role_id, answers.manager_id= null], (err, res) => {
            if (err) throw err;
            console.log('Employee added.');
            mainMenu();
            }
            );
        });
    }
    function updateEmployeeRole() {
        inquirer
        .prompt([
            {
            type: 'input',
            name: 'employee_id',
            message: "Enter the employee's ID:",
            },
            {
            type: 'input',
            name: 'role_id',
            message: "Enter the employee's new role ID:",
            },
        ])
        .then((answers) => {
            pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [answers.role_id, answers.employee_id], (err, res) => {
            if (err) throw err;
            console.log('Employee role updated.');
            mainMenu();
            }
            );
        });
    }
