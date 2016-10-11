import React from 'react';

import Label from "./Label.jsx";

import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';

const CardForm = React.createClass({

  getInitialState() {
    return {
      selectedLabels: [],
      labels: this.props.labels.map(l => l.title),
    }
  },

  resetForm() {
    this.refs.TextField.input.value = "";
    localStorage.setItem("taskLabels", "[]");
    this.refs.AutoComplete.setState({ searchText: "" });
    this.setState({ selectedLabels: [] });
  },

  newRequest(chosenRequest) {
    const taskLabels = JSON.parse(localStorage.getItem("taskLabels"));
    const label = this.props.labels.find(l => l.title === chosenRequest);
    taskLabels.push(label);
    localStorage.setItem("taskLabels", JSON.stringify(taskLabels));
    const selectedLabels = this.state.selectedLabels;
    selectedLabels.push(label);
    this.setState({ selectedLabels });
    console.log(this.state)
    this.refs.AutoComplete.setState({ searchText: "" });
  },

  render() {
    return (
      <div className="form-card">
        <TextField
          floatingLabelText="Tâche à accomplir"
          fullWidth={true}
          onChange={(event, value) => localStorage.setItem("taskValue", value)}
          ref="TextField"
        />
        <AutoComplete
          floatingLabelText="Labels"
          fullWidth={true}
          filter={AutoComplete.fuzzyFilter}
          dataSource={this.state.labels}
          maxSearchResults={5}
          onNewRequest={this.newRequest}
          ref="AutoComplete"
        />
        <br />
        {this.state.selectedLabels.map((l, i) => <Label title={l.title} color={l.color} key={i} onClick={null} />)}
        <br />
        <RaisedButton
          label="Créer"
          primary={true}
          onClick={this.props.onClick}
        />
      </div>
    )
  }
})

export default CardForm;