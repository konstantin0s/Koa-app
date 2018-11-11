const Koa = require('koa');
const json = require('koa-json');
const KoaRouter = require('koa-router');
const path = require('path');
const render = require('koa-ejs');
const bodyParser = require('koa-bodyparser');


const app = new Koa();
const router = new KoaRouter();

//Replace with DB
const things = ['My Family', 'Programming', 'Music'];

app.use(json());

//Body parser
app.use(bodyParser());
//Simple Middleware
// app.use(async ctx => ctx.body = {msg: 'Hello World'});

render(app, {
  root: path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: false,
  debug: false
});

//Routes
router.get('/', index);
router.get('/add', showAdd);
router.post('/add', add);

//list of Things
async function index(ctx) {
  await ctx.render('index', {
    title: 'Things I Love:',
    things: things
  });
}

//Add thing function
async function add(ctx) {
const body = ctx.request.body;
things.push(body.thing);
ctx.redirect('/');
}

//Show add page function
async function showAdd(ctx) {
  await ctx.render('add');
}



router.get('/test', ctx => (ctx.body = 'Hello Test'));

//Router Middleware
app.use(router.routes()).use(router.allowedMethods());

app.listen(3000, () => console.log('Served started...'));
