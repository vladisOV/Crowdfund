import React, { Component } from "react";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";

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
        description: <a>View Info</a>,
        fluid: true
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
          />
          <h3>Open crowdfunding campaigns</h3>
          {this.renderCrowdfunds()}
          <Button content="Create Campaign" icon="add circle" primary={true} />
        </div>
      </Layout>
    );
  }
}

export default CrowdfundIndex;
