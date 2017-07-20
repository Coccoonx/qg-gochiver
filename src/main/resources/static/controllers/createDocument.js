angular
		.module('MyApp')
		.controller(
				'createDocumentCtl',
				function($scope, $http, $interval, uiGridConstants, $location,
						$auth, $localStorage, toastr, Upload) {
					
					$scope.createDoc = function() {
					console.log("createDoc");
					console.log($scope.file);

                    if ( $scope.file) {
                        					console.log("file Exist");

                        $scope.upload($scope.file);

                    }



					}

					$scope.upload = function (file) {
										console.log("upload");
										
						    var ext = file.name.split(".")[1];

                            Upload.upload({
                                url: 'http://192.168.1.246:4545/document/upload',
                                data: {file: file,
                                	   email: $localStorage.accountid,
                                		   name : file.name,
                                		   type:  file.type,
                                		   extension : ext,
                                		   description: $scope.description
                                	   
                                	}
                            }).then(function (resp) {
                                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                                toastr.info("Upload Complete");
                                $location.path("/document");
                            }, function (resp) {
                                console.log('Error status: ' + resp.status);
                                toastr.error(resp.status);

                            }, function (evt) {
                                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
                            });
                        };

//
					$scope.close = function() {
						document.title = "Go archiver portal";
						$location.path('/document');
						
					}

				});