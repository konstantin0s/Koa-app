const Koa = require('koa');
const json = require('koa-json');
const KoaRouter = require('koa-router');

const app = new Koa();
const router = new KoaRouter();

app.use(json());
//Simple Middleware
// app.use(async ctx => ctx.body = {msg: 'Hello World'});

router.get('/test', ctx => (ctx.body = 'Hello Test'));

//Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Served started...'));
