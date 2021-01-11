const express = require("express")
const axios = require('axios');
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello World")
    const headers = {
        'Content-Type': 'application/json',
        'PRIVATE-TOKEN': 'HPdRA1G-VXxr8fk8JddB'
    }
    let data = {
        "branch": "master",
        "commit_message": "some commit message",
        "actions": [
            {
                "action": "update",
                "file_path": "data.json",
                "content": "some new content"
            }
        ]
    }

    axios.post("https://gitlab.com/api/v4/projects/23578539/repository/commits", data, { headers: headers })
        .then((response) => {
            console.log(response)
        })
    axios.get("https://gitlab.com/api/v4/projects/23578539/repository/files/data%2Ejson/raw?ref=master")
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            console.log(error)
        })
})

app.listen(3124, () => console.log("Listening at http://localhost:3124"))