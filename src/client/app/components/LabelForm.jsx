import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const LabelForm = React.createClass({

  emptyInput() {
    this.refs.TextField.input.value = "";
  },

  render() {
    return (
      <div className="form-card">
        <TextField
          floatingLabelText="Nom du label"
          fullWidth={true}
          onChange={(event, value) => localStorage.setItem("labelValue", value)}
          ref="TextField"
        />
        <RaisedButton
          label="Créer"
          primary={true}
          onClick={this.props.onClick}
        />
      </div>
    )
  }
})

export default LabelForm;