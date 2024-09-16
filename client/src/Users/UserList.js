import React from 'react';
import axios from 'axios';

class UserList extends React.Component {
  state = {
    users: [],
  };

  render() {
    return(
      <ul>
        {this.state.users.map(user => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    )
  };

  componentDidMount() {
    axios.get('http://localhost:5000/users')
      .then(users => {
        this.setState({ users: users.data });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export default UserList;