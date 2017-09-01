app
.controller('loginCtrl', function($scope, $location, AppManager, auth) {
	console.log("loginCtrl")
	$scope.login = function() {
		AppManager
			.getLoginStatus($scope.email, $scope.password)
			.then(function(result){
				console.log(result)
				if(result.code == 200){
					auth.setStatus(result.code)
					$location.path('/')
				}else if(result.code == 400){
					$scope.error = true;
				}
			})
	}
});