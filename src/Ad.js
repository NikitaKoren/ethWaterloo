import React, { Component } from "react";
import Hero from "grommet/components/Hero";
import Box from "grommet/components/Box";
import Heading from "grommet/components/Heading";
import Image from "grommet/components/Image";
import { connect } from "react-redux";
import { wonderfulAction } from "./campaigns/ui/contribute/ContributeFormActions";
class Ad extends Component {
  async componentWillMount() {
    const { query } = this.props;
    setTimeout(async () => {
      this.props.wonderfulAction(query);
    }, 3000);
  }

  render() {
    const { item } = this.props;
    console.log(item);
    return (
      <Hero
        background={
          <Image
            src="https://picsum.photos/200/300/?random"
            fit="cover"
            full={true}
          />
        }
        backgroundColorIndex="dark"
      >
        <Box direction="row" justify="center" align="center">
          <Box basis="1/2" align="end" pad="medium" />
          <Box basis="1/2" align="start" pad="medium">
            <Heading margin="none">{item.name}</Heading>
          </Box>
        </Box>
      </Hero>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    query: state.routing.locationBeforeTransitions.query,
    item: state.campaigns.item || {}
  };
};

const mapDispatchToProps = { wonderfulAction };

export default connect(mapStateToProps, mapDispatchToProps)(Ad);
