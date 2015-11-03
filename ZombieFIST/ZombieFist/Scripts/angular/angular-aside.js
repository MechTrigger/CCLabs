
/*!
 * angular-aside - v1.2.1
 * https://github.com/dbtek/angular-aside
 * 2015-10-06
 * Copyright (c) 2015 İsmail Demirbilek
 * License: MIT
 */

(function () {
	/**
	   * @ngdoc overview
	   * @name ngAside
	   * @description
	   * Main module for aside component.
	   * @function
	   * @author İsmail Demirbilek
	   */
	angular.module('ngAside', ['ui.bootstrap.modal']);
})();

(function () {
	angular.module('ngAside')
	  /**
	   * @ngdoc service
	   * @name ngAside.services:$aside
	   * @description
	   * Factory to create a modal instance to use it as aside. It simply wraps $modal by overriding open() method and sets a class on modal window.
	   * @function
	   */
	  .factory('$aside', function ($uibModal) {
	  	var defaults = this.defaults = {
	  		placement: 'left'
	  	};

	  	var asideFactory = {
	  		// override open method
	  		open: function (config) {
	  			var options = angular.extend({}, defaults, config);
	  			// check placement is set correct
	  			if (['left', 'right', 'bottom', 'top'].indexOf(options.placement) === -1) {
	  				options.placement = defaults.placement;
	  			}
	  			var vertHoriz = ['left', 'right'].indexOf(options.placement) === -1 ? 'vertical' : 'horizontal';
	  		    // This code is a style generated to keep the modal on the side of the site, 
	  			// rather than in the middle of the page like a modal. 
	  			options.windowClass = 'ng-aside ' + vertHoriz + ' ' + options.placement + (options.windowClass ? ' ' + options.windowClass : '');
	  			delete options.placement;
	  			return $uibModal.open(options);
	  		}
	  	};

	  	// create $aside as extended $modal
	  	var $aside = angular.extend({}, $uibModal, asideFactory);
	  	return $aside;
	  });
})();
