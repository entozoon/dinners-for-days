import React from 'react';
export default class Concepts extends React.Component {
  render() {
    // Return a nice little list of the concept items
    return (
      <ul>
        {this.props.concepts.map((item, i) =>
          <li key={i}>
            {item}
          </li>
        )}
      </ul>
    );
  }
}
