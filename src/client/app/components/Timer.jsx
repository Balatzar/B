import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Timer = React.createClass({
  render() {
    const time = this.props.time;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return (
      <div className="timer-wrapper">
        <h1>{this.props.title}</h1>
        <p className="timer"><b>{minutes}:{seconds}</b></p>
        <RaisedButton
          label={this.props.label}
          primary={true}
          onClick={this.props.onClick}
        />
      </div>
    );
  }
});

export default Timer;
