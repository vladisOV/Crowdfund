import React, { Component } from "react";
import factory from "../ethereum/factory";
import { Card } from "semantic-ui-react";

class CrowdfundIndex extends Component {
  //nextjs class function
  static async getInitialProps() {
    const crowdfunds = await factory.methods.getDeployedCrowdfunds().call();
    return { crowdfunds };
  }

  renderCrowdfunds() {
    const items = this.props.crowdfunds.map(address => {
      return {
        header: address,
        description: <a />,
        fluid: true
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return <div>{this.renderCrowdfunds()}</div>;
  }
}

export default CrowdfundIndex;
