import React, { Component, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const url = 'https://official-joke-api.appspot.com/random_joke';
const data = '';

// NOTE: cannot do 'return' straight into '.then', because 'fetch' is ASYNCHRONOUS, not compatible with the synchronous 'function'!
function simulateCreateUser(url, data) {
  return fetch(url, {
    //method: 'GET'
    method: 'POST',
    body: data
  })
  .then((response) => response.json());
}

function SubmitButton() {
  const [isLoading, setLoading] = useState(false);
  const [appMessage, setAppMessage] = useState('');

  useEffect(() => {
    if (isLoading) {
        simulateCreateUser(url, data)
        .then((data) => {
          console.log(data);
          setAppMessage('The data has been read!');
        }).catch((err) => console.log(err));

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
  render() {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formUserID">
            <Form.Label>User ID</Form.Label>
            <Form.Control type="userid" placeholder="Enter User ID" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter Name" />
          </Form.Group>
        </Form>

        <SubmitButton />
      </div>
    )
  }
}
