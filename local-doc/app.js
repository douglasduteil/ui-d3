(function () {
  var _ = "http://douglasduteil.github.io/angular-ui.github.com/assets/vendor/";


  /* =Root storage
   -----------------------------------------------------------------------------*/
  define("root", function () {return {};});


  /* =Launcher
   -----------------------------------------------------------------------------*/
  requirejs(
    {
      baseUrl : './',
      paths: {
        'jquery': _ + 'jquery.min',
        'twitter-bootstrap': _ + 'bootstrap',
        'prettyPrint': _ + 'prettify',
        'angular': _ + 'angular.min'
      },
      shim: {
        'local-doc/prettifyDirective': { deps: ['prettyPrint', 'angular'] },
        'twitter-bootstrap': { deps: ['jquery'] }
      }
    },
    ['twitter-bootstrap', 'local-doc/prettifyDirective', 'angular'],
    function () {
      angular.module('x', ['prettifyDirective'])
        .controller('FooCtrl', ['$scope', function ($scope) {
          requirejs(['doc/doc']);
          /*
          requirejs(['doc/doc'], function (dfd) {
            dfd.then(function () {
                $scope.$root.isLoading = false;
                $scope.$apply();
            });
          });
          */
          $scope.$root.isLoading = false;
        }]);
      angular.bootstrap(document, ['x']);
    });

})();


