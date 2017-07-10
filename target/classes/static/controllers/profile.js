angular.module('MyApp')
.controller('ProfileCtrl', function($scope, $http, toastr, $localStorage, uiGridConstants, $auth, $location) {
	var account = $localStorage.accountid;
	$scope.gridOptions = {
			enableRowSelection : true,
			enableRowHeaderSelection : false,
			enableSorting : true,
			enableHorizontalScrollbar : uiGridConstants.scrollbars.NEVER,
			enableColumnResizing : true

		};
	
	// for cluster button disabled
// $scope.mdisabled = function() {
// if ($localStorage.lastUsedClusterId === "undefined") {
// return true;
// } else
// return false;
// }

	$scope.user = $localStorage.username;
	console.log("user is"+$scope.user);
	
 $scope.getProfile = function() {
	  $http({
 			method: 'POST', 
 			url: '/auth/account', 
 			headers: {'Authorization': 'Basic '+$auth.getToken()}
// params: {accountId : account}
 		}).success(function (response){
			$scope.showLoading = false;
			$scope.showAPIFail = false;
 			response.data=response;
 			$scope.account = response;
 			
 			// document.getElementById("picture").value =
			// $scope.account.picture;
 			document.getElementById("displayname").value = $scope.account.name;
 			document.getElementById("email").value = $scope.account.email;
 			document.getElementById("phone").value = $scope.account.phone;
 			document.getElementById("address").value = $scope.account.address;
 			document.getElementById("organisation").value = $scope.account.organisation;
 			document.getElementById("country").value = $scope.account.country;
 			document.getElementById("awsapikey").value = $scope.account.awsapikey;
 			document.getElementById("awssecretkey").value = $scope.account.awssecretkey;
 			document.getElementById("publickeydetails").value=$scope.account.publicKey;
 			$scope.pkey = $scope.account.publicKey;
 			
// alert("User "+$scope.account.name);
 	 	 }).error(function(error){
			$scope.showLoading = false;
			$scope.showAPIFail = false;
 			toastr.error("Sorry, an error occured while retrieving data. Try again later !");
 		})
 	 	 .catch(function(error) {
			$scope.showLoading = false;
			$scope.showAPIFail = false;
 	 		toastr.error(error.data.message, error.status);
 	 		 // remove token
 	 		$auth.removeToken();
 	 	 });
 };
 
 $scope.canGenerate = function() {
	 if ($scope.datalength >= 5) {
		 return true;
	 } else {
		 return false;
	 }
 }
 
 $scope.isActive = function(){
		if($scope.datalength > 0 && $scope.datalength < 5 ){
			return false;
		}else{
			return true;
		}
	}
 
 $scope.canDelete = function() {
	 if ($scope.datalength > 1) {
		 return false;
	 } else {
		 return true;
	 }
 }
 
 $scope.validPublicKey = function() {
	 		console.log("check pkey");
			if (!/ssh-rsa AAAA[0-9A-Za-z+/]+[=]{0,3} ([^@]+@[^@]+)\S+/i.test($scope.publickeysdetails)) {
				swal(
						"Your public key is not valid",
						"please add a correct one",
						"error");
				return true;
			} else {
				return false;
			}

	 }
 
 
 $scope.canAddPublicKey = function() {
	 if(typeof $scope.publickeydetails !== 'undefined'){
		 $scope.publickeysdetails = $scope.publickeydetails.trim();
		 var ppk2 = $scope.publickeysdetails;
		 if ($scope.publickeysdetails.length > 20
				 && $scope.publickeysdetails !== $scope.pkey && !$scope.validPublicKey()  ) {
						 return false;
		 } else {
			 return true;
		 } 
	 }else
		 return true;
 }
 
 $scope.gridOptions.columnDefs = [ {
		name : 'accessKey',
		displayName : 'Access Key',
		enableHiding : false,
		width : 295,
		enableCellEdit : true

	}
	, {
		name : 'secretKey',
		displayName : 'Secret Key',
		enableHiding : false,
		width : 300,
		enableCellEdit : true
	}
	];
	$scope.gridOptions.multiSelect = false;
	$scope.gridOptions.modifierKeysToMultiSelect = false;
	$scope.gridOptions.noUnselect = true;
	$scope.gridOptions.onRegisterApi = function(gridApi) {
		$scope.gridApi = gridApi;
	};

	$scope.toggleRowSelection = function() {
		$scope.gridApi.selection.clearSelectedRows();
		$scope.gridOptions.enableRowSelection = !$scope.gridOptions.enableRowSelection;
		$scope.gridApi.core
				.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
	};
	
	$scope.getAllKeys = function(){
		
		$http({
		method : 'GET',
		url : '/accountKeys/getAllKeys',
		headers : {
			'Authorization' : 'Bearer ' + $auth.getToken()
		}
		}).success(
				function(response) {
					console.log(response);
					$scope.manageKeys(response);
					$scope.gridOptions.data = response;
					$scope.datalength = response.length;
				}).error(function(error) {
					toastr.error("Failed to load api key  :"+error.message);
			});
	}
	
 $scope.generateKeys = function() {
	 $scope.showLoading = true;
		$http({
			method : 'POST',
			url : '/accountKeys/generateKeys',
			headers : {
				'Authorization' : 'Bearer '
						+ $auth.getToken()
			}
		})
		.success(function(response){
			$scope.getAllKeys();
			$scope.showLoading = false;
		})
		.error(	  function(error) {
					  $scope.showLoading = false;
					  $scope.showAPIFail = true;
					  toastr.error("Failed to generate api key  :"+error.message);
	});
 
 }

 $scope.generatepublicKeys = function() {
	 
	
				 swal(
							{
								title : "<b> Add public keys </b>",
								text : "Would you like to add a public key?",
								imageUrl : "images/succes.png",
								imageSize : "130x130",
								showCancelButton : true,
								confirmButtonColor : "#34B1C4",
								confirmButtonText : "Yes,add it",
								closeOnConfirm : true,
								html : true
							},
							function(isConfirm) {
								if (isConfirm) {
									$scope.showLoading = true;
									$http({
										method : 'POST',
										url : '/git/setupRepository',
										headers : {
											'Authorization' : 'Bearer '
													+ $auth.getToken()
										},
									params : {
										publicKey : $scope.publickeydetails,
										userName : $scope.account.name
									
									}
									})
									.success(function(response){
										$scope.getProfile();
										$scope.showLoading = false;
										swal(
												"Public ssh-key added",
												"Your public key has been succesfully added.",
												"success");
									})
									.error(	  function(error) {
												  $scope.showLoading = false;
												  $scope.showAPIFail = true;
												  toastr.error("incorrect public key : "+error.message);
								});
							}

						});

			
			

 }
 
 
 $scope.manageKeys = function(response){
	 var aks = new Array();
	 for(var t = 1; t < response.length; t++){
		 aks.push(response[t].accessKey);
	 }
	 console.log(aks);
	 $scope.accesskeys = aks;
 }

 $scope.deleteKey = function() {
// var row = $scope.gridApi.selection.getSelectedRows();
	 swal(
				{
					title : "<b> Delete Api key </b>",
					text : "Would you really want to delete this key?",
					imageUrl : "images/Delete.png",
					imageSize : "130x130",
					showCancelButton : true,
					confirmButtonColor : "#34B1C4",
					confirmButtonText : "Yes, delete it",
					closeOnConfirm : true,
					html : true
				},
				function(isConfirm) {
					if (isConfirm) {
						$scope.showLoading = true;
						$http({
							method : 'POST',
							url : '/accountKeys/deleteKeys',
							headers : {
								'Authorization' : 'Bearer '
										+ $auth.getToken()
							},
							params: {accessKey : $scope.accesskeys[0]}
						})
						.success(function(response){
							$scope.getAllKeys();
							$scope.showLoading = false;
							$scope.accesskeys.splice(0, 1);
							console.log($scope.accesskeys);
						})
						.error(	  function(error) {
									  $scope.showLoading = false;
									  $scope.showAPIFail = true;
									  toastr.error("Failed to delete api key : "+error.message);
					});
				}
			});
 
 }
 
 	$scope.cancelUpdate = function(){
 		$scope.getProfile();
 	}
	  
  $scope.updateProfile = function(gothrough) {
	  var varusername =  $("#displayname").val() !=="" ? $("#displayname").val() : " ";
	  var varphone =  $("#phone").val() !=="" ? $("#phone").val() : " ";
	  var varaddress =  $("#address").val() !=="" ? $("#address").val() : " ";
	  var varcountry =  $("#country").val() !=="" ? $("#country").val() : " ";
	  var varorganisation =  $("#organisation").val() !=="" ? $("#organisation").val() : " ";
	  var varawsapikey =  $("#awsapikey").val() !=="" ? $("#awsapikey").val() : " ";
	  var varawssecretkey =  $("#awssecretkey").val() !=="" ? $("#awssecretkey").val() : " ";
	  
	  console.log("params :"+ varusername+", "+ varphone+", "+ varaddress+", "+ varcountry+", "+varorganisation+", "+varawsapikey+", "+varawssecretkey);
	  
//	  if((varawsapikey === ' ')||(varawssecretkey === ' ') ){
//		  swal(		"AWS's keys are missing!",
//					"Please provide correct AWS EC2 Access Id and Secret Key",
//					"warning");
//	  }else
		  swal({
			  title : "Are you sure? ",
			  text : "Would you want to update your profile?",
			  type : "warning",
			  showCancelButton : true,
			  confirmButtonColor : "#34b1c4",
			  confirmButtonText : "Yes!",
			  closeOnConfirm : false
				},
			function(isConfirm) {
					if(isConfirm){
						$scope.showLoading = true;
						$http({
							method: 'POST', 
				 			url: '/auth/update', 
							headers: {'Authorization': 'Basic '+$auth.getToken()},
							params : {
								username: varusername, 
								accountId : account,
								phone: varphone, 
								address: varaddress, 
								country: varcountry,
								organisation: varorganisation,
								awsapikey: varawsapikey,
								awssecretkey: varawssecretkey
							}
						}).success(
							function(response) {
								$scope.showLoading = false;
								console.log(response);
								$localStorage.username = varusername;
								$scope.user = $localStorage.username;
								$localStorage.awsapikey= response.awsapikey;
					   			$localStorage.awssecretkey= response.awssecretkey;
								swal("Updated!",
									"Your profile has been updated.",
									"success");
										
								$location.path("clusters");
							})
						  .error(
								  function(error) {
									  $("#awsapikey").val() ="";
									  $("#awssecretkey").val() ="";
									  $scope.showLoading = false;
										$scope.showAPIFail = true;
										sweetAlert("Error !!!",
												error.message+" error status "+ error.status,
												"error");
					});
					}
					
				});
  };
  
  $scope.updateProfileAWS = function() {
	  var varusername =  $("#displayname").val() !=="" ? $("#displayname").val() : " ";
	  var varphone =  $("#phone").val() !=="" ? $("#phone").val() : " ";
	  var varaddress =  $("#address").val() !=="" ? $("#address").val() : " ";
	  var varcountry =  $("#country").val() !=="" ? $("#country").val() : " ";
	  var varorganisation =  $("#organisation").val() !=="" ? $("#organisation").val() : " ";
	  var varawsapikey =  $("#awsapikey").val() !=="" ? $("#awsapikey").val() : " ";
	  var varawssecretkey =  $("#awssecretkey").val() !=="" ? $("#awssecretkey").val() : " ";
	  
	  console.log("params :"+ varusername+", "+ varphone+", "+ varaddress+", "+ varcountry+", "+varorganisation+", "+varawsapikey+", "+varawssecretkey);
	  
	  if((varawsapikey === ' ')||(varawssecretkey === ' ') ){
		  swal(		"AWS's keys are missing!",
					"Please provide correct AWS EC2 Access Id and Secret Key",
					"warning");
	  }else
		  swal({
			  title : "Are you sure? ",
			  text : "Would you want to update your profile?",
			  type : "warning",
			  showCancelButton : true,
			  confirmButtonColor : "#34b1c4",
			  confirmButtonText : "Yes!",
			  closeOnConfirm : false
				},
			function(isConfirm) {
					if(isConfirm){
						$scope.showLoading = true;
						$http({
							method: 'POST', 
				 			url: '/auth/update', 
							headers: {'Authorization': 'Basic '+$auth.getToken()},
							params : {
								username: varusername, 
								accountId : account,
								phone: varphone, 
								address: varaddress, 
								country: varcountry,
								organisation: varorganisation,
								awsapikey: varawsapikey,
								awssecretkey: varawssecretkey
							}
						}).success(
							function(response) {
								$scope.showLoading = false;
								console.log(response);
								$localStorage.username = varusername;
								$scope.user = $localStorage.username;
								$localStorage.awsapikey= response.awsapikey;
					   			$localStorage.awssecretkey= response.awssecretkey;
								swal("Updated!",
									"Your profile has been updated.",
									"success");
										
								$location.path("clusters");
							})
						  .error(
								  function(error) {
									  $("#awsapikey").val() ="";
									  $("#awssecretkey").val() ="";
									  $scope.showLoading = false;
										$scope.showAPIFail = true;
										sweetAlert("Error !!!",
												error.message+" error status "+ error.status,
												"error");
					});
					}
					
				});
  };
  
  $scope.getProfile();
  $scope.getAllKeys();
  
});