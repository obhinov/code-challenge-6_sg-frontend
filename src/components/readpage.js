import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default class Readpage extends Component {
  render() {
    return (
      <div>
        <Form>
          <Form.Group className="mb-3" controlId="formUserID">
            <Form.Label>User ID</Form.Label>
            <Form.Control type="userid" placeholder="Enter User ID" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}
