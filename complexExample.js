#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const app = require('express');

yargs(hideBin(process.argv))
    .command('serve [port]', 'start the server', (yargs)=>{
        return yargs            
            .positional('port', { // command에 적힌 serve 변수를 port에 담고 serve가 선언만 되고 변수가 없는 경우 default port 5000을 주기위한 기능
                describe: 'port to bind on',
                default: 5000
            })
    }, (argv) => {
        if (argv.verbose) { // 아래 option에 선언한 verbose가 --verbose 형태로 들어오면 아래 선언한 것처럼 true or false 중 true로 받고 --verbose 선언 안하면 false 혹은 undefined가 됨.
            console.info(`start server on :${argv.port}`);
        }
        app.application.listen(argv.port, ()=>{
            console.log(`server on :${argv.port}`);
        })
    })
    .option('verbose', { // --[옵션] 에 대한 정의를 이렇게 .option() 로 함
        alias: 'v',
        type: 'boolean',
        description: 'Run with verbose logging'
    })
    .parse()

// terminal > node complexExample.js --help
