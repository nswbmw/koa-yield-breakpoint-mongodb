'use strict';

const assert = require('assert');
const Mongolass = require('mongolass');

function KoaYieldBreakpointMongodb(opts) {
  if (!(this instanceof KoaYieldBreakpointMongodb)) {
    return new KoaYieldBreakpointMongodb(opts);
  }
  const url = opts.url || opts.uri;
  const coll = opts.coll;
  assert(url, 'url|uri required for koa-yield-breakpoint-mongodb');
  assert(coll, 'coll required for koa-yield-breakpoint-mongodb');

  this.logger = (new Mongolass(url)).model(coll);
  // deafult index
  this.logger.index({ requestId: 1, step: 1 }).exec();
}

KoaYieldBreakpointMongodb.prototype.save = function save(record) {
  return this.logger.create(record).exec();
};

module.exports = KoaYieldBreakpointMongodb;
