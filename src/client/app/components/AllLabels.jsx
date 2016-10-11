import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Label from "./Label.jsx";

const AllLabels = React.createClass({
  render() {
    const labels = this.props.labels;
    return (
      <div className="all-labels">
        {labels.length ? labels.map((l, i) => {
          const boundDelete = this.props.onClick.bind(null, l.title);
          return <Label  key={i} title={l.title} color={l.color} onClick={boundDelete} />
        }) : "Aucun label n'a été créé."}
      </div>
    );
  }
});

export default AllLabels;