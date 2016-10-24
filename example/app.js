'use strict';

const koaYieldBreakpoint = require('../../koa-yield-breakpoint')({
  files: ['./routes/*.js'],
  store: new require('..')({
    url: 'mongodb://localhost:27017/test',
    coll: 'koa-yield-breakpoint-loggers'
  })
});

const koa = require('koa');
const routes = require('./routes');
const app = koa();

app.use(koaYieldBreakpoint);

routes(app);

app.listen(3000, () => {
  console.log('listening on 3000');
});
