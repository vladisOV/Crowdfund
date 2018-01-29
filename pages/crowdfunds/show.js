import React, { Component } from "react";
import Layout from "../../components/Layout";
import Crowdfund from "../../ethereum/crowdfund";

class CrowdfundShow extends Component {
  static async getInitialProps(props) {
    const crowdfund = Crowdfund(props.query.address);
    const summary = await crowdfund.methods.getSummary().call();
    return {
      minimumContribution: summary[0],
      balance: summary[1],
      requestsCount: summary[2],
      approversCount: summary[3],
      manager: summary[4]
    };
  }

  render() {
    return (
      <Layout>
        <h3>asd</h3>
      </Layout>
    );
  }
}

export default CrowdfundShow;
