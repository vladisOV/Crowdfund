import React from "react";
import factory from "../ethereum/factory";

class CrowdfundIndex extends Component {
  async componentDidMount() {
    const crowdfunds = await factory
      .methods()
      .getDeployedCrowdfunds()
      .call();
    console.log(crowdfund);
  }

  render() {
    return <div>lalala</div>;
  }
}

export default CrowdfundIndex;
