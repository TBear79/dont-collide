//REQUIREMENTS:
//npm install in test-dir
//Mocha

'use strict'

const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;
const sinon = require('sinon');

const dontCollide = require('../lib/dont-collide.js');

describe('Setup', () => {
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

			dc.fire(fn,10,11,12);
		});

		it('should return correct results',  (done) => {
			
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

			dc.fire({ correlationId: 20, fn: () => { return 'Mr. T' }});
			dc.fire({ correlationId: 30, fn: () => { return 'Face' }});
			dc.fire({ correlationId: 40, fn: () => { return 'Hannibal' }});
		});

		it('should return correct result via callback for each result',  (done) => {
			
			let cb = (result) => {
				expect(result.correlationId).to.equal(20);
				expect(result.result).to.equal('Mr. T');

				done();
			}

			const dc = dontCollide();

			dc.fire({ correlationId: 20, fn: () => { return 'Mr. T' }, callback: cb});
		});

		it('should return 1000 results',  (done) => {
				
				let cb = (results) => {
					expect(results.length).to.equal(1000);
					done();
				}

				const dc = dontCollide({ finalize: cb });

				for(let i = 1; i <= 1000; i++){
					dc.fire({ correlationId: 20, fn: () => { return i; }});
				}
		});

	});

	

});

