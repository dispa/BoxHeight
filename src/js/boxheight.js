;(function($) {
	'use strict';

	var BoxHeight = function (elems, options) {
		this.elems = elems;
		this.options = $.extend({}, BoxHeight.options, options);

		if (this.elems.length == 0) {
			return;
		}

		var self = this;
		this.setHeight();

		$(window).resize(function() {
			if (self.resizeTimer) {
				clearTimeout(self.resizeTimer);
			}
			self.resizeTimer = setTimeout(function() {
				self.reset();
				self.setHeight();
			}, 250);
		});
	};

	BoxHeight.prototype.reset = function() {
		this.elems.css("height", "auto");
	};

	BoxHeight.prototype.setHeight = function() {
		var wrp = this.options.wrapper ? $(this.options.wrapper) : this.elems;
		var oWidth = this.elems.eq(0)[0].getBoundingClientRect().width;
		var oContainerWidth = wrp.parent()[0].offsetWidth;
		var nCols = Math.floor(oContainerWidth / oWidth);
		var maxH = 0, nth = [], h, elem;
		var selector = this.options.selector;

		if (nCols < 2) {
			return;
		}
		this.elems.each(function(i, item) {
			elem = $(item);
			h = elem.outerHeight();
			if (h > maxH) {
				maxH = h;
			}
			nth.push(elem);
			if ((i + 1) % nCols == 0) {
				for (var ii = 0, nn = nth.length; ii < nn; ii++) {
					nth[ii].outerHeight(maxH)
				}
				nth = [];
				maxH = 0;
			}
		});
		if (maxH > 0 && nth.length > 0) {
			for (var ii = 0, nn = nth.length; ii < nn; ii++) {
				nth[ii].outerHeight(maxH)
			}
		}
	}

	BoxHeight.options = {
		wrapper		: null,
	};

	$.fn.boxHeight = function(options) {
		new BoxHeight(this, options);
	};

}(jQuery));