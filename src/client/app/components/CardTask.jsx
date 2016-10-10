import React from 'react';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const CardTask = React.createClass({
  render() {
    return (
      <Card className="card-task">
        <CardHeader
          title={this.props.title}
        />
        {this.props.labels.map((l, i) => <FlatButton label={l} key={i} />)}
        <CardActions>
          <RaisedButton
            label="Commencer"
            primary={true}
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
