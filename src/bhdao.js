import React, { useEffect, useState } from 'react'
import {  Grid, Card, Statistic } from 'semantic-ui-react'

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
    </>
  )
}

export default function Bhdao(props) {
  const { api } = useSubstrateState()
  return api.query.bhdao && api.query.bhdao.collectorsCount ? (
    <Main {...props} />
  ) : null
}
