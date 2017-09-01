var app = angular.module('myApp', ['ngRoute', 'ngTable', 'ngStorage','ngSanitize','underscore'])
  .value('duScrollDuration', 4000)
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    // $urlRouterProvider
      

    $routeProvider
      .when('/table', {
        controller: 'myCtrl',
        templateUrl: './app/templates/table.html'
      })
      .when('/login', {
        controller: 'loginCtrl',
        templateUrl: './app/templates/login.html'
      })
      .when('/', {
        controller: 'recordingCtrl',
        templateUrl: './app/templates/recording.html'
      })
      .otherwise('/')



    // $locationProvider.html5Mode({
    //   enabled: true,
    //   requireBase: false
    // });
  }])

  .run(function($rootScope, $location, auth) {
      $rootScope.$on("$routeChangeStart", function(event, next, current) {
        if (!auth.isLoggedIn()) {
          $location.path('/login');
        } else {
          var _path = $location.path();
          if (_path == '/login') $location.path('/');
        }
      });
    });
  // .run(['$rootScope', '$state', '$location', 'auth', '$window', '$localStorage', function($rootScope, $state, $stateParams, $location, auth, $window, $localStorage) {
  //   // $rootScope._ = $window._;
  //   $rootScope._ = $window._;
  //   console.log($rootScope._)
  //   console.log($rootScope)
  //   // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
  //   //   console.log('Authentication2')
  //   //   if (!auth.isLoggedIn()) {
  //   //     $location.path('/login');
  //   //   } else {
  //   //     var _path = $location.path();
  //   //     if (_path == '/' || _path == '/login') $location.path('/');
  //   //   }
  //   // });
  //   $rootScope.$state = $state;
  //   return $rootScope.$stateParams = $stateParams;
  // }]);

