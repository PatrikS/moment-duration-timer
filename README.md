# moment-duration-timer
A countdown timer plugin for MomentJS Duration

Example usage:

    var duration = moment.duration(10, "s");

  	var timer = duration.timer({
		onInit: initFunction,
		onStart: startFunction,
		onStop: stopFunction,
		onElapsed: elapsedFunction,
		onComplete: completeFunction,
		onReset:resetFunction
	});
		
	timer.start();
