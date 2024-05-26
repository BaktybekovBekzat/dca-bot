/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const jsonServer = require('json-server')
const path = require('path')
const auth = require('json-server-auth')
const crypto = require('crypto')

const server = jsonServer.create()

const router = jsonServer.router(path.resolve(__dirname, 'db.json'))

server.db = router.db

server.use(jsonServer.defaults({}))
server.use(jsonServer.bodyParser)
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800)
  })
  next()
})
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.id = crypto.randomUUID()
    req.body.created_at = new Date()
  }
  next()
})
server.use((req, res, next) => {
  if (req.method === 'PUT') {
    req.body.updated_at = new Date()
  }
  next()
})
server.use(auth)
server.use(router)

server.listen(8000, () => {
  console.log('server is running on 8000 port')
})
