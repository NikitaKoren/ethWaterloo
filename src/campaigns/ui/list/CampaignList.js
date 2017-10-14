import React from "react";
import { lifecycle } from "recompose";
import Columns from "grommet/components/Columns";
import Card from "grommet/components/Card";

const CampaignList = ({ loadAllCampaigns, items }) => {
  console.log(Image);
  return items.length ? (
    <Columns size="small" justify="center">
      {items.map(item => {
        return (
          <Card
            style={{ margin: 20 }}
            key={item.id}
            thumbnail="https://picsum.photos/200/300/?random"
            label={item.name}
            heading={`${item.balance} eth`}
            description="Sample description providing more details."
            colorIndex="light-2"
          />
        );
      })}
    </Columns>
  ) : null;
};

export default lifecycle({
  componentWillMount() {
    this.props.loadAllCampaigns();
  }
})(CampaignList);
