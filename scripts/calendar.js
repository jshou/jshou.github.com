var moment = require('moment');
var Mustache = require('mustache');
var $ = require('jquery');

var template = $('#gig').text();

var mykey = 'AIzaSyCA9pV8ZJNnG2Gmerj71DF30noN8DTiQ9c';
var calendarid = 'nr5jftdjm9p0lg4pigi0dsld6c@group.calendar.google.com';

var options = {
  key: mykey,
  maxResults: 20,
  orderBy: 'startTime',
  singleEvents: true,
  timeMin: (new Date()).toISOString()
};

$.get('https://www.googleapis.com/calendar/v3/calendars/' + calendarid + '/events?'+ $.param(options), function(data) {
  for (var i = 0; i < data.items.length; i++) {
    var date =  moment(data.items[i].start.dateTime).format('dddd, MMM Do YYYY');
    var start = moment(data.items[i].start.dateTime).format('h:mmA');
    var end = moment(data.items[i].end.dateTime).format('h:mmA');
    var band = data.items[i].summary;
    var venue = data.items[i].location;
    var venueMap = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(venue);

    var rendered = Mustache.render(template, {date: date, start: start, end: end, band: band, venueMap: venueMap});
    $('#gigs ul').append(rendered);
  }

});
