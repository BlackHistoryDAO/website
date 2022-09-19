import React, {useState} from 'react'
//import { create as ipfsHttpClient } from 'ipfs-http-client'
//import {useNavigate} from 'react-router-dom'
import { useSubstrateState } from './substrate-lib'
import { Grid, Form, Button } from 'semantic-ui-react'

//const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')


const Upload = () => {
    const { api, currentAccount } = useSubstrateState()
    const [mintDisable,setMintDisable] = useState(false)
    const [formState,setFormState] = useState({name: '',description: '',type:'',hash: ''})
    //const [docURL, setDocURL] = useState(null)

    const getFromAcct = async () => {
    
        return currentAccount
    }    

/*
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

<Form.Field>
                            <label>Upload Document</label>
                            <input type="file" onChange={onHandleFileChange} />
                        </Form.Field>
*/

    const onHandleUpload = async (e) => {
        setMintDisable(true)
        const {name, description, type, hash} = formState

        if ( !name || !description || !type || !hash ) {
            alert("Name and Description fields are necessary")
            return
        }

/*
        if(!docURL) {
            alert("Your Document didn't upload to IPFS.")
            return
        }
*/
        const fromAcct = await getFromAcct()

        const call1 = api.tx.bhdao.createDocument(name, description, type,hash)
        console.log(fromAcct)
        const unsub = await call1.signAndSend(fromAcct, (result) => {console.log(result.toHuman())})
        console.log(unsub)
        
    }

    return (
        <Grid centered>
            <Grid.Row>
                <Grid.Column width={8}>
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
                            <label>Hash</label>
                            <input placeholder='IPFS Hash'
                            onChange={e => setFormState({ ...formState, hash: e.target.value })} />
                        </Form.Field>
                        
                        <Form.Field style={{ textAlign: 'center' }}>
                            <Button secondary onClick={onHandleUpload} disabled={mintDisable} >
                                Create Document</Button>
                        </Form.Field>
                        
                        
                    </Form>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default Upload