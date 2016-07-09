//REQUIREMENTS:
//npm install in test-dir
//Mocha

'use strict'

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const sinon = require('sinon');

const safeFollowingdistance = require('../lib/safe-following-distance.js');

describe('Time distance between calls', () => {
	describe('Test if all function calls are made', function() {
		

		
		const rabbit = safeFollowingdistance(options);

		// before(function () { 
		// });
		// after(function () { 
		// });

		// it('should return the correct message from queue',  (done) => {
		// 	let connection; 
		// 	let connectionCloseTimerId;
		// 	const testContent = 'TESTING 123';
		// 	const testCorrelationId = 'CORRELATIONIDTEST';
			
		// 	let msgCount = 0;

		// 	setTimeout(() => { rabbit.chat(testContent, { correlationId: testCorrelationId }); }, 50);

		// 	return amqplib
		// 		 .connect(options.protocol + '://' + options.host)
		// 		.then((conn) => { connection = conn; return conn.createChannel(); })
		// 		.then((channel) => {
		// 			return channel.assertExchange(options.exchangeName, options.exchangeType, {durable: options.durable})
		// 				.then((ok) => {
		// 					return channel.assertQueue('', {exclusive: true})
		// 			    				.then((q) => {
		// 			    					channel.bindQueue(q.queue, options.exchangeName, '');

		// 			    					return channel.consume(q.queue, (msg) => {
					    						
		// 			    						msgCount++;

		// 			    						clearTimeout(connectionCloseTimerId);

		// 								        connectionCloseTimerId = setTimeout(() => { 
		// 								        	expect(msg.content.toString()).to.equal(testContent);
		// 											expect(msg.properties.appId).to.equal(testAppId1);
		// 											expect(msg.properties.correlationId).to.equal(testCorrelationId);
		// 								        	expect(msgCount).to.equal(1);
										        	
		// 								        	connection.close(); 

		// 								        	done();
		// 								        }, 500);

		// 								    }, {noAck: true});
		// 			    				})

		// 			  	});
		// 		})
		// 		.catch((ex) => { throw ex; });

			
			
		// });



		// it('should send 1000 messages and receive them all',  (done) => {

		// 	const numberOfMessagesToSend = 1000;

		// 	let connection; 
		// 	let connectionCloseTimerId;
		// 	let msgCount = 0;

		// 	setTimeout(() => { 
		// 		let i = 0;
		// 		let tmpTimer;

		// 		tmpTimer = setInterval(() => { 
		// 			setTimeout(() => { rabbit.chat("TESTING"); }, 50);
		// 			i++; 
		// 			if(i >= numberOfMessagesToSend) 
		// 				clearInterval(tmpTimer);
		// 		}, 1);

					
		// 	}, 500);

		// 	return amqplib
		// 		 .connect(options.protocol + '://' + options.host)
		// 		.then((conn) => { connection = conn; return conn.createChannel(); })
		// 		.then((channel) => {
		// 			return channel.assertExchange(options.exchangeName, options.exchangeType, {durable: options.durable})
		// 				.then((ok) => {
		// 					return channel.assertQueue('', {exclusive: true})
		// 			    				.then((q) => {
		// 			    					channel.bindQueue(q.queue, options.exchangeName, '');

		// 			    					return channel.consume(q.queue, (msg) => {
					    						
		// 			    						msgCount++;

		// 			    						clearTimeout(connectionCloseTimerId);

		// 								        connectionCloseTimerId = setTimeout(() => { 
		// 								        	expect(msgCount).to.equal(numberOfMessagesToSend);
										        	
		// 								        	connection.close(); 

		// 								        	done();
		// 								        }, 500);

		// 								    }, {noAck: true});
		// 			    				})

		// 			  	});
		// 		})
		// 		.catch((ex) => { throw ex; });
		// });

		


	});
});

