angular
		.module(
				'MyApp',
				[ 'ngResource', 'ngMessages', 'ngAnimate', 'toastr',
						'ui.router', 'satellizer', 'ngStorage', 'ngFileUpload',
						'ngIdle', 'ngTouch', 'ui.grid', 'ui.grid.selection','ui.grid.pagination',
						'ui.grid.resizeColumns', 'ui.grid.moveColumns',
						'base64' ,'angucomplete-alt'])
		.config(
				function($stateProvider, $urlRouterProvider, $authProvider,
						$locationProvider, KeepaliveProvider, IdleProvider,$httpProvider) {
					$stateProvider.state('home', {
						url : '/',
						controller : 'HomeCtrl',
						templateUrl : 'partials/home.html'
					}).state('login', {
						url : '/login',
						templateUrl : 'partials/login.html',
						controller : 'LoginCtrl',
						resolve : {
							skipIfLoggedIn : skipIfLoggedIn
						}
					}).state('signup', {
						url : '/signup',
						templateUrl : 'partials/signup.html',
						controller : 'SignUpCtrl'
//						resolve : {
//							skipIfLoggedIn : skipIfLoggedIn
//						}
					}).state('registrationconfirm', {
						url : '/registrationconfirm',
						templateUrl : 'partials/registrationconfirm.html',
						controller : 'registrationconfirmCtrl',
						resolve : {
							skipIfLoggedIn : skipIfLoggedIn
						}
					}).state('registrationpending', {
						url : '/registrationpending',
						templateUrl : 'partials/registrationpending.html',
						controller : 'registrationpendingCtrl',
						resolve : {
							skipIfLoggedIn : skipIfLoggedIn
						}
					}).state('resetpassword', {
						url : '/resetpassword',
						templateUrl : 'partials/resetpassword.html',
						controller : 'resetpasswordCtrl',
						resolve : {
							skipIfLoggedIn : skipIfLoggedIn
						}
					}).state('forgotpassword', {
						url : '/forgotpassword',
						templateUrl : 'partials/forgotpassword.html',
						controller : 'forgotpasswordCtrl',
						resolve : {
							skipIfLoggedIn : skipIfLoggedIn
						}
					}).state('logout', {
						url : '/logout',
						template : null,
						controller : 'LogoutCtrl'
					}).state('profile', {
						url : '/profile',
						templateUrl : 'partials/profile.html',
						controller : 'ProfileCtrl',
						resolve : {
							loginRequired : loginRequired
						}
					}).state('paroisses', {
						url : '/paroisses',
						templateUrl : 'partials/paroisseList.html',
						controller : 'paroisseCtl',
//						resolve : {
//							loginRequired : loginRequired
//						}
					}).state('pasteurs', {
						url : '/pasteurs',
						templateUrl : 'partials/pasteurList.html',
						controller : 'pasteurCtl',
//						resolve : {
//							loginRequired : loginRequired
//						}
					}).state('createAdmin', {
						url : '/createAdmin',
						templateUrl : 'partials/createAdmin.html',
						controller : 'createAdminCtrl',
						resolve : {
							loginRequired : loginRequired
						}
					}).state('transactionDetails', {
						url : '/transactionDetails',
						templateUrl : 'partials/transactionDetails.html',
						controller : 'transactionDetailCtl',
						resolve : {
							loginRequired : loginRequired
						}
					}).state('creerParoisse', {
						url : '/creerParoisse',
						templateUrl : 'partials/creerParoisse.html',
						controller : 'createParishCtl'
//						resolve : {
//							loginRequired : loginRequired
//						}
					}).state('creerPasteur', {
						url : '/creerPasteur',
						templateUrl : 'partials/creerPasteur.html',
						controller : 'createPastorCtl'
//						resolve : {
//							loginRequired : loginRequired
//						}
					});

					$urlRouterProvider.otherwise('/');
					
					$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
					
					$httpProvider.interceptors.push(['$q', function ($q) {
						  return {
						    'responseError': function (rejection) {
						      if (rejection.status === 401) {
						        console.log('Got a 401');
						      }
						      return $q.reject(rejection);
						    }
						  }
						}]);


					// Changing down arrow to green color
					// .ui-grid-icon-angle-down

					function css(selector, property, value) {
						for (var i = 0; i < document.styleSheets.length; i++) {// Loop
																				// through
																				// all
																				// styles
							// Try add rule
							try {
								document.styleSheets[i]
										.insertRule(
												selector + ' {' + property
														+ ':' + value + '}',
												document.styleSheets[i].cssRules.length);
							} catch (err) {
								try {
									document.styleSheets[i].addRule(selector,
											property + ':' + value);
								} catch (err) {
								}
							}// IE
						}
					}

					css('.ui-grid-icon-angle-down', 'color', '#34b1c4');
					css('.ui-grid-icon-sort-alt-down', 'color', '#34b1c4');
					css('.ui-grid-icon-sort-alt-up', 'color', '#34b1c4');
					css('.ui-grid-column-menu-button-last-col', 'margin-right', '2px');

					// css('.ui-grid-top-panel','font-size','11px');  
					css('.ui-grid-top-panel', 'font-family',
							'LatoBold, sans-serif');
					css('.ui-grid-top-panel', 'font-weight', 'normal');

					css('.ui-grid-cell-contents', 'padding', '9px 5px 5px 15px');

					$authProvider.facebook({
						clientId : '657854390977827'
					});
					$authProvider
							.google({
								clientId : '631036554609-v5hm2amv4pvico3asfi97f54sc51ji4o.apps.googleusercontent.com'
							});

					$authProvider.github({
						clientId : '0ba2600b1dbdb756688b'
					});

					$authProvider.linkedin({
						clientId : '77cw786yignpzj'
					});

					$authProvider.instagram({
						clientId : '799d1f8ea0e44ac8b70e7f18fcacedd1'
					});

					$authProvider
							.yahoo({
								clientId : 'dj0yJmk9SDVkM2RhNWJSc2ZBJmQ9WVdrOWIzVlFRMWxzTXpZbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yYw--'
							});

					$authProvider.twitter({
						url : '/auth/twitter'
					});

					$authProvider.live({
						clientId : '000000004C12E68D'
					});

					$authProvider.twitch({
						clientId : 'qhc3lft06xipnmndydcr3wau939a20z'
					});

					$authProvider.bitbucket({
						clientId : '48UepjQDYaZFuMWaDj'
					});

					$authProvider
							.oauth2({
								name : 'foursquare',
								url : '/auth/foursquare',
								clientId : 'MTCEJ3NGW2PNNB31WOSBFDSAD4MTHYVAZ1UKIULXZ2CVFC2K',
								redirectUri : window.location.origin
										|| window.location.protocol + '//'
										+ window.location.host,
								authorizationEndpoint : 'https://foursquare.com/oauth2/authenticate'
							});

					function skipIfLoggedIn($q, $auth) {
						var deferred = $q.defer();
						if ($auth.isAuthenticated()) {
							deferred.reject();
						} else {
							deferred.resolve();
						}
						return deferred.promise;
					}

					function loginRequired($q, $location, $auth) {
						console.log("In loginRequired");
						var deferred = $q.defer();
						console.log($auth.getToken());
						if ($auth.isAuthenticated()) {
							console.log("Authenticated");
							deferred.resolve();
						} else {
							console.log("log out has to login");
							$location.path('/login');
						}
						return deferred.promise;
					}
					IdleProvider.idle(7200);
					IdleProvider.timeout(60);
					KeepaliveProvider.interval(10);
				})
		.run(
				function($rootScope, $http, $auth, Idle, $location, $localStorage,
						toastr) {
					Idle.watch();
					$rootScope.$on('unauthorized', function() {
						$location.path('/login');
					});
					$rootScope.$on('IdleStart', function() { /*
																 * Display modal
																 * warning or
																 * sth
																 */
					});
					$rootScope.$on("$stateChangeError", function (event, next, current) {
						console.log("Route change");
						$location.path('/transactions');
//                        if (!(next.templateUrl == "partials/login.html")) {
//                            $location.path("/login");
//                        }
                    });
					
					
					$rootScope.$on('IdleTimeout', function() {
						if (!$auth.isAuthenticated()) {
							return;
						}
						$auth.logout().then(function() {
							$localStorage.$reset();
							console.log(" before the logger");
							
							toastr.info('You have been logged out');
							$location.path('/');

						});
					});
					console.log(" after the logger");
					
//					$rootScope.$on('$stateChangeError', function () {
//                        console.log("failed to change routes");
//
//                        $auth.logout().then(function() {
//                                    $localStorage.$reset();
//                                    $location.path('/login');
//
//                            });
//                        toastr.info('You have to login !!');
//              });
				});
