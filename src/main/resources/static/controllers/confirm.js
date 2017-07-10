angular
		.module('MyApp')
		.directive('file', function() {
						  return {
						    restrict: 'AE',
						    scope: {
						      file: '@'
						    },
						    link: function(scope, el, attrs){
						      el.bind('change', function(event){
						    	  
						        var files = event.target.files;
						        console.log(files);
						        var file = files[0];
						        scope.file = file;
						        scope.$parent.file = file;
						        scope.$apply();
						      });
						    }
						  };
						})
		.controller(
				'confirmCtl',
				function($scope, $http, $interval, uiGridConstants, $location,
						$auth, $localStorage, toastr) {

					$scope.user = $localStorage.username;

					$scope.createRandomQuestionAndAnswer = function(){
						$auth.removeToken();
						console.log($localStorage.token);
						$http(
								{
									method : 'GET',
									url : '/qa/en',
									headers : {
										'Authorization' : 'Basic '
												+ $localStorage.token
									}
								})
								.success(
										function(response) {
											console.log("Question and Answer retrieved successfully");
											console.log(response);
											$auth.setToken($localStorage.token);
											
											//Math.floor(Math.random() * ((y-x)+1) + x);
											// x = 0, y = 29
											$scope.questionNb = Math.floor(Math.random() * 30 + 0);
											// x = 30, y = 59
											$scope.answerNb = Math.floor(Math.random() * 30 + 30);
											console.log($scope.questionNb);
											console.log(response[$scope.questionNb]);
											
											$scope.transaction.question = response[$scope.questionNb].value;
											console.log($scope.transaction.question);
											$scope.transaction.answer = response[$scope.answerNb].value;
											console.log($scope.transaction.answer);
										}).error(function(error) {
											
									$scope.showLoading = false;
									$auth.setToken($localStorage.token);
									toastr.error(error.message,error.code);
								});
					}
					
					$scope.createRandomQuestionAndAnswer();

					
					$scope.canConfirm = function() {
							return false;
					}
					
					
					$scope.creds = {
							  bucket: 'libre-exchange',
							  access_key: 'AKIAIF7DS4T2H5KM2MDA',
							  secret_key: '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'
							}
					
					 $scope.uploadWithProgressBar = function() {
					    AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
					    AWS.config.region = 'us-east-1';
					    var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
					    
					    if($scope.file) {
					        // Perform File Size Check First
					        var fileSize = Math.round(parseInt($scope.file.size));
					        if (fileSize > $scope.sizeLimit) {
					          toastr.error('Sorry, your attachment is too big. <br/> Maximum '  + $scope.fileSizeLabel() + ' file attachment allowed','File Too Large');
					          return false;
					        }
					        // Prepend Unique String To Prevent Overwrites
					        var uniqueFileName = $scope.uniqueString() + '-' + $scope.file.name;

					        var params = { Key: uniqueFileName, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };

					        bucket.putObject(params, function(err, data) {
					          if(err) {
					            toastr.error(err.message,err.code);
					            return false;
					          }
					          else {
					            // Upload Successfully Finished
					            toastr.success('File Uploaded Successfully', 'Done');

					            // Reset The Progress Bar
					            setTimeout(function() {
					              $scope.uploadProgress = 0;
					              $scope.$digest();
					            }, 4000);
					          }
					        })
					        .on('httpUploadProgress',function(progress) {
					          $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
					          $scope.$digest();
					        });
					      }
					      else {
					        // No File Selected
					        toastr.error('Please select a file to upload');
					      }
					    }

					$scope.upload = function() {
						  // Configure The S3 Object 
						  AWS.config.update({ accessKeyId: $scope.creds.access_key, secretAccessKey: $scope.creds.secret_key });
						  AWS.config.region = 'us-east-1';
						  var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });
						 console.log($scope.file);
						  if($scope.file) {
						    var params = { Key: $scope.file.name, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };
						 
						    bucket.putObject(params, function(err, data) {
						      if(err) {
						        // There Was An Error With Your S3 Config
						    	  toastr.error(err.message);
						        return false;
						      }
						      else {
						        // Success!
//						    	  swal("Success!",
//											"Upload Done.",
//											"success");
						    	  toastr.success('File Uploaded Successfully', 'Done');
						    	  
						      }
						    })
						    .on('httpUploadProgress',function(progress) {
						          // Log Progress Information
						          console.log(Math.round(progress.loaded / progress.total * 100) + '% done');
						        });
						  }
						  else {
						    // No File Selected
//							  sweetAlert(
//										"Oops...",
//										"No File Selected",
//										"error");
							  toastr.error('Please select a file to upload');
						  }
						}

					$scope.confirmTransaction = function() {

						swal(
								{
									title : "<b> Confirm Transaction </b>",
									text : "Would you like to confirm this transaction?",
									imageUrl : "images/succes.png",
									imageSize : "130x130",
									showCancelButton : true,
									confirmButtonColor : "#34b1c4",
									confirmButtonText : "Yes,Confirm it",
									closeOnConfirm : true,
									html : true
								},
								function(isConfirm) {
									$scope.upload();
									console.log($localStorage.fakeTransactionId);
									if (isConfirm) {
										$auth.removeToken();
										console.log($localStorage.token);
										$http(
												{
													method : 'POST',
													url : '/admin/confirmtransfer',
													headers : {
														'Authorization' : 'Basic '
																+ $localStorage.token
													},
													params: {
														transactionId : $localStorage.fakeTransactionId,
														question : $scope.transaction.question,
														answer : $scope.transaction.answer,
														transactionNumber : $scope.transaction.reciept
								       				},
													data :  {
														url : 'url'
												}
												}).success(function (response){
													console.log("Transaction confirmed successfully");
													$auth.setToken($localStorage.token);
									       			console.log(response);
									       			console.log(response.id);
									       			$localStorage.customerId = response.id;
									       			document.title = "Go Archive Portal";
									       			$location.path('/transactions');
									       			swal("Success!",
															"Transaction confirmed successfully.",
															"success");
									       			
									       		})
												.error(
														function(error) {
															$auth.setToken($localStorage.token);
															toastr
																	.error("Failed to create customer '"
																			+ $scope.customer.firstname
																			+ "' : "
																			+ error.message);
														});

									}

								});

					}
					
					$scope.close = function() {
						document.title = "Go Archive Portal";
						$location.path('/transactions').search('id', null);
					}
				});