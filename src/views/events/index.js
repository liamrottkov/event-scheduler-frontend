import React, { Component } from 'react';
import './index.css';
import EventsForm from '../../components/eventsForm';
import EventsTable from '../../components/eventsTable';

class Events extends Component {
  constructor() {
    super();

    this.state = {
      'events': []
    }
  }

  getEvents = async(e) => {
    e.preventDefault();

    let day = e.target.elements.day.value;
    let month = e.target.elements.month.value;
    let year = e.target.elements.year.value;


    let URL = 'http://localhost:5000/api/retrieve';

    let response = await fetch(URL, {
      "method": "GET",
      "headers": {
        "Content-Type": "application/json",
        "year": year,
        "month": month,
        "day": day,
      }
    });

    let data = await response.json();

    if (data.events) {
      //store only events into variable
      let events = data.events;

      //sort by month then by Day
      events.sort(function(a,b) {
        return a.month - b.month
      });

      events.sort(function(a,b) {
        return a.day - b.day
      });

      this.setState({ events });
    }
  }

  deleteEvent = async(id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }

    let URL = 'http://localhost:5000/api/delete';

    let response = await fetch(URL, {
      "method": "DELETE",
      "headers": {
        "Content-Type": "application/json",
        "event_id": id
      }
    });

    let data = await response.json();

    if (data.success) {
      let events = this.state.events;
      events = events.filter(event => event.event_id != id);

      this.setState({ events });

      alert('Successfully deleted the event.');
    } else {
      alert('Sorry, but we could not delete the event.');
    }
  }

  render() {

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1>Get Events</h1>
            <EventsForm getEvents={this.getEvents}/>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10 offset-md-1">
            <EventsTable
              events={this.state.events}
              deleteEvent={this.deleteEvent}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Events;
