const morgan=require('morgan');
const helmet=require('helmet');
const express=require('express');

module.exports=server=>{
    server
    .use(morgan('dev'))
    .use(helmet())
    .use(express.json());
}