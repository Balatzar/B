import React from 'react';
import Paper from 'material-ui/Paper';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const Timer = React.createClass({
  render() {
    const time = this.props.time;
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return (
      <div>
        <Paper
          style={style}
          zDepth={1}
          circle={true}
          children={<p className="timer"><b>{minutes}:{seconds}</b></p>}
        />
      </div>
    )
  }
});

export default Timer;
