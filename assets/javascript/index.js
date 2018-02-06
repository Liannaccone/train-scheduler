  

  // Initialize Firebase

  var config = {
    apiKey: "AIzaSyAf_T5Dlg03SilUbpP8LzgTrOHJuX0ToQ0",
    authDomain: "train-scheduler-653c1.firebaseapp.com",
    databaseURL: "https://train-scheduler-653c1.firebaseio.com",
    projectId: "train-scheduler-653c1",
    storageBucket: "",
    messagingSenderId: "434212137281"
  };

  firebase.initializeApp(config);





// ====================================================================
//  GLOBAL VARIABLES
// ====================================================================


  // creating a variable to referencene the database
  var database = firebase.database();

  // creating variables to hold user inputs
  var inputName = "";
  var inputDestination = "";
  var inputFirstTime = "";
  var inputFrequency = "";
 // variables to be calculated off of inputs above
  var nextArrival = "";
  var minutesAway = "";



// ====================================================================





// ====================================================================
//  FUNCTIONS AND EVENTS
// ====================================================================


  // firebase watcher to dynamically append data as it is currently reflected in firebase (on page load and with every additional train input)
  database.ref().on("child_added", function(snapshot) {
    // storing the returned object as a variable
    var snap = snapshot.val();

    // to calculate nextArrival/minutesAway fields....

     // assigning variable for train start time from the database and pushing it back 1 year so it is always prior to the current time
    var firstTime = moment(snap.firstTime, "HH:mm").subtract(1, "years");

    // find the differences between the train's firstTime and timeNow
    var startDiffNow = moment().diff(moment(firstTime), "minutes");
    // to hold the time apart
    var timeApart = startDiffNow % snap.frequency;
    // minutes until arrival
    var minutesAway = snap.frequency - timeApart
    // calculates nextArrival until next train compared to the current time
    nextArrival = moment().add(minutesAway, 'm').format('LT');



      // append queries to update the HTML with firebase data
      // generates new row in the table
      var newRow = $("<tr>")
      // appends in the new data points to the row....
      newRow.append("<td>" + snap.name + "</td>");
      newRow.append("<td>" + snap.destination + "</td>");
      newRow.append("<td>" + snap.frequency + "</td>");
      newRow.append("<td>" + nextArrival + "</td>");
      newRow.append("<td>" + minutesAway + "</td>");

      // append new row to the table
      $("#train-table").append(newRow);

    }, 
      function(errorObject) {
        console.log("There was an error: " + errorObject.code);
 
  });





  // function to add user inputs to firebase on click of submit button
  $("#submit-train").on("click", function() {
    // prevents the page from refreshing when submit button is hit...
    event.preventDefault();

    // defining temp variables stored from user input elements...
    inputName = $("#name-input").val().trim();
    inputDestination = $("#destination-input").val().trim();
    inputFirstTime = $("#firstTime-input").val().trim();
    inputFrequency = $("#frequency-input").val().trim();


    // this pushes our responses to firebase
    database.ref().push({
      name: inputName,
      destination: inputDestination,
      firstTime: inputFirstTime,
      frequency: inputFrequency
    });

    // clears inputs from form to reset for next entry
    clearForm();

  });



  // function clears input field content (called when user hits submit button, once values are pushed to firebase)
  function clearForm() {
    $("#name-input").val("");
    $("#destination-input").val("")
    $("#firstTime-input").val("");
    $("#frequency-input").val("");
  };



// ====================================================================







