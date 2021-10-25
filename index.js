const inquirer = require("inquirer");
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // {TODO: Add your MySQL password}
      password: 'Bear919$',
      database: 'tracker'
    },
    console.log(`Connected to the tracker database.`)
  );

function initialize () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'Menu',
            message: 'What would you like to do?',
            choices:['View all departments', 'View all roles', 'View all employees', 'add a department', 'add a role',
            'add an employee','update an employee role']
        }
    ]).then(answers => {
        if(answers.Menu === 'View all departments'){
            return viewdepartments();
                }
        if(answers.Menu === 'View all roles'){
             return viewroles();
        }
        if(answers.Menu === 'View all employees'){
            return viewemployees();
        }
        if(answers.Menu === 'add a department'){
            return adddepartment();
        }
        if(answers.Menu === 'add a role'){
            return addrole();
        }
        if(answers.Menu === 'add an employee'){
            return addemployee()
        }
        if(answers.Menu === 'update an employee role'){
            return updaterole()
        }
    })
}
function viewdepartments(){
    db.query(`SELECT * FROM department`, function(err, results){
        console.table(results);
        console.log("")
        console.log("")
    })
 
}
function viewroles(){
    db.query(`SELECT roles.id, roles.title, roles.salary, department.departments AS department FROM roles  JOIN department ON roles.department_id = department.id`,
     function(err, results){
        console.table(results)

    })

    
}
function viewemployees(){
    db.query(`SELECT employee.first_name, employee.last_name, roles.title, roles.salary, department.departments AS department FROM employee  JOIN roles ON employee.roles_id = roles.id JOIN department ON employee.department_id = department.id`,
     function(err, results){
        console.table(results)

    })

}
function adddepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentadd',
            message: 'What department are you adding',
        }]).then(answers =>{
            var newdepartment = answers.departmentadd
            db.query(`INSERT INTO department (departments) VALUES ('${newdepartment}')`);
            console.log("Department added");
        })
}

function addrole(){

    const roleinquirer = [
        {
            type: 'input',
            name: 'roleadd',
            message: 'What role are you adding'

        },
        {
            type: 'input',
            name: 'salaryadd',
            message: 'What is the salary of the new role'

        },
        {
            type: 'list',
            name: 'departmentallocated',
            message: 'What department is the role allocated to?',
            choices: []

        }
]
db.query(`SELECT * from department`, function(err, results){
    
    results.forEach((dps)=>{
        roleinquirer[2].choices.push(`${dps.departments}`);
        
    })
    inquirer.prompt(roleinquirer).then((answers)=>{
            var newrole = answers.roleadd
            var newsalary = answers.salaryadd
            var queryroleid;
            results.forEach((dps)=>{
                if(answers.departmentallocated === dps.departments){
                    queryroleid = dps.id
                }    
            })
        
            console.log(queryroleid)
          db.query(`INSERT INTO roles (title, salary, department_id ) VALUES ('${newrole}','${newsalary}', ${queryroleid})`);
          console.log("Role added");
        })
    })
}
function addemployee(){
    const employeeinquirer = [
        {
            type: 'input',
            name: 'firstname',
            message: "What is the employee's first name"

        },
        {
            type: 'input',
            name: 'lastname',
            message: "What is the employee's last name"

        },
        {
            type: 'input',
            name: 'managerid',
            message: 'What is the manager id for this employee',
            

        },
        {
            type: 'list',
            name: 'role',
            message: 'What role does this employee have',
            choices: []

        }
    ]
    db.query(`SELECT * from  roles`, function(err, results){
    
        results.forEach((roles)=>{
            employeeinquirer[3].choices.push(`${roles.department_id} ${roles.title}`);
        })
        inquirer.prompt(employeeinquirer).then((answers)=>{
                var efirst = answers.firstname
                var elast = answers.lastname
                var role = answers.role;
                var roletitle = answers.role.substring(2)
                console.log(roletitle)
                var departmentid = role.charAt(0);
                var queryroleid;
                var managerid = answers.managerid
                
                results.forEach((roles)=>{
                    if(roletitle === roles.title){
                        queryroleid = roles.id
                    }    
                })
                db.query(`INSERT INTO employee (first_name, last_name, department_id, roles_id, manager_id ) VALUES ('${efirst}','${elast}', ${queryroleid}, ${departmentid}, ${managerid})`);
                console.log("Employee added");
              })
            }
        )
    }
    function updaterole(){
        const employeeselectedinquirer = [
            {
                type: 'list',
                name: 'employeeselected',
                message: 'Which employee would you like to update',
                choices: []
            }
        ]
        const roleupdateinquirer = [
            
                {
                    type: "list",
                    name: 'roleupdate',
                    message: 'What role should the employee have',
                    choices:[]
                }
            
        ]
        db.query(`SELECT id, first_name, last_name, roles_id FROM employee`, function(err, results){
            results.forEach((employee)=>{
                employeeselectedinquirer[0].choices.push(`${employee.id} ${employee.first_name} ${employee.last_name}`)
            })
            inquirer.prompt(employeeselectedinquirer).then((answers)=>{
                var employee = answers.employeeselected
                var employeeid = employee.charAt(0);
                db.query(`SELECT id, title FROM roles`, function(err,response){
                    response.forEach((role)=>{
                        roleupdateinquirer[0].choices.push(`${role.id} ${role.title}`)
                    })
                        inquirer.prompt(roleupdateinquirer).then((responses)=>{
                            var role = responses.roleupdate
                            console.log(role)
                            var roleid = role.charAt(0);
                            db.query(`UPDATE employee SET roles_id = ${roleid} WHERE id = ${employeeid}`);
                            console.log("Role has been updated")
                        })
                    })
                })
            })
    }

            

initialize();