import React, { Component, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const url = `${process.env.REACT_APP_USERS_API}`;

function simulateReadUser(url, user_id) {
  var url_updated = '';

  if (user_id=='') {
    url_updated = url;
  }
  else {
    url_updated = url + `/${user_id}`;
  };

  return fetch(url_updated, {
    method: 'GET'
  })
  .then((response) => response.json());
}


function SubmitButton(props) {
  const user_id = props.user_id;

  const [isLoading, setLoading] = useState(false);
  const [appMessage, setAppMessage] = useState('');
  const [itemsListed, setItemsListed] = useState();

  useEffect((itemsToRead, itemsListed) => {
    if (isLoading) {

      simulateReadUser(url, user_id)
      .then((res) => {
        setAppMessage('Items listed below');

        if (user_id=='') itemsToRead = res.Items;
        else itemsToRead = [res.Item];

        setItemsListed(itemsToRead.map((item) =>
          <li key={item.user_id.S}>{item.user_id.S}: {item.name.S}</li>
        ));
        
      }).catch((err) => {
        console.log(err)
        setAppMessage('Uh oh, there was an error reading the item!');
        setItemsListed('');
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

      <i style={{ padding: "20px" }}>{appMessage}</i>

      <ul style={{ padding: "20px" }}>{itemsListed}</ul>
    </div>
  );
}


export default class Readpage extends Component {
  state = {
    user_id: ''
  };

  render() {
    return (
      <div style={{ padding:"20px" }}>
        <h3 style={{ textAlign: 'center' }}>Read Items</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formUserID">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="userid"
              placeholder="Enter User ID (leave blank to read all users)"
              onChange={e => this.setState({ user_id: e.target.value })} />
          </Form.Group>

          <SubmitButton user_id={this.state.user_id} />
        </Form>
      </div>
    )
  }
}
