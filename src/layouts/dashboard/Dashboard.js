import React, { Component } from 'react';
// Layouts
import Columns from 'grommet/components/Columns';
import Box from 'grommet/components/Box';

class Dashboard extends Component {
  constructor(props, { authData }) {
    super(props)
    authData = this.props

    this.state.sampleAd = {
      id:0,
      active:true,
      name:"Smart Ad",
      balance:10
    }
  }

  render() {
    return(
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>Dashboard</h1>
            <p><strong>Congratulations {this.props.authData.name}!</strong> If you're seeing this page, you've logged in with your own smart contract successfully.</p>
              <Columns size='small'
                masonry={true}
                justify='center'>
                <Box align='center'
                  pad='medium'
                  margin='small'
                  colorIndex='light-2'>
                  this.state.sampleAd.id
                </Box>
                <Box align='center'
                  pad='medium'
                  margin='small'
                  colorIndex='light-2'>
                  Box 2
                </Box>
                <Box align='center'
                  pad='medium'
                  margin='small'
                  colorIndex='light-2'>
                  Box 3
                </Box>
                <Box align='center'
                  pad='medium'
                  margin='small'
                  colorIndex='light-2'>
                  Box 4
                </Box>
                <Box align='center'
                  pad='medium'
                  margin='small'
                  colorIndex='light-2'>
                  Box 5
                </Box>
                <Box align='center'
                  pad='medium'
                  margin='small'
                  colorIndex='light-2'>
                  Box 6
                </Box>
              </Columns>
          </div>
        </div>
      </main>
    )
  }
}

export default Dashboard
