const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('blog/editor', (req, res) => {
    res.sendFile(path.join(initial_path, 'editor.html'))
})

app.post('/blog/uploads', (req, res) => {
    let file = req.files.image
    let date = newDate()

    // image name

    let imagename = date.getDate() + file.name

    // image upload path

    let path = 'blog/uploads/' + imagename

    // create upload

    file.mv(path, (err, result) => {
        if (err) {
            throw err
        } else {
            // our image upload path
            res.json(`/blog/uploads/${imagename}`)
        }
    })
})

app.get('/:blog', (req, res) => {
    res.sendFile(path.join(initial_path, 'blog.html'))
})

app.use((req, res) => {
    res.json('404')
})
