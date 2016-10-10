import React from 'react';
import {render} from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';

import CardTask from './components/CardTask.jsx';
import CardForm from './components/CardForm.jsx';
import TaskLabel from './components/TaskLabel.jsx';
import LabelForm from './components/LabelForm.jsx';
import AllLabels from './components/AllLabels.jsx';

import Test from './components/test.jsx';

const style = {
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

const tapEvent = require('react-tap-event-plugin');  
tapEvent();

let tasks = JSON.parse(localStorage.getItem("tasks"));
if (!tasks) {
  localStorage.setItem("tasks", "[]");
  tasks = [];
}

let labels = JSON.parse(localStorage.getItem("labels"));
if (!labels) {
  localStorage.setItem("labels", "[]");
  labels = [];
}

localStorage.setItem("taskLabels", "[]");

console.log(tasks)

const App = React.createClass({
  getInitialState() {
    return {
      tasks,
      labels,
    }
  },

  addTask() {
    const title = localStorage.getItem("taskValue");
    const labels = JSON.parse(localStorage.getItem("taskLabels"));
    const tasks = this.state.tasks;
    tasks.push({ title, labels});
    this.setState({ tasks });
    this.refs.CardForm.resetForm();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(this.state);
  },

  removeTask(title) {
    const tasks = this.state.tasks.filter(t => t.title !== title)
    this.setState({ tasks });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(this.state);
  },

  addLabel() {
    const label = localStorage.getItem("labelValue");
    const labels = this.state.labels;
    labels.push(label);
    this.setState({ labels });
    this.refs.LabelForm.emptyInput();
    localStorage.setItem("labels", JSON.stringify(labels));
    console.log(this.state);
  },

  deleteLabel(label) {
    const labels = this.state.labels.filter(l => l !== label);
    this.setState({ labels });
    localStorage.setItem("labels", JSON.stringify(labels));
    console.log(this.state);
  },

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <CardForm onClick={this.addTask} labels={this.state.labels} ref="CardForm" />
          <LabelForm onClick={this.addLabel} ref="LabelForm" />
          <AllLabels onClick={this.deleteLabel} labels={this.state.labels} />
          <Divider />
          {this.state.tasks.length ? this.state.tasks.map((t, i) => {
            const boundDelete = this.removeTask.bind(this, t.title);
            return <CardTask title={t.title} labels={t.labels} key={i} onDelete={boundDelete} />
          }) : "Pas de tâche."}
        </div>
      </MuiThemeProvider>
    );
  }
});

render(<App/>, document.getElementById('app'));
