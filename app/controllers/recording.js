app
  .controller('recordingCtrl', function(AppManager, $scope, $location, $anchorScroll, $sce, $window, $document, NgTableParams, auth, _) {

    $scope.initialize = function(status) {
      $scope.status = status;
      AppManager.
      getIndustryList()
        .then(function(result) {
          $scope.industry = result
          console.log(result)
          $scope.item = result[0]
        })
      AppManager.
      getRecordingData(status)
        .then(function(result) {
          console.log(result)
          for (var i = 0; i < result.result.length; i++) {
            result.result[i].uri = $sce.trustAsResourceUrl(result.result[i].uri);
          }
          $scope.data = result.result
          $scope.tableParams = new NgTableParams({ count: 10 }, { counts: [], dataset: $scope.data });

        })

    }
    $scope.initialize(0)
    // MOdify
    $scope.modify = function(user, $index) {

      user.modifyField = true;
      user.viewField = true;
    };

    $scope.update = function(user) {
      user.modifyField = false;
      user.viewField = false;
       AppManager.saveTranscription(user.record_id, user.transcription)
    };

    // Active TAb
    $scope.activeMenu = 'not';

    // Filter
    $scope.sizes = [{ code: 1, name: 'n1' }, { code: 2, name: 'n2' }];
    $scope.updateIndustry = function(item) {
      $scope.tableParams = []
      console.log(item)
      var data = _.filter($scope.data, function(temp) {
        return temp.industry_name == item.name
      })
      $scope.tableParams = new NgTableParams({ count: 10 }, { counts: [], dataset: data });

    }
    $scope.approve = function(record_id) {
      AppManager.approve(record_id)
        .then(function() {
          // $window.location.reload();
              $scope.initialize(0)

        })
    }
   

  })