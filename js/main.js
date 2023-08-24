
//Adding a New Student
let addStudentModal = document.getElementById("myaddStudentModal");
let addStudentBtn = document.getElementById("addStudent");
let span = document.getElementsByClassName("close")[0];

addStudentBtn.onclick = function(){
    addStudentModal.style.display = "block";
}

span.onclick = function(){
    addStudentModal.style.display = "none";
}

window.onclick = function(event){
    if(event.target == addStudentModal){
        addStudentModal.style.display = "none";
    }
}

//Editing an existing User
//----------------------------
//Declaring the Edit form Modal from the HTML
let editStudentModal = document.getElementById("myEditStudentModal");

//Function to be triggered by an edit button click
function editStudentModalFunction(){
    editStudentModal.style.display = "block";
    //let editStudentBtn = document.getElementById("editStudent");

}

function closeModal(){
    let editSpan = document.getElementsByClassName("close");

    editSpan.onclick = editStudentModal.style.display = "none";
    window.onclick = function(event){
        if(event.target == editStudentModal){
            editStudentModal.style.display = "none";
        }
    }

}



    
    



