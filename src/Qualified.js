import React, {useEffect, useState} from 'react'
import { useSubstrateState } from './substrate-lib'
import { Grid, Card, Button} from 'semantic-ui-react'
import { u8aToString, hexToU8a } from '@polkadot/util'

const Documents = () => {
    const [docs, setDocs] = useState([])
    const [nitems, setNitems] = useState(0)
    const [indexArray,setIndexArray] = useState([])
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
                let array = []
                for (let i = 1; i <= nitems; ++i) {
                    const res1 = await api.query.bhdao.documents(i)
                    let r1 = JSON.parse(res1)
                    if (r1.status === "SuccessfulReview") {
                        result.push(r1)
                        array.push(i)
                    }
                    
                }
                setDocs(result)
                setIndexArray(array)
            }
        }

        queryDocs()
    },[nitems])

    const onButtonClick = async (e) => {
        const fromAcct = await getFromAcct()
        console.log(e.target.value)
        const call1 = api.tx.bhdao.createVerificationVoting(e.target.value)
        console.log(fromAcct)
        const unsub = await call1.signAndSend(fromAcct, (result) => {console.log(result.toHuman())})
        console.log(unsub)
    }

    return (
        <Grid >
            {docs.map((doc,index) =>{ return (
                <Grid.Column>
                    <Card>
                        <Card.Content header={u8aToString(hexToU8a(doc.title)) } />
                        <Card.Content meta={`Item No. `+(indexArray[index])} />
                        <Card.Content description={u8aToString(hexToU8a(doc.description)) }  />
                        <Card.Content description={doc.status} />
                        <Card.Content><Button primary onClick={onButtonClick} value={indexArray[index]}>START
                            </Button></Card.Content>
                    </Card>
                </Grid.Column>
            )})}
        </Grid>
    )
}

export default Documents