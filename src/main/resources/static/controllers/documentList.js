angular
		.module('MyApp')
		.controller(
				'documentCtl',
				function($scope, $http, $interval, uiGridConstants, $location,
						$auth, $localStorage, toastr) {
					$scope.user = $localStorage.username;
					$scope.gridOptions = {
					    paginationPageSizes: [25, 50, 75, 100],
                        paginationPageSize: 25,
						enableRowSelection : false,
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
						console.log($localStorage.token);
						$http(
								{
									method : 'GET',
									url : '/document/',
									 headers : {
									 'Authorization' : 'Basic '
									 + $localStorage.token
									 }
								})
								.success(
										function(response) {
											$scope.showLoading = false;
											$scope.gridOptions.data = response;
											console.log(response);
											$scope.datalength = response.length;
											$interval(
													function() {
														$scope.gridApi.selection
																.selectRow($scope.gridOptions.data[0]);
													}, 0, 1);
											
										}).error(function(error) {
									$scope.showLoading = false;
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

					
					$scope.creerDocument = function(){

						$location.path("/creerDocument");
						
						
					}
					
					
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
				         cellTemplate:'<center><a href="{{row.entity.link}}" target="_blank" download="{{row.entity.name}}"><img src="images/download.png" /></a><center>'
						
					}
					];

					
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