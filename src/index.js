import React, { Component } from 'react';
import { render } from 'react-dom';
import _ from 'lodash';

import UserList from './UsersList';
import './style.css';

import API from './utils/api';
import Pagination from './Pagination';

class App extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      currPage: 1,
      totalPages: 0
    };
  }

  componentDidMount() {
    this.listUsers();
  }

  listUsers = () => {
    API.listUsers().then((resp) => {
      if (resp.status === 200 && resp.data) {
        this.setState({
          users: _.sortBy(resp.data, 'id').reverse(),
          totalPages: Math.ceil(resp.data.length / 10)
        });
      }
    });
  };

  addUser = (name) => {
    API.addUser(name).then(this.listUsers);
  };

  editUser = (id, name) => {
    API.editUser(id, name).then(this.listUsers);
  };

  removeUser = (id) => {
    API.removeUser(id).then(this.listUsers);
  };

  paginate(page_number) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return this.state.users.slice((page_number - 1) * 10, page_number * 10);
  }

  searchUser = (id) => {
    API.searchUser(id).then((resp) => {
      if (resp.data) {
        this.setState({
          users: [resp.data]
        });
      }
    });
  };

  render() {
    return (
      <div>
        <UserList
          users={this.paginate(this.state.currPage)}
          addUser={(name) => this.addUser(name)}
          editUser={(id, name) => this.editUser(id, name)}
          removeUser={(id) => this.removeUser(id)}
          searchUser={(id) => this.searchUser(id)}
        />
        {this.state.totalPages > 0 && (
          <Pagination
            currPage={this.state.currPage}
            totalPages={this.state.totalPages}
            onPageChange={(currPage) => this.setState({ currPage })}
          />
        )}
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
