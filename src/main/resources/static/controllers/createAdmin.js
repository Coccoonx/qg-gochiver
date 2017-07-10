angular
	.module('MyApp')
	.controller(
			'createAdminCtrl',
			function($scope, $http, $interval, uiGridConstants, $location,
					$auth, $localStorage, toastr) {

				$scope.user = $localStorage.username;

				$scope.getCustomer = function() {
					$auth.removeToken();
					console.log($localStorage.token);
			        $http({
			       			method: 'GET',
			       			url: '/customer',
			       			headers : {
								'Authorization' : 'Basic '
										+ $localStorage.token
							}
			       		}).success(function (response){
			       			console.log("Account successfully retrieved");
			       			$auth.setToken($localStorage.token);
			       			console.log(response);
			       			console.log(response.rights);
			       			if (response.rights === 'SUPER'){
			       				$scope.execute();
			       			}else{
			       				sweetAlert(
										"Oops...",
										"ONLY the super user can an admin",
										"error");
			       			}
			       			
			       		}).catch(function(error) {
			       			$auth.setToken($localStorage.token);
						    toastr.error(error.data.message, error.status);
			       	 	 });
			   }
			
			$scope.createAdmin = function() {
				$scope.getCustomer();
			}
				
				$scope.execute = function() {
					swal(
							{
								title : "<b> Create Admin Customer </b>",
								text : "Would you really like to create an admin?",
								imageUrl : "images/succes.png",
								imageSize : "130x130",
								showCancelButton : true,
								confirmButtonColor : "#34b1c4",
								confirmButtonText : "Yes,create it",
								closeOnConfirm : true,
								html : true
							},
							function(isConfirm) {
								if (isConfirm) {
									$auth.removeToken();
									console.log($localStorage.token);
									$http(
											{
												method : 'POST',
												url : '/admin/create',
												headers : {
													'Authorization' : 'Basic '
															+ $localStorage.token
												},
												data :  {
													firstName : $scope.admin.name,
													email : $scope.admin.email,
													password : $scope.admin.password
											}
											}).success(function (response){
												console.log("Admin created successfully");
												$auth.setToken($localStorage.token);
								       			console.log(response);
								       			
								       			document.title = "Go Archive Portal";
								       			$location.path('/transactions');
								       			swal("Success!",
														"Admin created successfully.",
														"success");
								       			
								       		})
											.error(
													function(error) {
														$auth.setToken($localStorage.token);
														toastr
																.error("Failed to create admin '"
																		+ $scope.admin.name
																		+ "' : "
																		+ error.message);
													});

								}

							});

				}
				
				$scope.close = function() {
					document.title = "Go Archive Portal";
					$location.path('/transactions');
				}
			});