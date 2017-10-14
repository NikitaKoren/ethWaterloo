import React from "react";
import { lifecycle } from "recompose";
import Columns from "grommet/components/Columns";
import Card from "grommet/components/Card";
import Menu from "grommet/components/Menu";
import Anchor from "grommet/components/Anchor";
import TextInput from "grommet/components/TextInput";

const CampaignList = ({ loadAllCampaigns, items }) => {
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
            colorIndex="light-2"
            description={
              <Menu responsive={true}>
                <Anchor href="#">Withdraw</Anchor>
                <TextInput style={{ width: 50 }} />
                <Anchor href="#">Add</Anchor>
              </Menu>
            }
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
