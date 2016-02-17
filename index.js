/**
 * SMTP Mail Service
 */

var Promise = require('bluebird'),
	nodemailer = require('nodemailer'),
	sailthruTransport = require('nodemailer-sailthru-transport');

var Sailthru = function(configs){
    // configure transporter
    this.transporter = Promise.promisifyAll(nodemailer.createTransport(sailthruTransport({
		apiKey : configs.apiKey,
		apiSecret : configs.apiSecret
	})));
    this.transporter.use('compile', htmlToText());
};

/**
 * send function
 * @param  {Object} author   { name : {string}, email : {email}  }
 * @param  {String} receiver receiver email address
 * @param  {String} subject  email title / subjects
 * @param  {String} content  html mail content
 * @return {Promise}
 */
Sailthru.prototype.send = function(author,receiver,subject,content){
    // make request
    return this.transporter.sendMailAsync({
        'from' : author.name+' <'+author.email+'>',
        'to' : receiver,
        'subject' : subject,
        'html' : content
    });
};

module.exports = function(configs) {
    return new Sailthru(configs);
};
