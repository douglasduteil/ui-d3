/**
 * Binds D3 views
 */

angular.module('ui.d3', [])
  .constant('uiD3Config', {})
  .directive('uiD3ChartBar', ['uiD3Config', function (uiD3Config) {
    if (angular.isUndefined(window.d3)) {
      throw new Error('ui-d3 need d3 to work... (o rly?)');
    }

    var color = d3.scale.category20c();

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

        // Set properties
        _p = isHorizonal ? _horizontal_properties : _vertical_properties;
        _p.tAxisMax = dim[_p.tAxisName];
        _p.vAxisMax = dim[_p.vAxisName];
        _p.vAxis = d3.scale.linear().domain([0, 100]).rangeRound([0, _p.vAxisMax]);


        // D3 drawer ...
        _draw = function(data) {
          var barSize , rect, len;
          len = Math.floor(data.length);

          barSize = _p.tAxisMax / len;
          svg.selectAll("rect").attr( _p.tSizeName, barSize);

          _p.tAxis = d3.scale.linear().domain([0, len]).range([0, _p.tAxisMax]);

          rect = svg.selectAll("rect").data(data, function(d) {
            return d.time;
          });

          rect.enter().insert("rect", "line")

            .attr(_p.tAxisName, function(d, i) { return _p.tAxis(i+1); })
            .attr(_p.vAxisName, function(d){ return isHorizonal ? 0 : dim.y - _p.vAxis(d.value);})

            .attr(_p.tSizeName, barSize)
            .attr(_p.vSizeName,  function(d){ return _p.vAxis(d.value);})
            .style("fill", function(d) { return color(d.time); })
          ;

          rect.transition().duration(animdelay)
            .attr(_p.tAxisName, function(d, i) { return _p.tAxis(i); });

          rect.exit().transition().duration(animdelay)
            .attr(_p.tAxisName, _p.tAxis(-1)).remove();

          rect = null;
        };


        // Value Blinding
        if (angular.isDefined(ngModel)) {
          ngModel.$formatters.push(function (value) {
            if (angular.isUndefined(value) || value === null) {
              return '';
            }
            else if (!angular.isArray(value)) {
              throw new Error('ui-d3-bar an array as a model');
            }
            return value;
          });

          ngModel.$render = function () {
            _draw(ngModel.$viewValue);
          };


          scope.$watch(iAttrs.ngModel, function(newVal, oldVal) {
            if (newVal !== oldVal) {
              _draw(newVal);
            }
          }, true);
        }
      }
    };
  }]);