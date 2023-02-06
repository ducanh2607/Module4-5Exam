function getAllEmployee() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/employees",
        success: function (data) {
            let content = '<table class="table table-hover text-center">' +
                '<tr>' +
                '<td>#</td>' +
                '<td>Employee Code</td>' +
                '<td>Name</td>' +
                '<td>Age</td>' +
                '<td>Salary</td>' +
                '<td>Department</td>' +
                '<td colSpan="2">Action</td>' +
                '</tr>';
            let count = 1;
            for (let i = 0; i < data.length; i++) {
                content += `<tr>` +
                    `<td>${count}</td>` +
                    listEmployee(data[i]) +
                    `</tr>`;
                count++;
            }
            content += '</table>'
            document.getElementById('list_employee').innerHTML = content;
        }
    });
}
function listEmployee(employee) {
    return `<td>${employee.code}</td>` +
        `<td><a onclick="getIdEmployee(${employee.id}); location.href = 'detail.html' ">${employee.name}</a></td>` +
        `<td>${employee.age}</td>` +
        `<td>${employee.salary}</td>` +
        `<td>${employee.department.name}</td>` +
        `<td><button class="btn btn-warning" onclick="getIdEmployee(${employee.id}); location.href = 'update.html'">Update</button></td>` +
        `<td><button class="btn btn-danger" onclick="deleteEmployee(${employee.id})">Delete</button></td>`;
}
function deleteEmployee(id){
    if(confirm("Are you sure want to delete?")){
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/employees/"+ id,
            success: function(data){
                getAllEmployee()
                alert(data)
            }
        });
    }
}
function getAllDepartment(employee) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/departments",
        success: function (data) {
            let content = `<select id="department">`
            if (employee != null) {
                content += `<option value="${employee.department.id}">${employee.department.name}</option>`
                for (let i = 0; i < data.length; i++) {
                    if (employee.department.id !== data[i].id) {
                        content += displayDepartment(data[i])
                    }
                }
                content += `<select>`
                document.getElementById("departmentUpdate").innerHTML = content;
            } else {
                for (let i = 0; i < data.length; i++) {
                    content += displayDepartment(data[i])
                }
                content += `<select>`
                document.getElementById("departmentForm").innerHTML = content;
            }
        }
    });
}
function displayDepartment(department) {
    return `<option value="${department.id}">${department.name}</option>`
}
function back(){
    window.location.href = "index.html"
    event.preventDefault()
}

function create(){
    let code = $("#code").val()
    let name = $("#name").val()
    let age = $("#age").val()
    let salary = $("#salary").val()
    let department = $("#department").val()
    let newEmp = {
        code: code,
        name: name,
        age: age,
        salary: salary,
        department: {
            id : department
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/employees/create",
        data: JSON.stringify(newEmp),
        success: function (data) {
            if (data.name != null) {
                alert("Create successfully!")
                back()
            }
        }
    })
    event.preventDefault()
}
function getIdEmployee(id) {
    $.ajax({
        type: "GET",
        url:  "http://localhost:8080/employees/" + id,
        success : function () {
            sessionStorage.setItem("IdUpdate", id)
        }
    })
}
function updateEmployee() {
    let idUpdate = sessionStorage.getItem("IdUpdate")
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/employees/" + idUpdate,
        success: function (data) {
            $("#codeUpdate").val(data.code)
            $("#nameUpdate").val(data.name)
            $("#ageUpdate").val(data.age)
            $("#salaryUpdate").val(data.salary)
            $("#departmentUpdate").val(data.department.name)
            getAllDepartment(data)
        }
    });
}
function viewEmployee() {
    let idUpdate = sessionStorage.getItem("IdUpdate")
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/employees/" + idUpdate,
        success: function (data) {
            $("#codeUpdate").val(data.code)
            $("#nameUpdate").val(data.name)
            $("#ageUpdate").val(data.age)
            $("#salaryUpdate").val(data.salary)
            $("#departmentUpdate").val(data.department.name)

        }
    });
}

function update() {
    let idUpdate1 = sessionStorage.getItem("IdUpdate")
    let codeUpdate = $("#codeUpdate").val()
    let name = $("#nameUpdate").val()
    let age = $("#ageUpdate").val()
    let salary = $("#salaryUpdate").val()
    let department1 = $("#department").val()
    let newEmployee = {
        id: idUpdate1,
        code : codeUpdate,
        name: name,
        age: age,
        salary: salary,
        department: {
            id : department1
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "PUT",
        url: "http://localhost:8080/employees/" + idUpdate1,
        data: JSON.stringify(newEmployee),
        success: function (data) {
            if (data.name != null) {
                alert("Change success!")
                location.href = "index.html"
            }
        }
    });
    event.preventDefault();
}
function sort(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/employees/sort",
        success: function (data) {
            let content = '<table class="table table-hover text-center">' +
                '<tr>' +
                '<td>#</td>' +
                '<td>Employee Code</td>' +
                '<td>Name</td>' +
                '<td>Age</td>' +
                '<td>Salary</td>' +
                '<td>Department</td>' +
                '<td colSpan="2">Action</td>' +
                '</tr>';
            let count = 1;
            for (let i = 0; i < data.length; i++) {
                content += `<tr>` +
                    `<td>${count}</td>` +
                    listEmployee(data[i]) +
                    `</tr>`;
                count++;
            }
            content += '</table>'
            document.getElementById('list_employee').innerHTML = content;
        }
    });
}
function getAllDepartments(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/departments",
        success: function (data){
            let content = `<select id="select">`
            content += `<option value="${data.id}">${data.name}</option>`
            for (let i = 0; i < data.length; i++) {
                    content += displayDepartment(data[i])
            }
            content += `<select>`
            document.getElementById("list_department").innerHTML = content
        }
    })
}
function filter(){
    let id = $("#select").val()
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/employees/filter/" + id,
        success: function (data) {
            let content = '<table class="table table-hover text-center">' +
                '<tr>' +
                '<td>#</td>' +
                '<td>Employee Code</td>' +
                '<td>Name</td>' +
                '<td>Age</td>' +
                '<td>Salary</td>' +
                '<td>Department</td>' +
                '<td colSpan="2">Action</td>' +
                '</tr>';
            let count = 1;
            for (let i = 0; i < data.length; i++) {
                content += `<tr>` +
                    `<td>${count}</td>` +
                    listEmployee(data[i]) +
                    `</tr>`;
                count++;
            }
            content += '</table>'
            document.getElementById('list_employee').innerHTML = content;
        }
    });
}
