define(['module', 'root'], function (module, root) {

  var _, dfd, e$;

  _ = root[module.id] || "";
  dfd = new $.Deferred();

  requirejs(
    {
      paths: {
        'ui.d3': _ + "ui-d3"
      },
      shim: {
        'ui.d3': { deps: ['http://d3js.org/d3.v3.min.js'] }
      }
    },
    ['ui.d3'],
    function () {

      angular.module('doc.ui-d3', ['ui.d3', 'prettifyDirective'])
        .controller('DocCtrl', ['$scope', function ($scope) {
          var _t = 0;
          $scope.d3Model = [];

          $scope.add = function() {
            $scope.d3Model.push({
              time: ++_t,
              value: parseInt(Math.random() * 100, 10)
            });
          };

          $scope.remove = function() {
            $scope.d3Model.shift();
          };
          
          // Add and remove each 2sec
          setInterval((function() {
            $scope.$apply(function() {
              $scope.add();
              $scope.remove();
            });
          }), 2000);

          //Generate 6 children
          $scope.add();$scope.add();$scope.add();
          $scope.add();$scope.add();$scope.add();
        }])
      ;
      e$ = $("#directives-ui-d3");
      e$.removeAttr("ng-non-bindable");

      angular.bootstrap(e$[0], ['doc.ui-d3']);

      dfd.resolve();

    }
  );


  return dfd.promise();

});