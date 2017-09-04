(function() {
    var app = angular.module('myApp')
    app.factory('AppManager', function($q, $http) {
      var baseURL = 'https://b2b-old.herokuapp.com/'
       
      return {
        getLoginStatus: function(email, password) {
          var deferred = $q.defer();
          var data = { "email": email, "password": password }
          var req = {
            method: 'POST',
            url: baseURL + 'loginvalidation/',
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          }
          $http(req)
            .then(_success, _error);
          // $http.post(baseURL + 'shop/status/login/')
          //     .then(_success, _error)

          function _success(data) {
            console.log(data.data)
            deferred.resolve(data.data)
          }

          function _error(err) {
            console.log(err)
            deferred.reject(err)
          }
          return deferred.promise;
        },
        addNewExpert: function(name, number, industry_id) {
          var deferred = $q.defer();
          console.log(number)
          if(number.length == 1)
            var data = { "name": name, "phone_number1": number[0].number, "industry_id": industry_id }
          else if(number.length == 2)
            var data = { "name": name, "phone_number1": number[0].number,"phone_number2": number[1].number, "industry_id": industry_id }
          else
            var data = { "name": name, "phone_number1": number[0].number, "phone_number2": number[1].number, "phone_number3": number[2].number, "industry_id": industry_id }
          console.log(data)
          var req = {
            method: 'POST',
            url: baseURL + 'insert_expert_details/',
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          }
          $http(req)
            .then(_success, _error);
          // $http.post(baseURL + 'shop/status/login/')
          //     .then(_success, _error)

          function _success(data) {
            console.log(data.data)
            deferred.resolve(data.data)
          }

          function _error(err) {
            console.log(err)
            deferred.reject(err)
          }
          return deferred.promise;
        },
        approve: function(record_id) {
          var deferred = $q.defer();
            var data = { id: record_id }
          console.log(data)
          var req = {
            method: 'PUT',
            url: baseURL + 'approval_status',
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          }
          $http(req)
            .then(_success, _error);
          // $http.post(baseURL + 'shop/status/login/')
          //     .then(_success, _error)

          function _success(data) {
            console.log(data.data)
            deferred.resolve(data.data)
          }

          function _error(err) {
            console.log(err)
            deferred.reject(err)
          }
          return deferred.promise;
        },
        saveTranscription: function(record_id, transcription) {
          var deferred = $q.defer();
            var data = { id: record_id, transcription: transcription }
          console.log(data)
          var req = {
            method: 'PUT',
            url: baseURL + 'transcription',
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          }
          $http(req)
            .then(_success, _error);
          // $http.post(baseURL + 'shop/status/login/')
          //     .then(_success, _error)

          function _success(data) {
            console.log(data.data)
            deferred.resolve(data.data)
          }

          function _error(err) {
            console.log(err)
            deferred.reject(err)
          }
          return deferred.promise;
        },

         UpdateExpert: function(id, name, number1, number2, number3, industry_id) {
          var deferred = $q.defer();
            var data = { "ext_id": id, "name": name, "phone_number1": number1, "phone_number2": number2, "phone_number3": number3, "industry_id": industry_id }
          console.log(data)
          var req = {
            method: 'POST',
            url: baseURL + 'edit_expert_details/',
            headers: {
              'Content-Type': 'application/json'
            },
            data: data
          }
          $http(req)
            .then(_success, _error);
          // $http.post(baseURL + 'shop/status/login/')
          //     .then(_success, _error)

          function _success(data) {
            console.log(data.data)
            deferred.resolve(data.data)
          }

          function _error(err) {
            console.log(err)
            deferred.reject(err)
          }
          return deferred.promise;
        },
        getTableData: function(){
          var deferred = $q.defer();
            $http.get(baseURL + 'expertdetails/')
                .then(_success, _error)

            function _success(data) {
                // console.log(data.data)
                deferred.resolve(data.data)
            }

            function _error(err) {
                console.log(err)
                deferred.reject(err)
            }
            return deferred.promise;
        },
          getRecordingData: function(status){
          var deferred = $q.defer();
            $http.get(baseURL + 'recordings/'+status)
                .then(_success, _error)

            function _success(data) {
                // console.log(data.data)
                deferred.resolve(data.data)
            }

            function _error(err) {
                console.log(err)
                deferred.reject(err)
            }
            return deferred.promise;
        },
        getIndustryList: function(){
          var deferred = $q.defer();
            $http.get(baseURL + 'get_industry_list/')
                .then(_success, _error)

            function _success(data) {
                // console.log(data.data)
                deferred.resolve(data.data.result)
            }

            function _error(err) {
                console.log(err)
                deferred.reject(err)
            }
            return deferred.promise;
        }
      }
    });
    app.factory("auth", function($localStorage) {
        var _status;
        return {
          setStatus: function(status) {
            _status = status || _status;
            $localStorage.status = _status;
          },
          getStatus: function() {
            return _status || $localStorage.status;
          },
          isLoggedIn: function() {
            return !!this.getStatus();
          },
          logout: function() {
            console.log($localStorage.status)
            _status = undefined;
            delete $localStorage.status;
            console.log($localStorage.status)
          }
        }
      });

    })();
