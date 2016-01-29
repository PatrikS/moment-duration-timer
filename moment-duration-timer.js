/**
 * Patriks Moment Duration timer
 * @version 1.0.0
 * @author Patrik Svensson
 * @license The MIT License (MIT)
 */
;(function() {
	var _window, moment, _defaults, _emptyFunc;
		
	moment = typeof require === "function" ? require("moment") : this.moment;
	_window = this,
	_defaults = {
		interval: 1000,
	},
	_emptyFunc = function() {};

	function Timer(duration, options) {
		this.options = typeof options === "undefined" ? _defaults : {
			interval: options.interval || _defaults.interval,
			onInit: options.onInit || _emptyFunc,
			onStart: options.onStart || _emptyFunc,
			onStop: options.onStop || _emptyFunc,
			onElapsed: options.onElapsed || _emptyFunc,
			onComplete: options.onComplete || _emptyFunc,
			onReset: options.onReset || _emptyFunc
		};

		this.duration = duration;
		this.startDurationInMs = duration.asMilliseconds();
		this.intervalTimer = null;
		this.running = false;

 		this.init(); 
	}

	function getRemaining(duration){
		var dur = duration || this.duration;
		
		return {
			years: dur.years(),
			months: dur.months(),
			days: dur.days(),
			hours: dur.hours(),
			minutes: dur.minutes(),
			seconds: dur.seconds(),
			totalMs: dur.asMilliseconds()
		};
	}

	Timer.prototype.init = function(){
		this.options.onInit({ remaining: getRemaining(this.duration) });
		return this;
	};

	Timer.prototype.complete = function(){
		this.stop();
		this.options.onComplete();
		return this;
	};

	Timer.prototype.elapsed = function() {
		this.duration.subtract(this.options.interval, "ms");

		var remainingTime = this.duration.asMilliseconds();

		this.options.onElapsed({ remaining: getRemaining(this.duration) });

		if(remainingTime < this.options.interval){
			//timer complete??
			this.complete();
		}
	};

	Timer.prototype.start = function() {
		this.intervalTimer = _window.setInterval(
			(function(self) {         
	         	return function() {   
	             	self.elapsed(); 
	         	}
	     	})(this), this.options.interval);
		
		this.running = true;
		
		this.options.onStart({ remaining: getRemaining(this.duration) });
		return this;
	};

	Timer.prototype.stop = function() {
		_window.clearInterval(this.intervalTimer);
		this.running = false;

		this.options.onStop({ remaining: getRemaining(this.duration) });
		return this;
	};

	Timer.prototype.reset = function() {
		if(this.running){
			this.stop();
		}

		this.duration = moment.duration(this.startDurationInMs, "ms");

		this.options.onReset({ remaining: getRemaining(this.duration) });
		return this;
	};

	/**
	 * The moment-duration plugin for the Timer
	 *
	 * @this {Duration}
	 */
	moment.duration.fn.timer = function (options) {
		return new Timer(this, options);
	};

	/**
	 * Exposed constructor for the moment plugin
	 * @const
	 */
	moment.duration.fn.timer.constructor = Timer;
  	

	if (typeof module !== "undefined" && module !== null) {
		module.exports = moment;
	} else {
		this.moment = moment;
	}
  	
}).call(this);