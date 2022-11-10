import React, { Component, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const url = `${process.env.REACT_APP_USERS_API}`;
//const url = 'https://gs3sgu22bf.execute-api.us-east-2.amazonaws.com/staging/users';

// NOTE: cannot do 'return' straight into '.then', because 'fetch' is ASYNCHRONOUS, not compatible with the synchronous 'function'!
function simulateCreateUser(url, data) {
  return fetch(url, {
    method: 'POST',
    body: data
  })
  .then((response) => response.json());
}

function SubmitButton(props) {
  const user_id = props.user_id;
  const name = props.name;

  const [isLoading, setLoading] = useState(false);
  const [appMessage, setAppMessage] = useState('');

  useEffect(() => {
    if (isLoading) {
      const data = JSON.stringify({"user_id": {"S": user_id}, "name": {"S": name}});

      simulateCreateUser(url, data)
      .then((res) => {
        console.log(res);
        setAppMessage('Item has been created!');
      }).catch((err) => {
        console.log(err)
        setAppMessage('Uh oh, there was an error creating the item!');
      });

      setLoading(false);
    };
  }, [isLoading]);

  const submitClickedHandler = () => setLoading(true);

  return(
    <div>
      <Button 
        variant="primary" 
        type="submit"
        disabled={isLoading}
        onClick={!isLoading ? submitClickedHandler : null}>

        {isLoading ? 'Loading...' : 'Submit'}
      </Button>
      <h1>{appMessage}</h1>
    </div>
  );
}

export default class Createpage extends Component {
  state = {
    user_id: '',
    name: ''
  };

  render() {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formUserID">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="userid"
              placeholder="Enter User ID"
              onChange={e => this.setState({ user_id: e.target.value })} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter Name" 
              onChange={e => this.setState({ name: e.target.value })} />
          </Form.Group>
        </Form>

        <SubmitButton user_id={this.state.user_id} name={this.state.name}/>
      </div>
    )
  }
}
