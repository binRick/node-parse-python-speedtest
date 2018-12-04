#!/usr/bin/env node

var fs = require('fs'),
    child = require('child_process'),
    _ = require('underscore'),
    async = require('async'),
        trim
l = console.log,
    c = require('chalk'),
    program = require('commander');

program.version('0.1.0')
    .option('-l, --list-servers', 'List Servers')
    .parse(process.argv);

if (program.listServers) {
    Servers = [];
    var serverList = child.execSync('speedtest-cli --list').toString().split('\n').filter(function(li) {
        return li.split('[').length == 2 && li.split(')').length == 3;
    }).map(function(li) {
        li = li.trim();
        var s = {};
        bs = li.split('[');
        ls = li.split(' ');
        lps = li.split('(');
        rps = li.split(')');
        s.km = bs[1].split(' ')[0];
        s.id = ls[0].split(')')[0];
        s.isp = rps[1].split('(')[0].trim();
        s.location = lps[1].split(')')[0].trim();
        s.line = li;
        return s;
    });
    l(JSON.stringify(serverList));
}
