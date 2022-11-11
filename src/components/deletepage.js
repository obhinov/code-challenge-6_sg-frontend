import React, { Component, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const url = `${process.env.REACT_APP_USERS_API}`;

function simulateDeleteUser(url, data) {
  return fetch(url, {
    method: 'DELETE',
    body: data
  })
  .then((response) => response.json());
}


function SubmitButton(props) {
  const user_id = props.user_id;

  const [isLoading, setLoading] = useState(false);
  const [appMessage, setAppMessage] = useState('');

  useEffect(() => {
    if (isLoading) {
      if (user_id=='') {
        setAppMessage("Please don't leave any fields blank");
        setLoading(false);
        return;
      }

      const data = JSON.stringify({"user_id": {"S": user_id}});

      simulateDeleteUser(url, data)
      .then((res) => {
        console.log(res);
        setAppMessage('Item has been deleted!');
      }).catch((err) => {
        console.log(err)
        setAppMessage('Uh oh, there was an error deleting the item!');
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
      <i style={{ padding:"20px" }}>{appMessage}</i>
    </div>
  );
}

export default class Deletepage extends Component {
  state = {
    user_id: ''
  };

  render() {
    return (
      <div style={{ padding:"20px" }}>
        <h3 style={{ textAlign: 'center' }}>Delete Items</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formUserID">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="userid"
              placeholder="Enter User ID"
              onChange={e => this.setState({ user_id: e.target.value })} />
          </Form.Group>

          <SubmitButton user_id={this.state.user_id} />
        </Form>
      </div>
    )
  }
}
