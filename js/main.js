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

