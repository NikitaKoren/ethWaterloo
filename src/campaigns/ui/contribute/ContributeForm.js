import React from "react";
import Button from "grommet/components/Button";
import Form from "grommet/components/Form";
import TextInput from "grommet/components/TextInput";
import NumberInput from "grommet/components/NumberInput";
import FormField from "grommet/components/FormField";
import Box from "grommet/components/Box";
import { withStateHandlers } from "recompose";

const enhance = withStateHandlers(
  ({ initialName = "", initialBalance = 0 }) => ({
    name: initialName,
    balance: initialBalance
  }),
  {
    change: ({ counter }) => (attr, value) => ({
      [attr]: value
    }),
    reset: (_, { initialName = "", initialBalance = 0 }) => () => ({
      name: initialName,
      balance: initialBalance
    })
  }
);

const ContributeForm = ({ onClick, name, balance, change, reset }) => {
  return (
    <Box align="center">
      <Form>
        <FormField label="Campaign Name">
          <TextInput onDOMChange={e => change("name", e.target.value)} />
        </FormField>
        <FormField label="Campaign Balance (in eth)">
          <NumberInput onChange={e => change("balance", e.target.value)} />
        </FormField>
        <Button
          colorIndex="neutral-1"
          onClick={() => {
            onClick({ balance, name });
            reset();
          }}
          label="Add Campaign"
        />
      </Form>
    </Box>
  );
};

export default enhance(ContributeForm);
