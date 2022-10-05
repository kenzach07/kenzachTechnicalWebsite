var selectedRow = null;
var id = 3;
var db = openDatabase("itemDB", "1.0", "itemDB", 65535);

//show updated table data at load
window.onload = function () {
  document.getElementById("list").click();
};

//show alert
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;

  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);

  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

//clear all fields
function clearFields() {
  document.querySelector("#projectName").value = "";
  document.querySelector("#description").value = "";
  document.querySelector("#targetID").value = "";
  document.querySelector("#completedID").value = "";
}

//clear button function
document.querySelector("#career-form").addEventListener("reset", (e) => {
  clearFields();
});

//CREATE A TABLE
document.querySelector("#career-form").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("create")) {
    db.transaction(function (transaction) {
      var sql = "CREATE TABLE items " + "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," + "projectname VARCHAR(30) NOT NULL," + "descrip VARCHAR(30) NOT NULL," + "targetDate DATE NOT NULL, " + "completeDate DATE)";
      transaction.executeSql(
        sql,
        undefined,
        function () {
          alert("Table is created successfully");
        },
        function () {
          alert("Table not created");
        }
      );
    });
  }

  //INSERT A TABLE IN DATA
  if (target.classList.contains("insert")) {
    const projectNameA = document.querySelector("#projectName").value;
    const descriptionA = document.querySelector("#description").value;
    const targetIDA = document.querySelector("#targetID").value;
    const completedIDA = document.querySelector("#completedID").value;

    if (projectName === "" || description === "" || targetID === "" || completedID === "") {
      showAlert("Please fill in all fields", "danger");
    } else {
      if (selectedRow === null) {
        db.transaction(function (transaction) {
          var sql = "INSERT INTO items(projectname, descrip, targetDate, completeDate) VALUES(?,?,?,?)";
          transaction.executeSql(
            sql,
            [projectNameA, descriptionA, targetIDA, completedIDA],
            function () {
              selectedRow = null;
              showAlert("NEW ENTRY ADDED", "success");

              clearFields();
              loadData();
            },
            function (transaction, err) {
              alert(err.message);
            }
          );
        });
      } else {
        selectedRow.children[1].textContent = projectNameA;
        selectedRow.children[2].textContent = descriptionA;
        selectedRow.children[3].textContent = targetIDA;
        selectedRow.children[4].textContent = completedIDA;
        selectedRow = null;
        showAlert("ENTRY UPDATED", "info");
      }
      clearFields();
    }
  }

  //FOR LOADING THE DATA
  if (target.classList.contains("list")) {
    loadData();
  }

  function loadData() {
    $("#project-list").children().remove();
    db.transaction(function (transaction) {
      var sql = "SELECT * FROM items ORDER BY id ASC";
      transaction.executeSql(
        sql,
        undefined,
        function (transaction, result) {
          if (result.rows.length) {
            for (var i = 0; i < result.rows.length; i++) {
              var row = result.rows.item(i);
              var projectname = row.projectname;
              var id = row.id;
              var descrip = row.descrip;
              var tDate = row.targetDate;
              var cDate = row.completeDate;
              $("#project-list").append('<tr id="del' + id + '"><td id=' + id + ">" + id + "</td><td>" + projectname + "</td><td>" + descrip + "</td><td>" + tDate + "</td><td>" + cDate + '</td><td><a href="#" class="btn btn-primary edit" data-id="' + id + '">Edit</a>  <a href="#" class="btn btn-danger delete" data-id="' + id + '">Delete</a></td></tr>');
            }
          } else {
            $("#project-list").append('<tr><td colspan="3" align="center">No Item Found</td></tr>');
          }
        },
        function (transaction, err) {
          alert('No table found. Click on "Create Table" to create table now');
        }
      );
    });
  }
});

//edit data
document.querySelector("#project-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("edit")) {
    selectedRow = target.parentElement.parentElement;

    document.querySelector("#projectName").value = selectedRow.children[1].textContent;
    document.querySelector("#description").value = selectedRow.children[2].textContent;
    document.querySelector("#targetID").value = selectedRow.children[3].textContent;
    document.querySelector("#completedID").value = selectedRow.children[4].textContent;
  }

  //delete data
  if (target.classList.contains("delete")) {
    selectedRow = target.parentElement.parentElement;
    var sure = confirm("Are you sure to delete this item?");
    if (sure === true) {
      var id = selectedRow.children[0].textContent;
      db.transaction(function (transaction) {
        var sql = "DELETE FROM items where id=?";
        transaction.executeSql(
          sql,
          [id],
          function () {
            selectedRow.remove();
            showAlert("ENTRY DELETED", "danger");
          },
          function (transaction, err) {
            alert(err.message);
          }
        );
      });
    }
  }
});
