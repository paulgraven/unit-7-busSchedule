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

    var departureMoment = moment(departureTime, "hh:mm A");
    var difference = moment().diff(departureMoment, "minutes");

    // ***** Research more *****
    // ***** Lots of Google for this, still don't really get it... *****
    var remainder = difference % frequency;
    var minutes = frequency - remainder;
    // ***** Research more *****

    var nextDeparture = moment()
      .add(minutes, "minutes")
      .format("hh:mm A");
    var minutesAway = moment(nextDeparture, "hh:mm A").diff(
      moment(),
      "minutes"
    );

    database.ref().push({
      name: name,
      destination: destination,
      departureTime: departureTime,
      frequency: frequency,
      nextDeparture: nextDeparture,
      minutesAway: minutesAway
    });
  });

  database.ref().on("child_added", function(snapshot) {
    var x = snapshot.val();
    var tableRow = $("<tr>");

    var tableName = $("<td>" + x.name + "</td>");
    var tableDestination = $("<td>" + x.destination + "</td>");
    var tableFrequency = $("<td>" + x.frequency + "</td>");
    var tablenextDeparture = $("<td>" + x.nextDeparture + "</td>");
    var tableMinutesAway = $("<td>" + x.minutesAway + "</td>");

    tableRow.append(
      tableName,
      tableDestination,
      tableFrequency,
      tablenextDeparture,
      tableMinutesAway
    );

    $("#table").append(tableRow);
  });
});
