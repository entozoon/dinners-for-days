import React from 'react';
export default class dinner extends React.Component {
  render() {
    return (
      <div className="dinner">
        <div className="dinner__image">
          <img src={this.props.dinner.image} alt={this.props.dinner.name} />
        </div>
        <div className="dinner__content">
          {this.props.dinner.name}
        </div>
      </div>
    );
  }
}
