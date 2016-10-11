import React from 'react';
import Timer from "./Timer.jsx";

import RaisedButton from 'material-ui/RaisedButton';

const InTask = React.createClass({
  render() {
    return (
      <div className="foreground">
        <div className="timer-wrapper">
          <h1>{this.props.title}</h1>
          <Timer time={this.props.time} />
          <RaisedButton
            label={this.props.label}
            primary={true}
            onClick={this.props.onClick}
          />
        </div>
      </div>
    );
  }
});

export default InTask;
