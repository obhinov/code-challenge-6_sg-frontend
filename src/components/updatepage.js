import React, { Component, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const url = `${process.env.REACT_APP_USERS_API}`;

function simulateUpdateUser(url, data) {
  return fetch(url, {
    method: 'PUT',
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
      if (user_id=='' || name=='') {
        setAppMessage("Please don't leave any fields blank");
        setLoading(false);
        return;
      }
      
      const data = JSON.stringify({"user_id": {"S": user_id}, "name": {"S": name}}); // MUST stringify the object before putting it into 'fetch' call

      simulateUpdateUser(url, data)
      .then((res) => {
        console.log(res);
        setAppMessage('Item has been updated!');
      }).catch((err) => {
        console.log(err)
        setAppMessage('Uh oh, there was an error updating the item!');
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
      <h1>{appMessage}</h1>
    </div>
  );
}


export default class Updatepage extends Component {
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

          <SubmitButton user_id={this.state.user_id} name={this.state.name}/>
        </Form>
      </div>
    )
  }
}
