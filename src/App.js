import React, { createRef } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import {
  Dimmer,
  Loader,
  Grid,
  Sticky,
  Message,
} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

import { SubstrateContextProvider, useSubstrateState } from './substrate-lib'
import { DeveloperConsole } from './substrate-lib/components'

import AccountSelector from './AccountSelector'
import Bhdao from './Bhdao'
import Upload from './Upload'
import Documents from './Documents'
import Document from './Document'

function Main() {
  const { apiState, apiError, keyringState } = useSubstrateState()

  const loader = text => (
    <Dimmer active>
      <Loader size="small">{text}</Loader>
    </Dimmer>
  )

  const message = errObj => (
    <Grid centered columns={2} padded>
      <Grid.Column>
        <Message
          negative
          compact
          floating
          header="Error Connecting to Substrate"
          content={`Connection to websocket '${errObj.target.url}' failed.`}
        />
      </Grid.Column>
    </Grid>
  )

  if (apiState === 'ERROR') return message(apiError)
  else if (apiState !== 'READY') return loader('Connecting to Substrate')

  if (keyringState !== 'READY') {
    return loader(
      "Loading accounts (please review any extension's authorization)"
    )
  }

  const contextRef = createRef()

  return (
    
    <div ref={contextRef}>
      <Sticky context={contextRef}>
        <AccountSelector />
      </Sticky>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/bhdao" element={<Bhdao />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/documents" element={<Documents />} >
          <Route path="/documents/:id" element={<Document />} />
        </Route>
      </Routes>
      </BrowserRouter>
      <DeveloperConsole />
    </div>
    
  )
}

export default function App() {
  return (
    <SubstrateContextProvider>
      <Main />
    </SubstrateContextProvider>
  )
}
