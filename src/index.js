import express from 'express'

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send("Hello")
    console.log("Hello konzola")

}
)

app.listen(port, () => console.log(`Slusam na port ${port}!`))

