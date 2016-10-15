import React from 'react';
import {render} from 'react-dom';

const path = require('path');

import stringToColour from "./helpers/stringToColor"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

import CardTask from './components/CardTask.jsx';
import CardForm from './components/CardForm.jsx';
import TaskLabel from './components/TaskLabel.jsx';
import LabelForm from './components/LabelForm.jsx';
import AllLabels from './components/AllLabels.jsx';
import InTask from './components/InTask.jsx';
import InPause from './components/InPause.jsx';

const time = 1200;
const timePause = 300;

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

localStorage.setItem("taskLabels", "[]")

const App = React.createClass({
  getInitialState() {
    return {
      tasks,
      labels,
      time,
      inTask: false,
      inPause: false,
      currentTask: "",
      freeze: false,
      funnies: ["http://imgur.com/"],
      restart: false,
    }
  },

  timer: null,

  startTimer() {
    if (!this.state.time) {
      this.setState({ time });
    }
    this.timer = setInterval(() => {
      if (this.state.time) {
        this.setState({ time: this.state.time - 1 });
      } else {
        const options = {
          title: "Tâche terminée",
          body: `La tâche ${this.state.currentTask} est terminée.`,
        }
        new Notification(options.title, options);
        clearInterval(this.timer);
        this.finishTask();
        this.setState({ inTask: false });
        this.startPause();
      }
    }, 1000);
  },
  
  startPause() {
    this.setState({ inPause: true, time: timePause });
    this.timer = setInterval(() => {
      if (this.state.time) {
        this.setState({ time: this.state.time - 1 });
      } else {
        const options = {
          title: "Pause terminée",
          body: `On s'y remet.`,
        }
        new Notification(options.title, options);
        clearInterval(this.timer)
        this.setState({ inPause: false });
        if (this.state.restart) {
          this.startTimer();
          this.setState({ inTask: true, restart: false });
        } else {
          this.setState({ tasks, currentTask: "" });
        }
      }
    }, 1000);
  },
  
  restartTask() {
    this.setState({ restart: true });
    const tasks = this.state.tasks.map(t => {
      const times = t.times ? t.times + 1 : 1;
      return t.title === this.state.currentTask ? Object.assign(t, { times }) : t;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
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
  
  createAndStartTask() {
    this.addTask();
    this.startTask(localStorage.getItem("taskValue"));
  },

  removeTask(title) {
    const tasks = this.state.tasks.filter(t => t.title !== title)
    this.setState({ tasks });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(this.state);
  },

  startTask(title) {
    this.setState({ inTask: true, time });
    this.setState({ currentTask: title });
    this.startTimer();
  },

  finishTask() {
    const currentTask = this.state.currentTask;
    const tasks = this.state.tasks.map(t => t.title === currentTask ? Object.assign(t, { finish: true }) : t);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(this.state);
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
    const label = { title: localStorage.getItem("labelValue"), color: stringToColour(localStorage.getItem("labelValue"))};
    const labels = this.state.labels;
    labels.push(label);
    this.setState({ labels });
    this.refs.LabelForm.emptyInput();
    localStorage.setItem("labels", JSON.stringify(labels));
    console.log(this.state);
  },

  deleteLabel(label) {
    const labels = this.state.labels.filter(l => l.title !== label);
    this.setState({ labels });
    localStorage.setItem("labels", JSON.stringify(labels));
    console.log(this.state);
  },
  
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <CardForm onClick={this.addTask} onStart={this.createAndStartTask} labels={this.state.labels} ref="CardForm" />
          <LabelForm onClick={this.addLabel} ref="LabelForm" />
          <AllLabels onClick={this.deleteLabel} labels={this.state.labels} />
          <Divider />
          <Subheader inset={true}>A faire</Subheader>
          {this.state.tasks.length ? this.state.tasks.map((t, i) => {
            if (t.finish) return;
            const boundDelete = this.removeTask.bind(this, t.title);
            const boundStart = this.startTask.bind(this, t.title);
            return <CardTask title={t.title} labels={t.labels} key={i} onDelete={boundDelete} onStart={boundStart} />
          }) : "Pas de tâche."}
          <Divider />
          <Subheader inset={true}>Fini</Subheader>
          {this.state.tasks.length ? this.state.tasks.map((t, i) => {
            if (!t.finish) return;
            const boundDelete = this.removeTask.bind(this, t.title);
            const boundStart = this.startTask.bind(this, t.title);
            return <CardTask title={t.title} finished={true} labels={t.labels} key={i} onDelete={boundDelete} onStart={boundStart} />
          }) : "Pas de tâche."}

          {this.state.inTask ? <InTask
            title={this.state.currentTask}
            time={this.state.time}
            onClick={this.state.freeze ? this.resumeTask : this.freezeTask}
            label={this.state.freeze ? "Reprendre" : "Pause"}
          /> : ""}

          {this.state.inPause ? <InPause
            title={this.state.currentTask}
            funnies={this.state.funnies}
            time={this.state.time}
            onClick={this.restartTask}
            restart={this.state.restart}
          /> : ""}
        </div>
      </MuiThemeProvider>
    );
  }
});

render(<App/>, document.getElementById('app'));
