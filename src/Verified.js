import React, {useEffect, useState} from 'react'
import { useSubstrateState } from './substrate-lib'
import { Grid, Card} from 'semantic-ui-react'
import { u8aToString, hexToU8a } from '@polkadot/util'

const Verified = () => {
    const [docs, setDocs] = useState([])
    const [titems, setTitems] = useState(0)
    const [indexArray,setIndexArray] = useState([])
    const { api } = useSubstrateState()    


    useEffect(() => {
        const queryNum = async () => {
            const result = await api.query.bhdao.totalItems();
            setTitems(result);
        }

        queryNum()
    },[])

    useEffect(() => {
        const queryDocs = async() => {
            if (titems > 0) {
                let result = []
                let total = 0
                let array = []
                for (let i = 1; i <= titems; ++i) {
                    const r1 = await api.query.bhdao.documents(i)
                    if (r1.status === "Verified") {
                        total = total + 1
                        result.push(JSON.parse(r1))
                        array.push(i)
                    }
                    
                }
                setDocs(result)
                setIndexArray(array)
            }
        }

        queryDocs()
    },[titems])


    return (
        <Grid >
            {docs.map((doc,index) =>{ return (
                <Grid.Column>
                    <Card>
                        <Card.Content header={u8aToString(hexToU8a(doc.title)) } />
                        <Card.Content meta={`Item No. `+indexArray[index]} />
                        <Card.Content description={u8aToString(hexToU8a(doc.description)) }  />
                        <Card.Content description={doc.status} />
                    </Card>
                </Grid.Column>
            )})}
        </Grid>
    )
}

export default Verified