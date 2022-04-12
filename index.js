#!/usr/bin/env node

const debounce = require("lodash.debounce");
const chokidar = require("chokidar");
const prog = require("caporal");
const { spawn } = require("child_process");
const fs = require("fs");
const color = require("color");

prog
  .version("1.0.0")
  .argument("[filename]", "Name of the file to execute")
  .action(async ({ filename }) => {
    const name = filename || "index.js";
    try {
      await fs.promises.access(name);
    } catch (err) {
      throw new Error(`File not found ${name}`);
    }

    let proc;
    const start = debounce(() => {
      if (proc) {
        proc.kill();
      }
      console.log()
      proc = spawn("node", [name], { stdio: "inherit" });
      // console.log("Starting user program");
    }, 100);

    chokidar
      .watch(".")
      .on("add", start)
      .on("change", start)
      .on("unlink", start);
  });

prog.parse(process.argv);
