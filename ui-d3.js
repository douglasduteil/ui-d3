/**
 * Binds D3 views
 */

angular.module('ui.d3', [])
  .constant('uiD3Config', {})
  .directive('uiD3ChartBar', ['uiD3Config', function (uiD3Config) {
    if (angular.isUndefined(window.d3)) {
      throw new Error('ui-d3 need d3 to work... (o rly?)');
    }
    return {
      restrict: 'EA',
      require: '?ngModel',
      link: function (scope, iElement, iAttrs, ngModel) {
        var options, opts,
          svg,

           // opts
          isHorizonal,
          animdelay,
          dim = {x : 0 , y : 0},// x for width and y for height

          // private variables
          _p = {},
          _horizontal_properties = {
            tAxisName : "y", tSizeName : "height",
            vAxisName : "x", vSizeName : "width"

          },
          _vertical_properties = {
            tAxisName : "x", tSizeName : "width",
            vAxisName : "y", vSizeName : "height"
          },

          // private fct
          _draw
          ;

        options = uiD3Config.chartBar || {};
        opts = angular.extend({}, options, scope.$eval(iAttrs.uiD3ChartBar));
        isHorizonal = opts.orientation  === "horizontal";
        dim.x = opts.width || iElement[0].offsetWidth;
        dim.y = opts.height || iElement[0].offsetHeight;
        animdelay = opts.animDelay || 500;

        svg = d3.select(iElement[0]).append("svg")
          .attr("class", "barChart")
          .attr("width", dim.x).attr("height",dim.y);
      }
    };
  }]);