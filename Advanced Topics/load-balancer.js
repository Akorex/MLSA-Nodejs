// implementation of a simple load balancer using robin round algorithm

import express from 'express'
import axios from 'axios'

// config stuff
const app = express()
const port = 3000
const servers = [
    'http://localhost:8081',
    'http://localhost:8082'
]

const currentIndex = 0

const getNextServer = () => {
    currentIndex++

    if (currentIndex >= servers.length){
        currentIndex = 0
    }
    
    return servers[currentIndex]
}

const healthCheck = async () => {
    for (let i = 0; i < servers.length; i++){
        const result = await axios.get(servers[i] + '/health')

        if (result.status !== 200){
            servers.splice(i, 1)
            i--
        }
    }

    setInterval(async () => {
        let serverAdded = false

        for (let i = 0; i < servers.length; i++){
            const result = await axios.get(servers[i] + '/health')

            if (result.status === 200 && !servers.includes(servers[i])){
                servers.push(servers[i])
                serverAdded = true
            }
        }

        if (serverAdded){
            console.log("Server added back to the pool")
        }
    }, 5000)
}

healthCheck()



app.get('*', async (req, res) => {
    const server = getNextServer()

    try{
        const result = await axios.get(server + req.url)
        res.status(result.status).send(result.data)
    }catch(err){
        res.status(500).send("Failed to connect to the backend")
    }
})








app.get('/', (req, res) => {
    res.send("Welcome...")
})
app.listen(port, () => {
    console.log(`Server started. Listening at http://localhost:${port}`)
})