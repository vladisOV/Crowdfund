import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import { Link } from "../../../routes";

class RequestIndex extends Component {
  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  render() {
    return (
      <Layout>
        <h3>Requests</h3>
        <Link route={`/crowdfunds/${this.props.address}/requests/new`}>
          <a>
            <Button primary>Create Request</Button>
          </a>
        </Link>
      </Layout>
    );
  }
}

export default RequestIndex;
