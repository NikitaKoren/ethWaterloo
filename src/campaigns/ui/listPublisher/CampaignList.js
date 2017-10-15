import React from "react";
import { lifecycle, compose } from "recompose";
import Columns from "grommet/components/Columns";
import Card from "grommet/components/Card";
import Button from "grommet/components/Button";
import TextInput from "grommet/components/TextInput";
import Box from "grommet/components/Box";
import { withStateHandlers } from "recompose";
import CampaignCard from "../list/CampaignCard";

const enhance = compose(
  withStateHandlers(
    ({ initialName = "", initialBalance = 0 }) => ({
      amount: 0
    }),
    {
      change: ({ counter }) => (attr, value) => ({
        [attr]: value
      }),
      reset: (_, { initialAmount = 0 }) => () => ({
        amount: initialAmount
      })
    }
  ),
  lifecycle({
    componentWillMount() {
      this.props.loadAllCampaigns();
    }
  })
);

const CampaignList = ({
  loadAllCampaigns,
  items,
  withdraw,
  deposit,
  amount,
  change,
  reset
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
          />
        );
      })}
    </Columns>
  ) : null;
};

export default enhance(CampaignList);
