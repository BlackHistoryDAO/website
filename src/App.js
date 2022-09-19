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

import AccountSelector from './AccountSelector'
import Upload from './Upload'
import Documents from './Documents'
import Qualification from './Qualification'
import Verification from './Verification'
import Verified from './Verified'
import Qualified from './Qualified'

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
    <BrowserRouter>
        <Sticky context={contextRef}>
          <AccountSelector />
        </Sticky>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/qualification" element={<Qualification />} ></Route>
        <Route path="/verification" element={<Verification />} ></Route>
        <Route path="/verified" element={<Verified />} ></Route>
        <Route path="/qualified" element={<Qualified />} ></Route>
      </Routes>
      </BrowserRouter>
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
