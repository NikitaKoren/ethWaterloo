import React from "react";
import { lifecycle, compose } from "recompose";
import Columns from "grommet/components/Columns";
import Card from "grommet/components/Card";
import Button from "grommet/components/Button";
import TextInput from "grommet/components/TextInput";
import Box from "grommet/components/Box";
import { withStateHandlers } from "recompose";

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
          <Card
            style={{ margin: 20 }}
            key={item.id}
            thumbnail="https://picsum.photos/200/300/?random"
            label={item.name}
            heading={`${item.balance} eth`}
            colorIndex="light-2"
            description={
              <Box>
                <Button
                  label="Add"
                  onClick={() => {
                    reset();
                    deposit(item.id, amount);
                  }}
                />
                <TextInput
                  type="number"
                  value={amount}
                  onDOMChange={e => change("amount", e.target.value)}
                />
                <Button
                  label="Withdraw"
                  onClick={() => {
                    reset();
                    withdraw(item.id, amount);
                  }}
                />
              </Box>
            }
          />
        );
      })}
    </Columns>
  ) : null;
};

export default enhance(CampaignList);
