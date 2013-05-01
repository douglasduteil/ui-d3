
describe('uiD3', function () {
	'use strict';

	// declare these up here to be global to all tests
	var scope, $compile, uiConfig;

	beforeEach(module('ui.d3'));
  beforeEach(inject(function (uiD3Config) {
    uiConfig = uiD3Config;
    uiConfig.ace = {bar: {'orientation' : 'horizontal'}};

  }));

	// inject in angular constructs. Injector knows about leading/trailing underscores and does the right thing
	// otherwise, you would need to inject these into each test
	beforeEach(inject(function (_$rootScope_, _$compile_ ) {
		scope = _$rootScope_.$new();
		$compile = _$compile_;
	}));

	afterEach(function () {
    uiConfig = {};
	});

	describe('behavior', function () {

		it('should not throw an error when window.d3 is defined', function () {
			function compile() {
				$compile('<div ui-d3-chart-bar>')(scope);
			}
			expect(compile).not.toThrow();
		});
		
		it('should be contain a svg', function () {
			var element = $compile('<div ui-d3-chart-bar>')(scope);
			expect(element.children()[0].tagName).toBe('svg');
		});

		
		it('should watch the uiD3 attributes', function () {
			spyOn(scope, '$watch');
			$compile('<div ui-d3-chart-bar ng-model="foo">')(scope);
			expect(scope.$watch).toHaveBeenCalled();
		});
		
	});

	
});