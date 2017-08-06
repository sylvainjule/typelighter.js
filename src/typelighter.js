(function($) {
    $.fn.extend({

        typeLighter: function(options) {

        	// Default settings values
        	var defaults = {
                highlightSpeed: 25,
				typeSpeed: 100,
				clearDelay: 350,
				typeDelay: 200,
				attribute: 'data-wordlist',
				class: null,
				interval: 2500,
				initialDelay: 0,
            };

            // Conbine default and given settings
            var _options = $.extend({}, defaults, options);

            // Loop through each element and trigger the loop
	        return this.each(function() {
	        	var _this = $(this);

	        	var _interval = _options.interval,
					_initialDelay = _options.initialDelay,
					_delay = _interval + _initialDelay;

	            setTimeout(function() {
					highlightText(_this, _options);
				}, _delay);
	        });
    	}
    });
}(jQuery));


/* Highlight the current text
------------------------------------*/

var highlightText = function(_el, _options) {

 	var _highlightSpeed = _options.highlightSpeed,
		_clearDelay = _options.clearDelay,
		_class = _options.class,
		_class = (_class == null) ? '' : ' ' + _class;

	// start the highlighting loop
	setTimeout(function() {
		var _oldTextLength = _el.text().length;
		intervalHighlight(_el, _options, _oldTextLength);
	}, _highlightSpeed);


	function intervalHighlight(_el, _options, _highlightPos) {

		// get the displayed text
		var _oldText = _el.text();

		if (_highlightPos > 0) {
			// move the span by 1 char to the left
			var _newHighlightPos = _highlightPos - 1,
				_remainingText = _oldText.substring(0, _newHighlightPos),
				_wrappedText = _oldText.substring(_newHighlightPos, _highlightPos) + _el.find('.typelighted').text(),
				_newContent = _remainingText + '<span class="typelighted'+ _class +'">' + _wrappedText + '</span>';

			// replace the element's content
			_el.html(_newContent);

			// set a new position
			_highlightPos = _newHighlightPos;

			// if this new position != the start of the string
			if (_highlightPos > 0) {
				setTimeout(function() {
					// feed the loop with the new position
					intervalHighlight(_el, _options, _highlightPos);
				}, _highlightSpeed);
			}
			// otherwise, stop the highlighting loop
			else {
				// Wait the given delay and remove the text
				setTimeout(function() {
				    clearText(_el, _options, _oldText);
			    }, _clearDelay);
			}
		}
	}
}

/* Remove the highlighted text
------------------------------------*/

var clearText = function(_el, _options, _oldText) {
	var _typeDelay = _options.typeDelay;

	_el.find('span.typelighted').remove();

	// wait the given delay and start typing
	setTimeout(function() {
		typeText(_el, _options, _oldText);
	}, _typeDelay);
}


/* Type the new text
------------------------------------*/

var typeText = function(_el, _options, _oldText) {

	var _typeSpeed = _options.typeSpeed,
		_attribute = _options.attribute,
		_interval = _options.interval;

	/* Type the new text
	------------------------------------*/

	// start the typing loop
	setTimeout(function() {
		intervalType(_el, _options, 0);
	}, _typeSpeed);

	function intervalType(_el, _options, _index) {
		// get the data-attribute
		var _elText = _el.attr(_attribute),
		    _elText = (_elText.indexOf(',') != -1) ? _elText.split(',') : _elText;

		// if attribute is a unique string, trim it
		if (typeof _elText === 'string' || _elText instanceof String) {
			_elText = _elText.trim();
		}
		// if it's an array, trim every element then pick the one to be typed
		else {
			for (var i = 0; i < _elText.length; i++) {
			    _elText[i] = _elText[i].trim();
			}
			var _elTextLength = _elText.length - 1,
				_oldIndex = _elText.indexOf(_oldText),
				_oldIndex = ($.isNumeric(_oldIndex)) ? _oldIndex : 0,
				_newIndex = (_oldIndex + 1 > _elTextLength) ? 0 : _oldIndex + 1;
				_elText = _elText[_newIndex];
		}

		//then insert the next character
		insertChar(_el, _options, _elText, _index);

		function insertChar(_el, _options, _elText, _i) {
			if (_i < _elText.length && _i >= 0) {

				_el.append(_elText[_i]);

				var _newI = _i + 1;

				// if new position isn't the end of the string
				if (_newI < _elText.length) {
					setTimeout(function() {
						// feed the typing loop with the new position
						intervalType(_el, _options, _newI);
					}, _typeSpeed);
				}
				// otherwise, stop the typing loop
				else {
					// and wait the given interval to start over
					setTimeout(function() {
						highlightText(_el, _options);
					}, _interval);
				}
			}
		}

		
	}

} 