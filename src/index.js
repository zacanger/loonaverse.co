const Koa = require('koa')
const lowercase = require('koa-lowercase').default
const Router = require('koa-router')
const cacheControl = require('koa-ctx-cache-control')
const helmet = require('koa-helmet')
const compress = require('koa-helmet')

const buildBody = require('./build-body')

const router = new Router()

const time1minute = 1000 * 60

const app = module.exports = new Koa()

app.port = process.env.PORT || 9000

router.get('/', async (ctx) => {
  ctx.status = 200
  ctx.type = 'text/html'
  ctx.cacheControl(time1minute)
  const body = await buildBody()
  ctx.body = body
})

app.use(helmet())
app.use(compress())
cacheControl(app)
app.use(lowercase)
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(app.port, () => {
  console.log(`Loonaverse.co listening on ${app.port}`)
})
