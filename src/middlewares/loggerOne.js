// Домашка 4
const { request, response } = require("express");

const loggerOne = (request, response, next) => {
    console.log('Log 1');
    next();
};

module.exports = loggerOne;