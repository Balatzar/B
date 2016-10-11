import React from 'react';

const Timer = React.createClass({
  render() {
    const time = this.props.time;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return (
        <p className="timer"><b>{minutes}:{seconds}</b></p>
    );
  }
});

export default Timer;
