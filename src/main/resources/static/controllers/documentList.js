angular
		.module('MyApp')
		.controller(
				'documentCtl',
				function($scope, $http, $interval, uiGridConstants, $location,
						$auth, $localStorage, toastr) {
// $auth.setToken($localStorage.token);
					$scope.user = $localStorage.username;
					$scope.gridOptions = {
					    paginationPageSizes: [25, 50, 75, 100],
                        paginationPageSize: 25,
						enableRowSelection : true,
						enableRowHeaderSelection : false,
						enableSorting : true,
						enableColumnResizing : true,
						enableFiltering: true

					};
					
					$scope.highlightFilteredHeader = function( row, rowRenderIndex, col, colRenderIndex ) {
					    if( col.filters[0].term ){
					      return 'header-filtered';
					    } else {
					      return '';
					    }
					  };
					
					$scope.getAllDocument = function() {
						$scope.showLoading = true;
// $auth.removeToken();
						console.log($localStorage.token);
						$http(
								{
									method : 'GET',
									url : '/document/',
// headers : {
// 'Authorization' : 'Basic '
// + $localStorage.token
// }
								})
								.success(
										function(response) {
											$scope.showLoading = false;
// $auth.setToken($localStorage.token);
											$scope.gridOptions.data = response;
											console.log(response);
											// $scope.updateMetricsCluster(response);
											$scope.datalength = response.length;
// $scope.user = $localStorage.username;
											$interval(
													function() {
														$scope.gridApi.selection
																.selectRow($scope.gridOptions.data[0]);
													}, 0, 1);
											
										}).error(function(error) {
									$scope.showLoading = false;
// $auth.setToken($localStorage.token);
									console.log(error.message);
									if (typeof error.message === 'undefined'){
										console.log(error);
										toastr.error("Some changes have been made, Please login to make used of the new changes",error.code);
									}else{
										console.log(error);
										toastr.error(error.message,error.code);
									}
									
								});
					}

					$scope.matchWithFakeUser = function() {
						$interval(
								function() {
									$scope.gridApi.selection
											.selectRow($scope.gridOptions.data[0]);
								}, 0, 1);
						var row = $scope.gridApi.selection.getSelectedRows();
						$localStorage.transactionId = row[0].id;
						$scope.getTransaction();
					}
					
					$scope.creerDocument = function(){

						$location.path("/creerDocument");
						
						
					}
					
//					$scope.downloadFile = function (object) {
//						console.log(object);
//						if(object){
//							$http.get(object.link, { responseType: 'arraybuffer' })
//					        .success(function (data) {
//					            var file = new Blob([data], { type: object.type });
//					            var url = $window.URL || $window.webkitURL;
//					            var fileURL = url.createObjectURL(file);
//					            var a = document.createElement("a");
//					            a.href = fileURL;
//					            a.download = object.name;
//					            a.target = "_self";
//					            a.click();
//					            url.revokeObjectURL(fileURL);
//
//					        }).error(function (data) {
//					            console.error(data);
//					        });
//						}
//					    
//					    };
					
					
					
					
					$scope.getAllDocument();

					$scope.gridOptions.columnDefs = [ {
						name : 'id',
						displayName : 'id',
						enableHiding : false,
						enableCellEdit : true,
						visible : false,
						

					}, {
						name : 'name',
//						enableHiding : false,
						displayName : 'Nom du document',
						enableCellEdit : true,
						

					},{
						name : 'description',
//						enableHiding : false,
						displayName : 'Description',
						enableCellEdit : true,
					}
					, {
						name : 'creationDate',
						enableHiding : false,
						displayName : 'Date création',
						enableCellEdit : true
					}, {
						name : 'link',
						enableHiding : false,
						displayName : 'Télécharger',
						enableCellEdit : true
						,
				         cellTemplate:'<a href="{{row.entity.link}}" download>Download</a>'
						
					}
					];

//					function checkStart(term, value, row, column) {
//				        term = term.replace(/\\/g,"")
//				        var now = moment(value);
//				        if(term) {
//				            if(moment(term).isAfter(now, 'day')) return false;;
//				        } 
//				        return true;
//				    }
//
//				    function checkEnd(term, value, row, column) {
//				        term = term.replace(/\\/g,"")
//				        var now = moment(value);
//				        if(term) {
//				            if(moment(term).isBefore(now, 'day')) return false;;
//				        } 
//				        return true;
//				    }
					
					$scope.gridOptions.multiSelect = false;
//					$scope.gridOptions.modifierKeysToMultiSelect = false;
//					$scope.gridOptions.noUnselect = true;
					$scope.gridOptions.onRegisterApi = function(gridApi) {
						$scope.gridApi = gridApi;
					};

					$scope.toggleRowSelection = function() {
						$scope.gridApi.selection.clearSelectedRows();
						$scope.gridOptions.enableRowSelection = !$scope.gridOptions.enableRowSelection;
						$scope.gridApi.core
								.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
					};
					
					
					$scope.canCreateAdmin = function() {
						$scope.getCustomer();
						if ($scope.isSuper === 'super') {
							return false;
						} else
							return true;
					}

//					var token = $auth.getToken();
//					$scope.addCluster = function() {
//						$location.path('/addFakeUser').search({
//							kp : $scope.keyspacename
//						});
//					}

//					var token = $auth.getToken();
//					var accountid = $localStorage.accountid;

					$scope.afficherDocument = function() {

						var row = $scope.gridApi.selection.getSelectedRows();
						$localStorage.id = row[0].id;
						document.title = "List of documents";
						$location.path('/afficherDocument').search({
							id : row[0].id
						});

					}
					
					
					setInterval(function() {
						$scope.getAllDocument();
					}, 300000);
					
					
				});