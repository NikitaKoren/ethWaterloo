import React from "react";
import { lifecycle } from "recompose";
import Columns from "grommet/components/Columns";
import CampaignCard from "./CampaignCard";

const enhance = lifecycle({
  componentWillMount() {
    this.props.loadAllCampaigns(this.props.isMarketplace);
  }
});

const CampaignList = ({
  loadAllCampaigns,
  items,
  withdraw,
  deposit,
  amount,
  change,
  reset,
  isMarketplace,
  getIntoCampaign,
  showControls,
  getAdvertiserPayout
}) => {
  return items.length ? (
    <Columns size="small" justify="center">
      {items.map(item => {
        return (
          <CampaignCard
            key={item.id}
            item={item}
            deposit={deposit}
            withdraw={withdraw}
            isMarketplace={isMarketplace}
            getIntoCampaign={getIntoCampaign}
            showControls={showControls}
            getAdvertiserPayout={getAdvertiserPayout}
          />
        );
      })}
    </Columns>
  ) : null;
};

export default enhance(CampaignList);
