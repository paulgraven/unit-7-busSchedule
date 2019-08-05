$(document).ready(function() {
  var database = firebase.database();

  $(document).on("click", "#submit", function() {
    event.preventDefault();

    var name = $("#name")
      .val()
      .trim();
    var destination = $("#destination")
      .val()
      .trim();

    var departureTime = $("#departureTime")
      .val()
      .trim();
    var frequency = $("#frequency")
      .val()
      .trim();

    // var nowTime = moment().diff(moment(departureTime), "minutes");
    // console.log(nowTime);

    console.log(moment());
    console.log(moment().format("hh:mm"));
    console.log(moment(departureTime));

    // var arrivalTime = $("#arrivalTime")
    //   .val()
    //   .trim();
    // var minutesAway = $("#minutesAway")
    //   .val()
    //   .trim();

    // var duration = arrivalTime - departureTime;
    // console.log(duration);
    database.ref().push({
      name: name,
      destination: destination,
      departureTime: departureTime,
      frequency: frequency
      // arrivalTime: arrivalTime,
      // minutesAway: minutesAway
    });
  });

  database.ref().on("child_added", function(snapshot) {
    var x = snapshot.val();
    var tableRow = $("<tr>");

    var tableName = $("<td>" + x.name + "</td>");
    var tableDestination = $("<td>" + x.destination + "</td>");
    var tableFrequency = $("<td>" + x.frequency + "</td>");
    // var tableArrivalTime = $("<td>" + x.arrivalTime + "</td>");
    // var tableMinutesAway = $("<td>" + x.minutesAway + "</td>");

    tableRow.append(
      tableName,
      tableDestination,
      tableFrequency
      // tableArrivalTime,
      // tableMinutesAway
    );

    $("#table").append(tableRow);
  });
});
