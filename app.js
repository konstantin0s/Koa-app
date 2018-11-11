const Koa = require('koa');
const json = require('koa-json');
const KoaRouter = require('koa-router');
const path = require('path');
const render = require('koa-ejs');


const app = new Koa();
const router = new KoaRouter();

//Replace with DB
const things = ['My Family', 'Programming', 'Music'];

app.use(json());
//Simple Middleware
// app.use(async ctx => ctx.body = {msg: 'Hello World'});

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
})

//Index page
router.get('/', async ctx => {
  await ctx.render('index', {
    title: 'Things I Love:',
    things: things
  });
});

router.get('/test', ctx => (ctx.body = 'Hello Test'));

//Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Served started...'));
