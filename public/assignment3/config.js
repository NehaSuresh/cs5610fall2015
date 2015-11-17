(function()
		{
			angular
				.module("FormBuilderApp")
				.config(Configuration);
			
			function Configuration($routeProvider)
			{
				$routeProvider
					.when("/home", {
						templateUrl: "home/home.view.html"
					})
					.when("/admin", {
						templateUrl: "admin/admin.view.html"
					})
					.when("/profile", {
						templateUrl: "profile/profile.view.html",
						controller: "ProfileController"
					})
					.when("/forms", {
						templateUrl: "form/form.view.html",
						controller: "FormController"
					})
					/*.when("/form-fields", {
						templateUrl: "forms/form-fields.view.html"
					}) */
					.when("/login", {
						templateUrl: "login/login.view.html",
						controller: "LoginController"
					})
					.when("/register", {
						templateUrl: "register/register.view.html",
						controller: "RegisterController"
					})
					.otherwise({redirectTo: "home"})
			}
		}) ();