import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TaskLabel from "./TaskLabel.jsx";

const AllLabels = React.createClass({
  render() {
    const labels = this.props.labels;
    return (
      <div className="all-labels">
        {labels.length ? labels.map((l, i) => {
          const boundDelete = this.props.onClick.bind(null, l);
          return <RaisedButton label={l} key={i} onClick={boundDelete} />
        }) : "Aucun label n'a été créé."}
      </div>
    );
  }
});

export default AllLabels;