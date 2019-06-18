  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyACyhyDHoIRnVdKOg7Zer4ITbpTcTB1EPc",
    authDomain: "projectone-49b31.firebaseapp.com",
    databaseURL: "https://projectone-49b31.firebaseio.com",
    projectId: "projectone-49b31",
    storageBucket: "projectone-49b31.appspot.com",
    messagingSenderId: "32407098708",
    appId: "1:32407098708:web:308b5bd381038d36"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();
// var userRef = database.ref("/user");
var curRef;
var userName;
var userEmail;
var userGender;
var userMessage;
var city;
$("#go").on("click", function(event) {
    event.preventDefault();
    $("#leaveMessage").css("visibility", "visible");
    city = $("#searchCity").val().toLowerCase();
    curRef = database.ref("/user/" + city);
    curRef.once("value").then(function(snapshot) {
        console.log(snapshot.exists());
        if (!snapshot.exists()) {
            $("<h1>").attr("id", "notice").text("Message Not Found, start leave your message please").appendTo($("#display"));
        }
        displayMessage();

    });
});
$("#submitForm").on("click", function(event) {
    event.preventDefault();
    $("#notice").remove();
    userName = $("#userName").val();
    userEmail = $("#userEmail").val();
    userGender = $("#userGender").val();
    userMessage = $("#userMessage").val();
    // console.log(userName,userEmail,userGender,userMessage);
    curRef.push({
        name: userName,
        email: userEmail,
        gender: userGender,
        message: userMessage
    });
});
function displayMessage() {
    curRef.on("child_added", function(snapshot) {
        var messageBox = $("<div>").attr("class", "col-md-4");
        var messageInnerBox =$("<div>").addClass("box testimonial");
        var name = $("<p>").addClass("testiname").html(`<strong>${snapshot.val().name}</strong>`);
        // var email = $("<p>").text(snapshot.val().email);
        // var gender = $("<p>").text(snapshot.val().gender);
        // var message = $("<p>").text(snapshot.val().message);
        messageInnerBox.append(name,email,gender,message);
        messageBox.append($(messageBox);
        messageBox.appendTo($("#messageDisplay"));
    });
}