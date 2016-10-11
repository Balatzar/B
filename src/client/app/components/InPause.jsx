import React from 'react';
import Timer from "./Timer.jsx";

import RaisedButton from 'material-ui/RaisedButton';

const InPause = React.createClass({
  render() {
    return (
      <div className="foreground">
        <div className="timer-wrapper">
          <h1>C'est la pause !</h1>
          <Timer time={this.props.time} />
          <h3>{this.props.title}</h3>
          <RaisedButton
            label="Continuer"
            primary={true}
            disabled={this.props.restart}
            onClick={this.props.onClick}
          />
        </div>
      </div>
    );
  }
});

export default InPause;
