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

  // creating a variable to referencene the database
  var database = firebase.database();

  // creating variables 
  var inputName = "";
  var inputDestination = "";
  var inputFirstTime = "";
  var inputFrequency = "";
 // variables to be calculated off of inputs above
  var nextArrival = "";
  var minutesAway = "";


//  FUNCTIONS AND EVENTS
// =======================================


  // firebase watcher to dynamically append data as it is currently reflected in firebase (on page load and with every additional train input)
  database.ref().on("child_added", function(snapshot) {
    // storing the returned object as a variable
    var snap = snapshot.val()

    // append queries to update the HTML with firebase data
      // generates new row in the table
      var newRow = $("<tr>")
      // appends in the new data points to the row....
      newRow.append("<td>" + snap.name + "</td>");
      newRow.append("<td>" + snap.destination + "</td>");
      newRow.append("<td>" + snap.frequency + "</td>");
      newRow.append("<td>need to figure this out</td>");
      newRow.append("<td>need to figure this out</td>");

      // append new row to the table
      $("#train-table").append(newRow);

  }, function(errorObject) {
      console.log("There was an error: " + errorObject.code);
  });