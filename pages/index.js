import React, { Component } from "react";
import factory from "../ethereum/factory";
import { Card, Button } from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";

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
        description: (
          <Link route={`/crowdfunds/${address}`}>
            <a>View Info</a>
          </Link>
        ),
        fluid: true
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <div>
          <h3>Open crowdfunding campaigns</h3>
          <Link route="/crowdfunds/new">
            <a>
              <Button
                floated="right"
                content="Create Campaign"
                icon="add circle"
                primary={true}
              />
            </a>
          </Link>

          {this.renderCrowdfunds()}
        </div>
      </Layout>
    );
  }
}

export default CrowdfundIndex;
