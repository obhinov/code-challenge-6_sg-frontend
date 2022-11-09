import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class Updatepage extends Component {
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
    )
  }
}
