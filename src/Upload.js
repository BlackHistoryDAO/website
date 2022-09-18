import React, {useState} from 'react'
import { create as ipfsHttpClient } from 'ipfs-http-client'
//import {useNavigate} from 'react-router-dom'
import { useSubstrateState } from './substrate-lib'
import { Grid, Form, Button } from 'semantic-ui-react'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')


const Upload = () => {
    const { api, currentAccount } = useSubstrateState()
    const [mintDisable,setMintDisable] = useState(false)
    const [formState,setFormState] = useState({name: '',description: '',type:''})
    const [docURL, setDocURL] = useState(null)

    const getFromAcct = async () => {
        const {
          address,
          meta: { source, isInjected },
        } = currentAccount
    
        if (!isInjected) {
          return [currentAccount]
        }
    
        // currentAccount is injected from polkadot-JS extension, need to return the addr and signer object.
        // ref: https://polkadot.js.org/docs/extension/cookbook#sign-and-send-a-transaction
        const injector = await web3FromSource(source)
        return [address, { signer: injector.signer }]
      }    


    const onHandleFileChange = async (e) => {
        const file = e.target.files[0]
        try {
        const added = await client.add(
            file,
            {
            progress: (prog) => console.log(`received: ${prog}`)
            }
        );
        console.log(added,added.path)
        const url = `https://ipfs.infura.io/ipfs/${added.path}`
        setDocURL(url)
        } catch (error) {
        console.log('Error uploading file: ', error)
        }  
    }

    const onHandleUpload = async (e) => {
        setMintDisable(true)
        const {name, description, type} = formState

        if ( !name || !description || !type ) {
            alert("Name and Description fields are necessary")
            return
        }


        if(!docURL) {
            alert("Your Document didn't upload to IPFS.")
            return
        }

        //const fromAcct = await getFromAcct()

        const call1 = api.tx.bhdao.createDocument(name, description, type,docURL)
        console.log(call1)
        
    }

    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column>
                    <Form>
                        <Form.Field>
                            <label>Title</label>
                            <input placeholder='Title'
                            onChange={e => setFormState({ ...formState, name: e.target.value })} />
                        </Form.Field>
                        <Form.TextArea label='Description' placeholder='Describe the Document'
                        onChange={e => setFormState({ ...formState, description: e.target.value })} />
                        <Form.Field>
                            <label>Type</label>
                            <input placeholder='Type of Document'
                            onChange={e => setFormState({ ...formState, type: e.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <label>Upload Document</label>
                            <input type="file" onChange={onHandleFileChange} />
                        </Form.Field>
                        <Form.Field style={{ textAlign: 'center' }}>
                            <Button onClick={onHandleUpload} disabled={mintDisable} >
                                Create Document</Button>
                        </Form.Field>
                        
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Upload