import React from 'react';

import Label from "./Label.jsx";

import {Card, CardActions, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const CardTask = React.createClass({
  render() {
    return (
      <Card className="card-task">
        <CardHeader
          title={this.props.title}
        />
        {this.props.labels.map((l, i) => <Label title={l.title} color={l.color} onClick={() => {console.log("ça marche pas")}} key={i} />)}
        <CardActions>
          <RaisedButton
            label="Commencer"
            primary={true}
            onClick={this.props.onStart}
          />
          <RaisedButton
            label="Editer"
          />
          <RaisedButton
            label="Supprimer"
            secondary={true}
            onClick={this.props.onDelete}
          />
        </CardActions>
      </Card>
    );
  }
})

export default CardTask;
