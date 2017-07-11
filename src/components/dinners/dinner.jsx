import React from 'react';
export default class dinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = props;
  }

  /**
   * changeName
   * Updating the name of an item using its input updates the state and database
   */
  changeName(event) {
    console.log(this.props);
    this.props.dbRef.update({
      name: event.target.value
    });
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <div className="dinner">
        <div className="dinner__image">
          <img src={this.state.image} alt={this.state.name} />
        </div>

        <div className="dinner__content">
          <div className="form-group">
            <textarea onChange={this.changeName.bind(this)} value={this.state.name} />
            <i />
          </div>
        </div>
      </div>
    );
  }
}
