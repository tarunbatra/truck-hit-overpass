"use strict";

var DATA;

document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    importDataIfRequired().then(inititalize);
  }
};

function importDataIfRequired() {
  if (!DATA) {
    return fetch("./data.json").then(function (res) {
      return res.json();
    });
  } else {
    return Promise.resolve(DATA);
  }
}

function inititalize(data) {
  var lastIncident = data[0];
  populateMain(lastIncident);
  populateHistory(data);
}

var dateOffset = new Date().getTimezoneOffset() * 60 * 1000;
function getDaysSince(date) {
  var dateDiff =
    new Date() - new Date(Date.parse(date) + dateOffset);
  return Math.floor(dateDiff / (1000 * 3600 * 24));

}

function populateMain(lastIncident) {
  var main = document.getElementsByTagName("main")[0];
  var daysSince = getDaysSince(lastIncident.date);
  main.getElementsByTagName("h1")[0].innerHTML = daysSince;
  main.getElementsByTagName("h2")[0].innerHTML =
    "days since a truck hit an overpass in Lower Mainland";
}

function populateHistory(incidents) {
  var history = document.getElementById("history");
  for (var i = 0; i < incidents.length; i++) {
    var incident = incidents[i];
    var historyItem =
      '<div class="history-item" id="' +
      i +
      '">' +
      '<a target="_blank" href="' +
      incident.link +
      '">' +
      "<h4>" +
      incident.location +
      "</h4>" +
      '<img src="' +
      incident.image +
      '" />'
      + '<div class="overlay"><p>'+getDaysSince(incident.date)+' days since</p></div>';
    "</a>" + "</div>";
    history.innerHTML = history.innerHTML + historyItem;
  }
}
