import React from 'react';
import moment from 'moment';
import axios from 'axios';

class GigCalendar extends React.Component {
  constructor(props) {
    super(props);

    const mykey = 'AIzaSyCA9pV8ZJNnG2Gmerj71DF30noN8DTiQ9c';
    const calendarid = 'nr5jftdjm9p0lg4pigi0dsld6c@group.calendar.google.com';

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
      const data = response.data;
      for (var i = 0; i < data.items.length; i++) {
        const date =  moment(data.items[i].start.dateTime).format('dddd, MMM Do YYYY');
        const start = moment(data.items[i].start.dateTime).format('h:mmA');
        const end = moment(data.items[i].end.dateTime).format('h:mmA');
        const band = data.items[i].summary;
        const venue = data.items[i].location;

        const gig = <Gig key={i} date={date} start={start} end={end} band={band} venue={venue}/>;
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
  mapLink() {
    if (typeof(this.props.venue) == 'undefined') {
      return '';
    } else {
      const venueMap = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(this.props.venue);
      return [
        '(',
        <a key='0' href={ venueMap }>map</a>,
        ')'
      ];
    }
  }

  render() {
    const mapLink = this.mapLink();

    return (
      <li>
        <div className="date">{ this.props.date }, { this.props.start } - { this.props.end }</div>
        <div className="event">{ this.props.band } { mapLink }</div>
      </li>
    );
  }
}

export default GigCalendar;
