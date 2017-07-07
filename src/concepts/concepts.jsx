import React from 'react';
export default class Concepts extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        {this.props.concepts.map((item, i) =>
          <div key={i}>
            {item}
          </div>
        )}
      </div>
    );
  }
}
