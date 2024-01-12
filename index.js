"use strict";

function inititalize(data) {
  var dateOffset = new Date().getTimezoneOffset() * 60 * 1000;
  var dateDiff = new Date() - new Date(Date.parse(data.date) + dateOffset);
  var daysSince = Math.floor(dateDiff / (1000 * 3600 * 24));
  document.getElementsByTagName('h1')[0].innerHTML = daysSince;
  document.getElementsByTagName('a')[0].href = data.link;
  document.getElementsByTagName('h2')[0].innerHTML = 'days since a truck hit an overpass in Lower Mainland'
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    fetch('./data.json').then(function (res) {
      res.json().then(inititalize);
    });
  }
};
