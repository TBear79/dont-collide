//REQUIREMENTS:
//npm install in test-dir
//Mocha

'use strict'

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const sinon = require('sinon');

const dontCollide = require('../lib/dont-collide.js');

describe('Unit tests', () => {
	describe('Test if parameters are transfered correctly', function() {
		before(function () { 
		});
		after(function () { 
		});

		it('should return correct parameters',  (done) => {
			const dc = dontCollide();
			let fn = (p1, p2, p3) => {
				expect(p1).to.equal(10);
				expect(p2).to.equal(11);
				expect(p3).to.equal(12);	

				done();
			}

			dc.throttle(fn,10,11,12);
		});

		it('should return correct results as an array',  (done) => {
			
			let cb = (results) => {
				expect(results[0].correlationId).to.equal(20);
				expect(results[1].correlationId).to.equal(30);
				expect(results[2].correlationId).to.equal(40);	

				expect(results[0].result).to.equal('Mr. T');
				expect(results[1].result).to.equal('Face');
				expect(results[2].result).to.equal('Hannibal');

				done();
			}

			const dc = dontCollide({ finalize: cb });

			dc.throttle({ correlationId: 20, fn: () => { return 'Mr. T' }});
			dc.throttle({ correlationId: 30, fn: () => { return 'Face' }});
			dc.throttle({ correlationId: 40, fn: () => { return 'Hannibal' }});
		});

		it('should return correct result via callback for each result',  (done) => {
			
			let cb = (result) => {
				expect(result.correlationId).to.equal(20);
				expect(result.result).to.equal('Mr. T');

				done();
			}

			const dc = dontCollide();

			dc.throttle({ correlationId: 20, fn: () => { return 'Mr. T' }, callback: cb});
		});

		it('should return correct result for async functions',  (done) => {
			let counter = 0;
			let final1 = (greeting, cid, rs) => {
				counter++;
				expect(cid).to.equal(20);
				expect(rs).to.equal('Mr. T');
				expect(greeting).to.equal('Hi');
			}

			let final2 = (greeting, cid, rs) => {
				counter++;
				expect(cid).to.equal(30);
				expect(rs).to.equal('Hannibal');
				expect(greeting).to.equal('Hello');
				expect(counter).to.equal(3);
				done();
			}

			let final3 = (greeting, cid, rs) => {
				counter++;
				expect(cid).to.equal(40);
				expect(rs).to.equal('Face');
				expect(greeting).to.equal('Good day');
			}


			const dc = dontCollide();

			dc.throttle({ correlationId: 20, fn: function(greeting, cid, c) { setTimeout(() => { c(greeting, cid, 'Mr. T'); }, 1 ); }, asyncCallback: final1 }, 'Hi');
			dc.throttle({ correlationId: 30, fn: function(greeting, cid, c) { setTimeout(() => { c(greeting, cid, 'Hannibal'); }, 100 ); }, asyncCallback: final2}, 'Hello');
			dc.throttle({ correlationId: 40, fn: function(greeting, cid, c) { setTimeout(() => { c(greeting, cid, 'Face'); }, 50 ); }, asyncCallback: final3}, 'Good day');
		});


		it('should return 1000 results',  (done) => {
				
				let cb = (results) => {
					expect(results.length).to.equal(1000);
					done();
				}

				const dc = dontCollide({ finalize: cb });

				for(let i = 1; i <= 1000; i++){
					dc.throttle({ correlationId: 20, fn: () => { return i; }});
				}
		});

	});

	

});

