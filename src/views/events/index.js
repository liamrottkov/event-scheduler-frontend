import React, { Component } from 'react';
import './index.css';
import EventsForm from '../../components/eventsForm';

class Events extends Component {
  getEvents = async(e) => {
    e.preventDefault();

    console.log('worked');
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
            {/* TODO: Add event table */}
          </div>
        </div>
      </div>
    );
  }
}

export default Events;
