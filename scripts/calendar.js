import React from 'react';
import { range, zip } from 'rxjs';
import { getEvents } from 'gcal-events';

class GigCalendar extends React.Component {
  constructor(props) {
    super(props);

    const mykey = 'AIzaSyCA9pV8ZJNnG2Gmerj71DF30noN8DTiQ9c';
    const calendarid = 'nr5jftdjm9p0lg4pigi0dsld6c@group.calendar.google.com';

    this.state = {gigs: []};

    zip(range(1, 10000), getEvents(calendarid, mykey, { maxResults: 20 }), (i, eventData) => {
      return <Gig key={ i } data={ eventData } />;
    }).subscribe((gig) => {
      this.setState({ gigs: this.state.gigs.concat([gig]) });
    }, (error) => {
      console.log(error);
      this.setState({ calendarError: 'There was an error fetching the calendar. Please refresh to try again.' });
    });
  }

  render() {
    return (
      <div>
        <h4>Upcoming Gigs</h4>
        <ul>
          { this.state.gigs }
        </ul>
      </div>
    );
  }
}

class Gig extends React.Component {
  constructor(props) {
    super(props);
    const date = this.props.data.start.tz('America/Los_Angeles').format('dddd, MMM Do YYYY');
    const start = this.props.data.start.tz('America/Los_Angeles').format('h:mmA');
    const end = this.props.data.end.tz('America/Los_Angeles').format('h:mmA');
    const band = this.props.data.summary;
    const venue = this.props.data.location;

    this.state = { date, start, end, band, venue };
  }

  mapLink(venue) {
    if (typeof(venue) == 'undefined') {
      return '';
    } else {
      const venueMap = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(venue);
      return [
        '(',
        <a key='0' href={ venueMap }>map</a>,
        ')'
      ];
    }
  }

  render() {
    const mapLink = this.mapLink(this.state.venue);

    return (
      <li>
        <div className="date">{ this.state.date }, { this.state.start } - { this.state.end }</div>
        <div className="event">{ this.state.band } { mapLink }</div>
      </li>
    );
  }
}

export default GigCalendar;
