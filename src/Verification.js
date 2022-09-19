import React, {useEffect, useState} from 'react'
import { ButtonGroup, Grid, Card, Button } from 'semantic-ui-react'
import { useSubstrateState } from './substrate-lib'
//import { u8aToString, hexToU8a } from '@polkadot/util'

const Verification = () => {
    const [votes, setVotes] = useState([])
    const [docs, setDocs] = useState([])
    const [titems, setTitems] = useState(0)
    const [indexArray,setIndexArray] = useState([])
    const [docIndexArray,setDocIndexArray] = useState([])
    const { api, currentAccount } = useSubstrateState()
    
    

    const getFromAcct = async () => {
    
        return currentAccount
    }    

    useEffect(() => {
        const queryNum = async () => {
            const result = await api.query.bhdao.verificationVotesCount();
            setTitems(result.toNumber());
        }

        queryNum()
    },[])

    console.log("total: ", docs, docIndexArray)

    useEffect(() => {
        const queryVotes = async() => {
            if (titems > 0) {
                let result = []
                let total = 0
                let array = []
                let docs = []
                let arrayd = []
                for (let i = 1; i <= titems; ++i) {
                    const result11 = await api.query.bhdao.verificationVotes(i)
                    const r1 = JSON.parse(result11)
                    console.log(r1)
                    console.log("doc id ",r1.documentId)
                    if (r1.status === "InProgress") {
                        total = total + 1
                        result.push(r1)
                        array.push(i)
                        arrayd.push(r1.documentId)
                        const r2 = await api.query.bhdao.documents(r1.documentId)
                        docs.push(JSON.parse(r2))
                    }
                    
                }
                console.log(result)
                setVotes(result)
                setIndexArray(array)
                setDocIndexArray(arrayd)
                setDocs(docs)
            }
        }

        queryVotes()
    },[titems])

    const onYesButtonClick = async (e) => {
        const fromAcct = await getFromAcct()
        console.log(e.target.value)
        let vote = true
        const call1 = api.tx.bhdao.castVerificationVote(e.target.value,vote)
        console.log(fromAcct)
        const unsub = await call1.signAndSend(fromAcct, (result) => {console.log(result.toHuman())})
        console.log(unsub)
    }

    const onNoButtonClick = async (e) => {
        const fromAcct = await getFromAcct()
        console.log(e.target.value)
        let vote = false
        const call1 = api.tx.bhdao.castVerificationVote(e.target.value,vote)
        console.log(fromAcct)
        const unsub = await call1.signAndSend(fromAcct, (result) => {console.log(result.toHuman())})
        console.log(unsub)
    }

    const onFinalizeClick = async (e) => {
        const fromAcct = await getFromAcct()
        console.log(e.target.value)
        const call1 = api.tx.bhdao.finalizeVerificationVoting(e.target.value)
        console.log(fromAcct)
        const unsub = await call1.signAndSend(fromAcct, (result) => {console.log(result.toHuman())})
        console.log(unsub)
    }

    return (
        <Grid >
            {votes.map((vote,index) =>{ return (
                <Grid.Column>
                    <Card>
                        <Card.Content header={`Vote No. `+indexArray[index]} />
                        <Card.Content description={vote.status} />
                        
                        <Card.Content>
                            <ButtonGroup>
                                <Button basic color='blue' onClick={onYesButtonClick} value={indexArray[index]}>YES</Button>
                                
                                <Button basic color='red' onClick={onNoButtonClick} value={indexArray[index]}>NO</Button>

                            </ButtonGroup>
                            
                        </Card.Content>
                        <Card.Content>
                            <Button primary onClick={onFinalizeClick} value={indexArray[index]}
                            disabled={0 > vote.end }>
                                Finalize</Button>
                        </Card.Content>
                        
                    </Card>
                </Grid.Column>
            )})}
        </Grid>
    )
}

export default Verification