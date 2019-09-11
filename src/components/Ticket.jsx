import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

function Ticket(props){
  var myStyle = {
    backgroundColor: '#ecf0f1',
    fontFamily: 'monospace',
    fontSize: '24px'
  };
  var myOtherStyle = {
    fontSize: '15px'
  };
  return (
    <div style={myStyle}>
      <h3>{props.location} - {props.names}</h3>
      <h4>{displayTimeOpen(props.timeOpen)} ago</h4>
      <p><em style={myOtherStyle}>{props.issue}</em></p>
      <hr/>
    </div>
  );
}

function displayTimeOpen(timeOpen) {
  return timeOpen.from(new Moment(), true);
}

Ticket.propTypes = {
  names: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  issue: PropTypes.string,
  timeOpen: PropTypes.instanceOf(Moment).isRequired
};

export default Ticket;
