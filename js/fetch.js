//CRUD OPERATIONS USING FETCH API

//Getting all Students into the table
//---------------------------------------
fetch('https://localhost:7007/api/Students/getstudentdb').then((data) => {
    // console.log(data); json format
    return data.json(); //Converted to Object
}).then((objectData) => {
    console.log(objectData[0].firstName);
    let tableData = "";
    objectData.map((values) => {
        tableData += `<tr>
        <td>${values.firstName}</td>
        <td>${values.middileName}</td>
        <td>${values.lastName}</td>
        <td>${values.department}</td>
        <td>2023-HA-${values.id}</td>
        <td>
            <button id ="editStudent" data-id="${values.id}" onclick="editStudentModalFunction()">
                <span class="material-symbols-outlined">
                    edit
                </span>
            </button>
        </td>
        <td>
            <button id = "deleteStudent" data-id="${values.id}" onclick="deleteStudent(${values.id})">
                <span class="material-symbols-outlined">
                    delete
                </span>
            </button>
        </td>
      </tr>`;
    });
    document.getElementById("tableBody").innerHTML = tableData;
});
//Getting the value of the list of added or admitted students and sending to the Admitted Students Card
fetch('https://localhost:7007/api/Students/getstudentdb').then((data) => {
    return data.json();
}).then((objData) => {
    let admittedStudents = objData.length;
    return document.getElementById("admittedStudents").innerHTML = admittedStudents;
});

//Adding a New Student
//----------------------------
// Function to collect the Input Values in the form
function getAddStudentInputValues(){
    return{
        firstName:document.getElementById('firstName').value,
        middileName: document.getElementById('midName').value,
        lastName: document.getElementById('lastName').value,
        department: document.getElementById('department').value
    }
}

//Adding a New Student with the Fetch API
const form = document.getElementById('submitBtn');


let buttonIsClicked = false;
form.addEventListener('click', (e) =>{

    //Code to Disable the "Add Student" button after first click
    buttonIsClicked = true;
    form.style.cursor = "not-allowed";
    form.disabled = true;
    const data = getAddStudentInputValues();
    console.log(data);

    //POST API to add a New Student
    fetch('https://localhost:7007/api/Students/addstudent', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            'Content-Type' : 'application/json'
        }

    }).then(res => res.json())
    .then(res => console.log(res));
    e.preventDefault();

    //Toastr Notification for an added student
    $(function(){
        toastr.success(`${document.getElementById('firstName').value} added Successfully, Kindly press the close button`, "Activated", {timeOut: 5000});
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    });

    //refeshes the page after 5 secs
    setTimeout(reFresh, 5000);
    
});


//Continued Code to Disable the "Add Student" button after the first click
form.addEventListener("mouseenter", () =>{
    if(buttonIsClicked){
        form.style.cursor = "not-allowed";
    }
})

form.addEventListener("mouseleave", () =>{
    if(buttonIsClicked){
        form.style.cursor = "not-default";
    }
})

//Function to Delete Data
let dataisDeleted = false;
function deleteStudent(studentId) {
    fetch(`https://localhost:7007/api/Students/deletestudent?id=${studentId}`, {
        method: "DELETE",
    })
    .then((res) => res.json())
    .then(data => {
        console.log(data); // Optionally, log the response

        // Find the row in the table and remove it
        const rowToRemove = document.querySelector(`tr[data-id="${studentId}"]`);
        if (rowToRemove) {
            rowToRemove.remove();
        }
    })
    .catch(error => {
        console.error("Error deleting student:", error);
    });
    dataisDeleted = true;
    if(dataisDeleted = true){
        alert("This Student will be deleted!")
    }
    
    //Toastr Notification for a newly deleted student
    $(function(){
        toastr["success"](`Student deleted Successfully, Kindly press the close button`, "Activated")
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    });
    
    setTimeout(reFresh, 5000)

}

//Function to Edit Data
function editStudent(studentId){
    fetch(`https://localhost:7007/api/Students/getstudentbyid?id=${studentId}`)
    .then((res) => res.json())
    .then((data) =>{
        document.getElementById('firstName').value = data.firstName;
        document.getElementById('midName').value = data.middleName;
        document.getElementById('lastName').value = data.lastName;
        document.getElementById('department').value = data.department;
    })
    .catch((error) => {
        console.error("Error fething student for edit", error);
    })
}


//Function to refresh page
function reFresh(){
    location.reload();
}