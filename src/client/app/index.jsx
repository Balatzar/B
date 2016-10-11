import React from 'react';
import {render} from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';

import CardTask from './components/CardTask.jsx';
import CardForm from './components/CardForm.jsx';
import TaskLabel from './components/TaskLabel.jsx';
import LabelForm from './components/LabelForm.jsx';
import AllLabels from './components/AllLabels.jsx';
import Timer from './components/Timer.jsx';

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
      time: 20,
      inTask: false,
      currentTask: "",
      freeze: false,
    }
  },

  timer: null,

  startTimer() {
    this.timer = setInterval(() => {
      if (this.state.time) {
        this.setState({ time: this.state.time - 1 });
      } else {
        this.setState({ inTask: false, currentTask: "" });
        clearInterval(this.timer);
      }
    }, 1000);
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

  startTask(title) {
    this.setState({ inTask: true, time: 20 });
    this.setState({ currentTask: title });
    this.startTimer();
  },

  freezeTask() {
    this.setState({ freeze: true });
    clearInterval(this.timer);
  },

  resumeTask() {
    this.setState({ freeze: false });
    this.startTimer();
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
            const boundStart = this.startTask.bind(this, t.title);
            return <CardTask title={t.title} labels={t.labels} key={i} onDelete={boundDelete} onStart={boundStart} />
          }) : "Pas de tâche."}
          {this.state.inTask ? <div className="foreground"><Timer
            title={this.state.currentTask}
            time={this.state.time}
            onClick={this.state.freeze ? this.resumeTask : this.freezeTask}
            label={this.state.freeze ? "Reprendre" : "Pause"}
          /></div> : ""}
        </div>
      </MuiThemeProvider>
    );
  }
});

render(<App/>, document.getElementById('app'));
