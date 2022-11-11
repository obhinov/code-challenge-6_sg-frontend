import React, { Component, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// NOTE: to use environment variable in React, variable must start with 'REACT_APP_' to actually work properly.
const url = `${process.env.REACT_APP_USERS_API}`;

// NOTE: cannot do 'return' straight into '.then', because 'fetch' is ASYNCHRONOUS, not compatible with the synchronous 'function'!
function simulateCreateUser(url, data) {
  return fetch(url, {
    method: 'POST',
    body: data
  })
  .then((response) => response.json());
}

// SubmitButton function: creates submit button with message below it
// New concepts: 'props' in React, 'useEffect' 
function SubmitButton(props) {
  const user_id = props.user_id;
  const name = props.name;

  const [isLoading, setLoading] = useState(false);
  const [appMessage, setAppMessage] = useState('');

  useEffect(() => {
    if (isLoading) {
      if (user_id=='' || name=='') {
        setAppMessage("Please don't leave any fields blank");
        setLoading(false);
        return;
      }
      const data = JSON.stringify({"user_id": {"S": user_id}, "name": {"S": name}}); // MUST stringify the object before putting it into 'fetch' call

      simulateCreateUser(url, data)
      .then((res) => {
        console.log(res);
        setAppMessage('Item has been created!');
      }).catch((err) => {
        console.log(err)
        setAppMessage('Uh oh, there was an error creating the item!');
      });

      setLoading(false); // when fetch call is done, set Submit button back to normal
    };
  }, [isLoading]); // << useEffect only runs when 'isLoading' changes!

  // submitClickedHandler function: simply just makes 'isLoading' true
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
      <i style={{padding: "20px"}}>{appMessage}</i>
    </div>
  );
}

export default class Createpage extends Component {
  // NOTE: 'state' object MUST be called 'state' in order to use 'setState' later on
  state = {
    user_id: '',
    name: ''
  };

  render() {
    return (
      <div style={{padding: "20px"}}>
        <h3 style={{ textAlign: 'center' }}>Create Items</h3>
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

          {/*NOTE: Adding props to SubmitButton to use as parameters for the function*/}
          <SubmitButton user_id={this.state.user_id} name={this.state.name}/>
        </Form>
      </div>
    )
  }
}
