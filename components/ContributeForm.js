import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Crowdfund from "../ethereum/crowdfund";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class ContributeForm extends Component {
  state = {
    value: "",
    loading: false,
    errorMessage: ""
  };

  onSubmit = async event => {
    event.preventDefault();
    const crowdfund = Crowdfund(this.props.address);
    this.setState({ loading: true });
    try {
      const accounts = await web3.eth.getAccounts();
      await crowdfund.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(this.state.value, "ether")
      });
      Router.replaceRoute(`/crowdfunds/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Amount to contribute</label>
          <Input
            label="ether"
            labelPosition="right"
            onChange={event => this.setState({ value: event.target.value })}
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Contribute
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
