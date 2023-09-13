let users = JSON.parse(localStorage.getItem("users")) || [];
let loggedinUser = JSON.parse(localStorage.getItem("loggedinUser")) || [];
let files = JSON.parse(localStorage.getItem("documents")) || [];
let chats = JSON.parse(localStorage.getItem("chats")) || [];
let currentTime = new Date().toLocaleString();
const searchParams = new URLSearchParams(window.location.search);
var regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

if (
  window.location.pathname !== "/login.html" &&
  window.location.pathname !== "/register.html" &&
  window.location.pathname !== "/registration_success.html" &&
  loggedinUser.length === 0
) {
  window.location.href = "/login.html";
}

function addText(id, text) {
  document.getElementById(id).innerHTML = text;
}
function displayError(arg) {
  document.getElementById("error").style.display = arg;
}

// User Management
function userRegister() {
  if (registerValidate() == true) {
    var userData = {
      name: document.getElementById("username").value,
      email: document.getElementById("useremail").value,
      password: document.getElementById("password").value,
    };
    users.push(userData);
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "/registration_success.html";
  }
}

function updateUser(uid) {
  if (usereditValidate() == true) {
    if (users[uid].email == loggedinUser[0].email) {
      loggedinUser[0].email = document.getElementById("useremail").value;
      localStorage.setItem("loggedinUser", JSON.stringify(loggedinUser));
    }
    users[uid].name = document.getElementById("username").value;
    users[uid].email = document.getElementById("useremail").value;
    localStorage.setItem("users", JSON.stringify(users));
    window.location.href = "/manage_users.html";
  }
}

function deleteUser(uid) {
  users.splice(uid, 1);
  localStorage.setItem("users", JSON.stringify(users));
  window.location.href = "/manage_users.html";
}

function registerValidate() {
  var validation = false;
  var name = document.getElementById("username").value;
  var email = document.getElementById("useremail").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm-password").value;

  if (name == "" || email == "" || password == "") {
    addText("error", "All fields are required.");
    displayError("block");
  } else if (!regex.test(email)) {
    addText("error", "Invalid Email Address.");
    displayError("block");
  } else if ((password === confirmPassword) == "") {
    addText("error", "Password does not match.");
    displayError("block");
  } else {
    displayError("none");
    validation = true;
  }
  return validation;
}

function userLogin() {
  if (loginValidate() == true) {
    var userLoginData = { email: document.getElementById("useremail").value };
    loggedinUser.push(userLoginData);
    localStorage.setItem("loggedinUser", JSON.stringify(loggedinUser));
    window.location.href = "/login_success.html";
  }
}

function loginValidate() {
  var email = document.getElementById("useremail").value;
  var password = document.getElementById("password").value;
  if (!regex.test(email)) {
    addText("error", "Invalid Email Address.");
    displayError("block");
  } else if (password == "") {
    addText("error", "Password required.");
    displayError("block");
  } else if (localStorage.getItem("users").includes(email) == false) {
    addText("error", "Email not exist.");
    displayError("block");
  } else if (localStorage.getItem("users").includes(password) == false) {
    addText("error", "Please enter correct password.");
    displayError("block");
  } else {
    displayError("none");
    return true;
  }
}

function usereditValidate() {
  var email = document.getElementById("useremail").value;
  var name = document.getElementById("username").value;
  if (email == "" || !regex.test(email)) {
    addText("error", "Invalid Email Address.");
    displayError("block");
  } else if (name == "") {
    addText("error", "Full Name required.");
    displayError("block");
  } else {
    displayError("none");
    return true;
  }
}

function userLogout() {
  if (loggedinUser[0].email != "") {
    loggedinUser.splice(0, 1);
    localStorage.setItem("loggedinUser", JSON.stringify(loggedinUser));
    window.location.href = "/welcome.html?user=logout";
  }
}

// File Management
function fileUpload() {
  file = document.getElementById("file").value;
  fileDescription = document.getElementById("file-description").value;
  if (file == "" && fileDescription == "") {
    addText("error", "<p>File Description Required.</p><p>File Required</p>");
    displayError("block");
  } else if (file == "") {
    addText("error", "File Required.");
    displayError("block");
  } else if (fileDescription == "") {
    addText("error", "File Description Required.");
    displayError("block");
  } else {
    var fileData = {
      description: document.getElementById("file-description").value,
      fileName: file.split("\\").pop(),
    };
    files.push(fileData);
    localStorage.setItem("documents", JSON.stringify(files));
    displayError("none");
    window.location.href = "/manage_documents.html";
  }
}

function editFileSubmit(fid) {
  if (fileEditValidate() == true) {
    files[fid].description = document.getElementById(
      "edit-file-description"
    ).value;
    localStorage.setItem("documents", JSON.stringify(files));
    window.location.href = "/manage_documents.html";
  }
}

function deleteFileSubmit(fid) {
  files.splice(fid, 1);
  localStorage.setItem("documents", JSON.stringify(files));
  window.location.href = "/manage_documents.html";
}

function fileEditValidate() {
  fileDescription = document.getElementById("edit-file-description").value;
  if (fileDescription == "") {
    addText("error-edit", "File Description Required.");
    document.getElementById("error-edit").style.display = "block";
  } else {
    return true;
  }
}

// Chat functionality
function chatSubmit() {
  if (document.getElementById("chat-text").value != "") {
    displayError("none");
    var message = `[${currentTime}] ${
      document.getElementById("chat-username").innerHTML
    } : ${document.getElementById("chat-text").value}`;
    var chatData = { message };
    chats.push(chatData);
    localStorage.setItem("chats", JSON.stringify(chats));
    document.getElementById("chat-text").value = "";
    document.getElementById("chat-window").innerHTML += `<p>${message}</p>`;
  } else {
    addText("error", "Please insert chat message.");
    displayError("block");
  }
}
