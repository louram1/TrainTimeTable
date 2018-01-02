/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the Next Train arrival time based on current time. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Minutes away for Next Train arrival from curren time

// 1. Initialize Firebase
// var config = {
//   apiKey: "AIzaSyA_QypGPkcjPtylRDscf7-HQl8ribnFeIs",
//   authDomain: "time-sheet-55009.firebaseapp.com",
//   databaseURL: "https://time-sheet-55009.firebaseio.com",
//   storageBucket: "time-sheet-55009.appspot.com"
// };

// firebase.initializeApp(config);

var config = {
    apiKey: "AIzaSyAU8cQZBKgaROIKXMp430csQ9FvoiK_UPM",
    authDomain: "trainschedule-be074.firebaseapp.com",
    databaseURL: "https://trainschedule-be074.firebaseio.com",
    projectId: "trainschedule-be074",
    storageBucket: "trainschedule-be074.appspot.com",
    messagingSenderId: "832800897657"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  
  var trainName = $("#train-name-input").val().trim();
  var Dest = $("#destination-input").val().trim();
  //console.log(Dest);
  //var FirstTrainTime = moment($("#FirstTrain-input").val().trim(), "DD/MM/YY").format("X");
  var FirstTrainTime = $("#FirstTrain-input").val().trim();
  var TrainFreq = $("#rate-input").val().trim();

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    Destination: Dest,
    FirstStart: FirstTrainTime,
    Freq: TrainFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.Destination);
  console.log(newTrain.FirstStart);
  console.log(newTrain.Freq);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#FirstTrain-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var TrainTitle = childSnapshot.val().name;
  var TrainDest = childSnapshot.val().Destination;
  var TrainStart = childSnapshot.val().FirstStart;
  var TrainFreq = childSnapshot.val().Freq;

  // Train Info
  console.log(TrainTitle);
  console.log(TrainDest);
  console.log(TrainStart);
  console.log(TrainFreq);

  // Prettify the employee start
  //var empStartPretty = moment.unix(empStart).format("MM/DD/YY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
 // var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
 // console.log(empMonths);

  // Calculate the total billed rate
 // var empBilled = empMonths * empRate;
//  console.log(empBilled);
  var tFrequency = parseInt(TrainFreq);
  var firstTimeConverted = moment(TrainStart, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);
  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);
    // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
    // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  var ArrivalTime = moment(nextTrain).format("hh:mm");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  console.log(ArrivalTime);
  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + TrainTitle + "</td><td>" + TrainDest + "</td><td>" +
  TrainFreq + "</td><td>" + ArrivalTime + "</td><td>" + tMinutesTillTrain + "</td><td>");
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
