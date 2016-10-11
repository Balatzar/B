import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const Label = React.createClass({
  render() {
    return (
      <div style={{backgroundColor: this.props.color, padding: 10, margin: 10, display: "inline-block"}}><RaisedButton label={this.props.title} onClick={this.props.onClick} /></div>
    );
  }
});



export default Label;