import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Crowdfund from "../ethereum/crowdfund";

class ContributeForm extends Component {
  state = {
    value: "",
    loading: false,
    erroeMessage: ""
  };

  onSubmit = async event => {
    event.preventDefault();
    const crowdfund = Crowdfund(address);
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label>Amount to contribute</label>
          <input
            label="ether"
            labelPosition="right"
            onChange={event => this.setState({ value: event.taget.value })}
          />
        </Form.Field>
        <Button primary>Contribute</Button>
      </Form>
    );
  }
}

export default ContributeForm;
