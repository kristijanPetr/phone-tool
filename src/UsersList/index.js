import React, { Component } from 'react';
import ListItem from './ListItem';

const ENTER_KEY = 13;
const ESCAPE_KEY = 27;

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      newUser: ''
    };
  }

  destroyButton = (id) => {
    this.props.removeUser(id);
  };

  handleChange = (event) => {
    this.setState({ newUser: event.target.value });
  };

  handleNewTodoKeyDown = (event) => {
    let val = this.state.newUser.trim();
    if (event.which === ESCAPE_KEY) {
      this.setState({ newUser: '' });
    } else if (event.which === ENTER_KEY) {
      event.preventDefault();
      if (val) {
        if (!isNaN(val)) {
          this.props.searchUser(val);
        } else {
          this.props.addUser(val);
        }

        this.setState({ newUser: '' });
      }
    }
  };

  renderListItems = () => {
    return this.props.users.map((user) => this.renderTodoItem(user));
  };

  renderTodoItem(user) {
    return (
      <ListItem
        user={user}
        key={user.id}
        handleDestroyButton={(id) => this.destroyButton(id)}
        onEdit={(id, name) => this.props.editUser(id, name)}
      />
    );
  }

  render() {
    let footer;

    return (
      <div>
        <header className="header">
          <input
            className="new-todo"
            type="text"
            placeholder="Add new user or search by ID"
            value={this.state.newUser}
            onChange={this.handleChange}
            onKeyDown={this.handleNewTodoKeyDown}
          />
        </header>

        <section className="main">
          <ul className="todo-list">{this.renderListItems()}</ul>
        </section>
        {footer}
      </div>
    );
  }
}

export default UserList;
