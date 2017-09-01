app
  // .factory('tableManager', function($q, $http, $log) {
  //     var baseURL = 'https://1eb9ba90.ngrok.io/'
  //         // var baseURL1 = 'https://2bb32dc0.ngrok.io/'
  //         // var baseURL = 'https://162b9d0d.ngrok.io/'
  //         // var baseURL1 = 'https://162b9d0d.ngrok.io/'
  //     return {
  //         getTable: function() {
  //             var deferred = $q.defer();
  //             $http.get(baseURL + 'fetchdata')
  //                 .then(_success, _error)

  //             function _success(data) {
  //                 // console.log(data.data)
  //                 deferred.resolve(data.data)
  //             }

  //             function _error(err) {
  //                 console.log(err)
  //                 deferred.reject(err)
  //             }
  //             return deferred.promise;
  //         }
  //     }
  // })

  .controller('myCtrl', function(AppManager, $scope, $location, $anchorScroll, $document, NgTableParams, auth) {

    // $scope.names = ["Education", "Logistics"];

    // $scope.names = {
    // availableOptions: [
    //   {name: 'Education'},
    //   {name: 'Logistics'}
    //   // ,
    //   // {id: '3', name: 'Option C'}
    // ],
    // selectedOption: {name: 'Education'} //This sets the default value of the select in the ui
    // };
    // function myCtrl($scope, $http, $filter, tableManager, $location, _ ) {

    // }
    // $scope.tableParams;
    // $scope.searchUser = '';
    // var self = this;
    // $scope.data = [
    //   { name: "Moroni", age: 50, number: 9087654567, industry: "Education" },
    //   { name: "Simon", age: 43, number: 9087654567, industry: "Logistic" },
    //   { name: "Jacob", age: 27, number: 9087654567, industry: "Education" },
    //   { name: "Nephi", age: 29, number: 9087654567, industry: "Education" },
    //   { name: "Christian", age: 34, number: 9087654567, industry: "Logistic" },
    //   { name: "Tiancum", age: 43, number: 9087654567, industry: "Education" }
    // ];
    AppManager.
    getTableData()
      .then(function(result) {
        console.log(result)
        for (var i = 0; i < result.length; i++) {
          result[i].industry = {
            name: result[i].industry_name,
            id: result[i].industry_id
          }
        }

        $scope.data = result
        $scope.tableParams = new NgTableParams({ count: 10 }, { counts: [], dataset: $scope.data });
      })

    AppManager.
    getIndustryList()
      .then(function(result) {
        console.log(result)
        $scope.industryList = result
        $scope.newExpert = {
          numbers: [{ number: "" }],
          selectedIndustry: $scope.industryList[0]
        }
        // $scope.newExpert.selectedIndustry=$scope.industryList[0]

      })

    // $scope.newExpert = {
    //   numbers: [{ number: "" }]
    // };

    // MOdify
    $scope.modify = function(user, $index) {
      // user.industryList = $scope.industryList
      // user.industry = industryList
      // var temp = $scope.data.indexOf(user)

      // user.
      // console.log(temp)
      user.modifyField = true;
      user.viewField = true;
    };

    $scope.logout = function() {
      auth.logout()
      console.log('logout')
      $location.path('/login')
      // window.location = "#/login"
    }

    $scope.addResult = '0';

    $scope.addExpert = function(expert) {
      console.log(expert)
      AppManager.
      addNewExpert(expert.name, expert.numbers, expert.selectedIndustry.id)
        .then(function(result) {
          if (result.code == 200) {
            console.log('success')
            $scope.addResult = '1';

          } else {
            console.log('error')
            $scope.addResult = '2';

          }
        })
    }

    $scope.update = function(user) {
      user.modifyField = false;
      user.viewField = false;
      console.log(user.industry_expert_id, user.industry_expert_name, user.phone_number1, user.phone_number2, user.phone_number3, user.industry.id)
      AppManager
        .UpdateExpert(user.industry_expert_id, user.industry_expert_name, user.phone_number1, user.phone_number2, user.phone_number3, user.industry.id)
    };

    // Modal update 

    $scope.addRow = function(index) {
      var number = { number: "" };
      if ($scope.newExpert.numbers.length <= index + 1 && $scope.newExpert.numbers.length < 3) {
        $scope.newExpert.numbers.splice(index + 1, 0, number);
      }
    }
    // };

    $scope.deleteRow = function($event, name) {
      var index = $scope.newExpert.numbers.indexOf(name);
      if ($event.which == 1)
        $scope.newExpert.numbers.splice(index, 1);
    }

    // $scope.stop = function(){
    //   console.log($scope.newExpert.names.length)
    //   if ($scope.newExpert.names.length < 3){
    //      $scope.addRow = function(index) {
    //   var name = { name: "" };
    //   if ($scope.newExpert.names.length <= index + 1) {
    //     $scope.newExpert.names.splice(index + 1, 0, name);
    //   }
    // };
    //   }
    //  else{

    //  }

    // }
    // tableManager
    //     .getTable()
    //     .then(function(data) {
    //         console.log(data)
    //         $scope.data = data
    // $scope.tableParams = new NgTableParams({ count: 7 }, { counts: [], dataset: $scope.data });            
    //     })


    // })

    $scope.toggleDetail = function($index) {
      //$scope.isVisible = $scope.isVisible == 0 ? true : false;
      $scope.activePosition = $scope.activePosition == $index ? -1 : $index;
    };


    $scope.goClick = function() {
      $scope.aboutusFlag = !$scope.aboutusFlag;
    }

    $scope.subscribeFlag = true;
    $scope.subscribeClick = function() {
      $scope.subscribeFlag = !$scope.subscribeFlag;
    }

    // if($scope.names.length < 3) {..} else {}
    //For validation
    $scope.submitForm = function() {

      // check to make sure the form is completely valid
      if ($scope.userForm.$valid) {
        alert('');
      }

    };

    $scope.submit = function() {
      // $http.get({url: "http://ordiense.herokuapp.com/users/subscribed", headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
      return AppManager.getUsers()
    }
  });