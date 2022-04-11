#!/usr/bin/env node

const debounce = require("lodash.debounce");
const chokidar = require("chokidar");
const prog = require('caporal');
const color = require('color');


const start = debounce(() => {
  console.log("Starting user program");
}, 100);

prog.version('1.0.0').command('start' , 'Start an application');

chokidar
  .watch(".")
  .on("add", start)
  .on("change", () => console.log("File changed"))
  .on("unlink", console.log("File removed"));


  prog.parse(process.argv);
