import React, { useEffect, useState } from 'react'
import {  Grid, Card, Statistic , Header, List, Divider } from 'semantic-ui-react'

import { useSubstrateState } from './substrate-lib'


function Main(props) {
  const { api } = useSubstrateState()

  // The transaction submission status

  // The currently stored value
  const [contributor, setContributor] = useState(0)
  const [collector, setCollector] = useState(0)
  const [qualifier, setQualifier] = useState(0)

  useEffect(() => {
    
    const queryContributors = async () => {
      let result = await api.query.bhdao.contributorsCount();

      console.log(result.toString());
      setContributor(result.toString());
    }

    const queryCollectors = async () => {
      let result = await api.query.bhdao.collectorsCount();

      console.log(result.toString());
      setCollector(result.toString());
    }

    const queryQualifiers = async () => {
      let result = await api.query.bhdao.qualifiersCount();

      console.log(result.toString());
      setQualifier(result.toString());
    }

    queryContributors();
    queryCollectors();
    queryQualifiers();

  }, [api.query.bhdao])

  return (
    
      <>
        <Grid.Row>
        <Grid stackable columns="equal">
          <Divider horizontal />
          <Grid.Row>
          <Grid.Column>
            <Card centered>
              <Card.Content textAlign="center">
                <Statistic label="Number of Contributors" value={contributor} />
              </Card.Content>
            </Card>
          </Grid.Column> 
          <Grid.Column> 
            <Card centered>
              <Card.Content textAlign="center">
                <Statistic label="Number of Collectors" value={collector} />
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card centered>
              <Card.Content textAlign="center">
                <Statistic label="Number of Qualifiers" value={qualifier} />
              </Card.Content>
            </Card>
          </Grid.Column>
          </Grid.Row>
        </Grid>
        </Grid.Row>
        <Divider horizontal />
        <Grid.Row>
          <Grid columns="equal">
            <Grid.Column>
              <Header as='h3'>Instructions on how To Use This Blockchain Interactor Demo</Header>
              <List bulleted>
                <List.Item>
                  We use <a href='https://polkadot.js.org/apps/'>Polkadot.js</a> browser extension to init the DAO and set up certain parameters.
                </List.Item>
                <List.Item>
                  Initialize membership to default values by calling init_collections() in the bhdao pallet using sudo functionality.
                </List.Item>
                <List.Item>
                You can add collectors, contributors and qualifiers by calling add_collectors(address), add_contributor(address) and 
                add_qualifier(address) respectively. 
                </List.Item>
                <List.Item>
                Similarly, voting values can be changed by calling set_qualification_voting_window(u32) and set_verification_voting_window(u32)
                 as the default value is set to 14400 blocks.
                </List.Item>
                <List.Item>
                  All of the calls above are SUDO calls that are meant to be replaced by DAO governance which is under development.
                </List.Item>
                <List.Item>
                  Link To <a href="https://github.com/BlackHistoryDAO/barnacle">the node repository</a>
                </List.Item>
                <List.Item>
                  Link To <a href="https://docs.google.com/presentation/d/1lYQ-5LnGVzMvtW5HTDDqjH2BQDyU9SsaGWmi4kH2t_4/edit?usp=sharing">the Demo slides</a>
                </List.Item>
                <List.Item>
                  Link To <a href="https://drive.google.com/file/d/1OP7KPwDUVbVeiubbsrKTe7lybYQQOJTO/view?usp=sharing">the Demo video</a>
                </List.Item>
              </List>
            </Grid.Column>

          </Grid>
        </Grid.Row>
      </>    
  )
}

export default function Bhdao(props) {
  const { api } = useSubstrateState()
  return api.query.bhdao && api.query.bhdao.collectorsCount ? (
    <Main {...props} />
  ) : null
}
