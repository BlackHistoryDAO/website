import React, {useEffect, useState} from 'react'
import { useSubstrateState } from './substrate-lib'
import { Grid, Card, Button} from 'semantic-ui-react'
import { u8aToString, hexToU8a } from '@polkadot/util'

const Documents = () => {
    const [docs, setDocs] = useState([])
    const [nitems, setNitems] = useState(0)
    const { api, currentAccount } = useSubstrateState()

    const getFromAcct = async () => {
    
        return currentAccount
    }    


    useEffect(() => {
        const queryNum = async () => {
            const result = await api.query.bhdao.totalItems();
            setNitems(result);
        }

        queryNum()
    },[])
    
    useEffect(() => {
        const queryDocs = async() => {
            if (nitems > 0) {
                let result = []
                for (let i = 1; i <= nitems; ++i) {
                    const r1 = await api.query.bhdao.documents(i)
                    result.push(JSON.parse(r1))
                }
                setDocs(result)
            }
        }

        queryDocs()
    },[nitems])

    const onButtonClick = async (e) => {
        const fromAcct = await getFromAcct()
        console.log(e.target.value)
        const call1 = api.tx.bhdao.createQualificationVoting(e.target.value)
        console.log(fromAcct)
        const unsub = await call1.signAndSend(fromAcct, (result) => {console.log(result.toHuman())})
        console.log(unsub)
    }

    return (
        <Grid >
            {docs.map((doc,index) =>{ return (
                <Grid.Column width={8}>
                    <Card>
                        <Card.Content header={u8aToString(hexToU8a(doc.title)) } />
                        <Card.Content meta={`Item No. `+(index+1)} />
                        <Card.Content description={u8aToString(hexToU8a(doc.description)) }  />
                        <Card.Content description={doc.status} />
                        <Card.Content><Button secondary onClick={onButtonClick} value={index+1}>START
                            </Button></Card.Content>
                    </Card>
                </Grid.Column>
            )})}
        </Grid>
    )
}

export default Documents