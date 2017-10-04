import React from 'react';
import moment from 'moment';
import axios from 'axios';

class GigCalendar extends React.Component {
  constructor(props) {
    super(props);

    var mykey = 'AIzaSyCA9pV8ZJNnG2Gmerj71DF30noN8DTiQ9c';
    var calendarid = 'nr5jftdjm9p0lg4pigi0dsld6c@group.calendar.google.com';

    var options = {
      key: mykey,
      maxResults: 20,
      orderBy: 'startTime',
      singleEvents: true,
      timeMin: (new Date()).toISOString()
    };

    this.state = {gigs: []};

    axios.get('https://www.googleapis.com/calendar/v3/calendars/' + calendarid + '/events', {
      params: options
    }).then(function(response) {
      var data = response.data;
      for (var i = 0; i < data.items.length; i++) {
        var date =  moment(data.items[i].start.dateTime).format('dddd, MMM Do YYYY');
        var start = moment(data.items[i].start.dateTime).format('h:mmA');
        var end = moment(data.items[i].end.dateTime).format('h:mmA');
        var band = data.items[i].summary;
        var venue = data.items[i].location;
        var venueMap = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(venue);

        var gig = <Gig key={i} date={date} start={start} end={end} band={band} venueMap={venueMap}/>;
        this.setState({gigs: this.state.gigs.concat([gig])});
      }

    }.bind(this));
  }

  render() {
    return (
      <div>
        <h4>Gigs</h4>
        <ul>
          { this.state.gigs }
        </ul>
      </div>
    );
  }
}

class Gig extends React.Component {
  render() {
    return (
      <li>
        <div className="date">{ this.props.date }, { this.props.start } - { this.props.end }</div>
        <div className="event">{ this.props.band } (<a href="{ this.props.venueMap }">map</a>)</div>
      </li>
    );
  }
}

export default GigCalendar;
