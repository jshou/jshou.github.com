var moment = require('moment');
var Mustache = require('mustache');

var mykey = 'AIzaSyCA9pV8ZJNnG2Gmerj71DF30noN8DTiQ9c';
var calendarid = 'nr5jftdjm9p0lg4pigi0dsld6c@group.calendar.google.com';

var schedule = $.grabCalendar({
  type: "detailedEvents",
  clean_date: false,
  maxEvents: 20,
  upcoming: true,
});

var template = $('#gig');
Mustache.parse(template);
console.log(template);

for (var i = 0; i < schedule.length; i++) {
  var date =  moment(schedule[i].start.dateTime).format('dddd, MMM Do YYYY');
  var start = moment(schedule[i].start.dateTime).format('h:mmA');
  var end = moment(schedule[i].end.dateTime).format('h:mmA');
  var band = schedule[i].summary;
  var venue = schedule[i].location;
  var venueMap = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(venue);

  var rendered = Mustache.render(template, {date: date, start: start, end: end, band: band, venueMap: venueMap});
  $('#gigs ul').append(rendered);
}

