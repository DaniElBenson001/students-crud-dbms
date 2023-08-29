//CRUD OPERATIONS USING FETCH API
//Getting all Students into the table
//---------------------------------------
var userId;
fetch('https://localhost:7007/api/Students/getstudentdb').then((data) => {
    // console.log(data); json format
    return data.json(); //Converted to Object
}).then((objectData) => {
    console.log(objectData[0].firstName);
    let tableData = "";
    objectData.map((values) => {
        tableData += `<tr>
        <td>${values.firstName}</td>
        <td>${values.middleName}</td>
        <td>${values.lastName}</td>
        <td>${values.department}</td>
        <td>${values.regNumber}</td>
        <td>
            <button id ="editStudent" data-id="${values.id}" onclick="getStudentInfo(${values.id})">
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


//Getting the value of the list of DELETED students and sending to the Deleted Students Card
fetch('https://localhost:7007/api/Students/getDeletedstudentdb').then((data) => {
    return data.json();
}).then((objData) => {
    let deletedStudents = objData.length;
    return document.getElementById("deletedStudents").innerHTML = deletedStudents;
});


//Adding a New Student
//----------------------------
// Function to collect the Input Values in the form
function getAddStudentInputValues(){
    return{
        firstName:document.getElementById('firstName').value,
        middleName: document.getElementById('midName').value,
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
        toastr.success(`${document.getElementById('firstName').value} added Successfully, Kindly press the close button`, "Added Student", {timeOut: 5000});
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
        method: "GET",
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
        toastr["error"](`Student deleted Successfully, Kindly press the close button`, "Deleted Student")
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

//Get Student Info for edit
function getStudentInfo(studentId) {
    userId = studentId
    console.log(studentId);
    fetch(`https://localhost:7007/api/Students/getstudentbyid?id=${studentId}`, {
        method: "GET",
    })
    .then((res) => res.json())
    .then(data => {
        console.log(data); // Optionally, log the response
        
        //this populates the edit inputs with previous data
        document.getElementById("editFirstName").value= data.firstName;
        document.getElementById("editMidName").value= data.middleName;
        document.getElementById("editLastName").value= data.lastName;

        //This pops up the modal with the previous data
        let editStudentModal = document.getElementById("myEditStudentModal");
        editStudentModal.style.display = "block";

        //this closes the modal
        let closeEdit = document.getElementById('closeEditForm');
        closeEdit.onclick = function(){
            editStudentModal.style.display ="none";
        }

        //this closes the modal by touching the exterior regions of the modal window
        window.onclick = function(event){
            if(event.target == editStudentModal){
                editStudentModal.style.display = "none";
            }
        }
    })
    .catch((error) => {
        console.error("Error getting Student's info:", error);
    });
}

function editStudentData() {
    console.log(userId);
    
    
}


const editForm = document.getElementById('saveEditBtn');
let EditButtonIsClicked = false;

editForm.addEventListener('click', (e) => {
    buttonIsClicked = true;
    form.style.cursor = "not-allowed";
    form.disabled = true;

    var data = getnewData();
    console.log(data);

    function getnewData(){
        return{
            id: userId,
            firstName: document.getElementById("editFirstName").value,
            middleName: document.getElementById("editMidName").value,
            lastName: document.getElementById("editLastName").value
        }
    }

    fetch(`https://localhost:7007/api/Students/editstudent`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then((updatedStudent) => {
        console.log("Student updated:", updatedStudent);
    });
    e.preventDefault();

    $(function(){
        toastr['info'](`Student edited Successfully, Kindly press the close button`, "Added Student", {timeOut: 5000});
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
})

//Function to refresh page
function reFresh(){
    location.reload();
}