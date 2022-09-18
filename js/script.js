var selectedRow = null;
var id = 3;


//show alert
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}




//clear all fields
function clearFields(){
    document.querySelector("#projectName").value = "";
    document.querySelector("#description").value = "";
    document.querySelector("#targetID").value = "";
    document.querySelector("#completedID").value = "";
}

//clear button function
document.querySelector("#career-form").addEventListener("reset", (e) => {
    clearFields();
});

//add data
document.querySelector("#career-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const projectName = document.querySelector("#projectName").value;
    const description = document.querySelector("#description").value;
    const targetID = document.querySelector("#targetID").value;
    const completedID = document.querySelector("#completedID").value;

    //validation if empty field
    if(projectName =="" || description =="" || targetID=="" || completedID==""){
    showAlert("Please fill in all fields", "danger");
    }else{
    if(selectedRow == null){
        switcher = true;
        const list = document.querySelector("#project-list");

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${id++}</td>
            <td>${projectName}</td>
            <td>${description}</td>
            <td>${targetID}</td>
            <td>${completedID}</td>
            <td>
            <a href="#" class="btn btn-warning btn-sm edit"> Edit </a>
            <a href="#" class="btn btn-danger btn-sm delete"> Delete </a>
            </td>
        `;
        list.appendChild(row);
        selectedRow = null;
        showAlert("NEW ENTRY ADDED", "success");
    }
    else{
        
        
        selectedRow.children[1].textContent = projectName;
        selectedRow.children[2].textContent = description;
        selectedRow.children[3].textContent = targetID;
        selectedRow.children[4].textContent = completedID;
        selectedRow = null;
        showAlert("ENTRY UPDATED", "info");
        
    }
    clearFields();
}
});

//edit data
document.querySelector("#project-list").addEventListener("click", (e) => {
    target = e.target;

    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        
        document.querySelector("#projectName").value = selectedRow.children[1].textContent; 
        document.querySelector("#description").value = selectedRow.children[2].textContent; 
        document.querySelector("#targetID").value = selectedRow.children[3].textContent; 
        document.querySelector("#completedID").value = selectedRow.children[4].textContent; 
    }

});


//delete data
document.querySelector("#project-list").addEventListener("click", (e) => {
    
    target = e.target;
    
    if(target.classList.contains("delete")){
        if (confirm("ARE YOU SURE YOU WANT TO DELETE?") == true) {
            target.parentElement.parentElement.remove();
            clearFields();
            showAlert("CAREER DATA DELETED", "info");
          } else {
            showAlert("CAREER DATA NOT DELETED", "danger");
          }
        
        
    }   

    
});