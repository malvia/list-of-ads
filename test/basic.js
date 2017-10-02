/*
 *
 * Copyright - Nirlendu Saha
 * author - nirlendu@gmail.com
 *
 */

 /* Karma + Jasmine sample test script */

(function () {
	'use strict';
	describe("App: pouch-db-example", function () {

		// Fetching the app
		beforeEach(function(){
			module('pouch-db-example');          
		});

		var $controller;

		// Loading the controller from the app
		beforeEach(inject(function(_$controller_){
			$controller = _$controller_;
		}));

		/*
		* Test to check proper loading of $scope from the Angular App
		*/
		it('Angular Scope Loader', function () {
			var $scope = {};
			var controller = $controller('MainCtrl', { $scope: $scope });
			expect($scope.test_string).toBe('Test String');
		});

		function correct_response(response) {
			expect(response.ok).toBe(true);
		}

		function error(err) {
			alert(err);
		}

		// creates the db
		function create_db(db_name) {
			return PouchDB(db_name);
		}

		/*
		* Test to check PouchDB PUT Operation
		*/
		it('PouchDB PUT Operation', function() {
			var pouchDB = create_db('sample-db');
			var json_data = {_id: Date.now().toString(), user_name: 'user_name', post_content: 'post_content'}
			pouchDB.put(json_data)
				.then(correct_response)
				.catch(error);
		});
	});
})();