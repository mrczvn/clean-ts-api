import express from 'express'

const app = express()

app.listen(9000, () =>
  console.log('Server is running at http://localhost:9000')
)
