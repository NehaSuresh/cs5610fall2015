(function()
		{
			angular
				.module("FormBuilderApp")
				.config(Configuration);
			
			function Configuration($routeProvider)
			{
				$routeProvider
					.when("/home", {
						templateUrl: "views/home/home.view.html"
					})
//					.when("/admin", {
//						templateUrl: "views/admin/admin.view.html"
//					})
					.when("/profile", {
						templateUrl: "views/profile/profile.view.html",
						controller: "ProfileController"
					})
					.when("/forms", {
						templateUrl: "views/form/form.view.html",
						controller: "FormController"
					})
					/*.when("/form-fields", {
						templateUrl: "views/forms/form-fields.view.html"
					}) */
					.when("/login", {
						templateUrl: "views/login/login.view.html",
						controller: "LoginController"
					})
					.when("/register", {
						templateUrl: "views/register/register.view.html",
						controller: "RegisterController"
					})
					.when("/user/:userId/form/:formId/fields", {
						templateUrl: "views/fields/field.view.html",
						controller: "FieldController",
						controllerAs: "model"
					})
					.otherwise({redirectTo: "home"})
			}
		}) ();