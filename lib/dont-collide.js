'use strict'

class Helpers{
	static refineOptions(options){
		if(typeof options == 'function')
			options = { fn: options };

		options.correlationId = options.correlationId || 0;
		options.callback = options.callback || null;
		options.asyncCallback = options.asyncCallback || null;

		return options;
	}

	static addArgumentsToOptions(options, args){
	
		const arrArgs = [];

		for(let i = 1; i < args.length; i++){
			arrArgs.push(args[i]);
		}

		options.args = arrArgs;
	}
}

class DontCollide{
	constructor(options){

		if(!options)
			options = {};

		this.interval = options.interval || 1;
		this.finalize = options.finalize || function() {};

		this._queue = [];
		this._intervalTimerId = 0;
		this._isProcessing = false;
		this._results = [];
		this._helpers = Helpers;
	}

	throttle(options){
		const t = this;
			
		options = t._helpers.refineOptions(options);
		t._helpers.addArgumentsToOptions(options, arguments);

		t._queue.push(options);

		t.process();
	}

	process(){
		const t = this;

		if(t._isProcessing) //don't start another timer. Just work on the queue
			return;

		t._isProcessing = true;

		t._intervalTimerId = setInterval(() => {
			if(t._queue.length > 0){
				const o = t._queue.shift();

				o.args.push(o.correlationId);
				o.args.push(o.asyncCallback);

				const rs = o.fn.apply(this, o.args);

				let returnObj = { correlationId: o.correlationId, result: rs };

				if(o.callback != null){
					o.callback(returnObj);
				}
				else{
					t._results.push(returnObj);	
				}
			}
			else{
				clearInterval(t._intervalTimerId);
				t._isProcessing = false;
				t.finalize(t._results);
				t._results = [];
			}		
		}, t.interval);
	}
}

module.exports = (options) => {
	return new DontCollide(options);
};
