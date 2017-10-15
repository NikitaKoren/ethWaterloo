import React from "react";
import Card from "grommet/components/Card";
import Button from "grommet/components/Button";
import TextInput from "grommet/components/TextInput";
import Box from "grommet/components/Box";
import { withStateHandlers } from "recompose";
import Accordion from "grommet/components/Accordion";
import AccordionPanel from "grommet/components/AccordionPanel";

const enhance = withStateHandlers(
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
);

const CampaignCard = ({
  item,
  reset,
  deposit,
  amount,
  change,
  withdraw,
  getIntoCampaign,
  isMarketplace,
  showControls,
  user,
  getAdvertiserPayout,
  isPublisher
}) => (
  <Card
    style={{ margin: 20 }}
    thumbnail="https://picsum.photos/200/300/?random"
    label={item.name}
    heading={`${item.balance} eth`}
    colorIndex="light-2"
    description={
      <div>
        {isMarketplace && (
          <Box>
            <Button
              onClick={() => getIntoCampaign(item)}
              label="Get into campaign"
            />
          </Box>
        )}{" "}
        {showControls && (
          <Box>
            <Button
              label="Give me my money"
              onClick={() => {
                getAdvertiserPayout(item.id);
              }}
            />
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
        )}
        {isPublisher && (
          <Accordion>
            <AccordionPanel heading="Get embeded script">
              <code>
                {`<iframe
                src=` +
                  `http://172.31.206.35:3000/ad?address=${window.web3.eth
                    .coinbase}&id=${item.id}` +
                  `
                style={{ width: "100%" }}
              />`}
              </code>
            </AccordionPanel>
          </Accordion>
        )}
      </div>
    }
  />
);
export default enhance(CampaignCard);
