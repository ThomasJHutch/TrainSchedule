var firebaseConfig = {
    apiKey: "AIzaSyBrPPDuL_Q0vEOu6Ys2aoSzhj2Qqkuh0MI",
    authDomain: "train-scheduler-2ac5b.firebaseapp.com",
    databaseURL: "https://train-scheduler-2ac5b.firebaseio.com",
    projectId: "train-scheduler-2ac5b",
    storageBucket: "train-scheduler-2ac5b.appspot.com",
    messagingSenderId: "562682691064",
    appId: "1:562682691064:web:e9a5d6cb7379781afd6a0d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// Create an on click function that adds trains to the top table
$("#addTrainBtn").on("click", function () {


    // create variables with the user input from form
    var trainName = $("trainNameInput").val().trim();
    var destination = $("destinationInput").val().trim();
    var firstTrain = moment($("firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("frequencyInput").val().trim();

    // create a temporary object for holding the new train data
    var newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    };

    // upload the new train data to the database
    database.ref().push(newTrain);

    // console log the values that were just pushed to the database
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);

    // clear the form values after values have been stored
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    // return false;
});

// create a firebase event for adding the data from the new trains and then populating them in the DOM.
database.ref().on("child_added", function (snapshot, prevChildKey) {
    console.log(childSnapshot.val());

    // store snapshot changes in variables
    var name = ChildSnapshot.val().name;
    var destination = ChildSnapshot.val().destination;
    var frequency = ChildSnapshot.val().frequency;
    var firstTrain = ChildSnapshot.val().firstTrain;

    // log the values
    console.log(name);
    console.log(destination);
    console.log(frequency);
    console.log(firstTrain);

    // process for calculating the Next Arrival and Minutes Away fields...
    // make sure the first train time is after the eventual current time
    var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh.mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    $("#trainTable > tBody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" +
        minutes + "</td><tr>");
})