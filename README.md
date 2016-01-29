# moment-duration-timer
A countdown timer plugin for MomentJS Duration

---

## Installation

**Bower**

`bower install moment-duration-timer`

**In browser**

`<script src="path/to/moment-duration-timer.js"></script>`

Be sure to include moment.js on your page first!

---

## Usage

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
