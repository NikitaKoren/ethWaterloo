import React, { Component } from "react";
import ContributeButtonContainer from "../../campaigns/ui/contribute/ContributeButtonContainer";
import Columns from 'grommet/components/Columns';
import Box from 'grommet/components/Box';

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props
  }

  componentDidMount() {
    console.log('componentDidMount')
  }

  render() {
    const posts = function () {
      return [
        {
          id:0,
          active:true,
          name:"Smart Ad 0",
          balance:10
        },
        {
          id:1,
          active:true,
          name:"Smart Ad 1",
          balance:15
        }
      ]
    }
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Dashboard</h1>
            <p><strong>Congratulations {this.props.authData.name}!</strong> If you're seeing this page, you've logged in with your own smart contract successfully.</p>
            <ContributeButtonContainer />
            <p>
              <strong>Congratulations {this.props.authData.name}!</strong> If
              you're seeing this page, you've logged in with your own smart
              contract successfully.
            </p>
          </div>
        </div>
        <Columns size='small'
                 masonry={true}
                 justify='center'>
          {posts().map(function(post, index) {
            return <Box align='center' pad='medium' margin='small' colorIndex='light-2'> {post.id}, {post.name} </Box>
          })}
        </Columns>
      </main>
    );
  }
}

export default Dashboard;
