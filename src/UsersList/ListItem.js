import React, { Component } from 'react';

const ESCAPE_KEY = 27;
const ENTER_KEY = 13;
class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editText: ''
    };

    this.input = React.createRef();
  }

  handleChange = (event) => {
    this.setState({ editText: event.target.value });
  };

  handleDestroy = (id) => {
    if (this.state.editText !== '') {
      return this.setState({
        editText: ''
      });
    }
    this.props.handleDestroyButton && this.props.handleDestroyButton(id);
  };

  handleEdit = () => {
    this.setState({ editText: this.props.user.name }, () => this.input.focus());
  };

  handleKeyDown = (event) => {
    if (event.which === ESCAPE_KEY) {
      this.setState({ editText: '' });
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  };

  handleSubmit = (event) => {
    this.setState({ editText: '' });
    let value = event.target.value.trim();
    if (value) {
      this.props.onEdit(this.props.user.id, value);
    }
  };

  render() {
    return (
      <li>
        <img src={this.props.user.avatar} alt="Avatar" className="avatar" />
        <div className="view">
          {this.state.editText === '' ? (
            <label onClick={this.handleEdit}>{this.props.user.name}</label>
          ) : (
            <input
              ref={(ref) => (this.input = ref)}
              className="new-todo"
              value={this.state.editText}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
          )}
          <button
            className="destroy"
            onClick={() => this.handleDestroy(this.props.user.id)}
          />
        </div>
      </li>
    );
  }
}

export default ListItem;
