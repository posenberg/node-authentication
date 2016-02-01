//bring in userSchema

var User = require('./models/user');

module.exports = function(app, passport){
	app.get('/', function(req, res){
		//res.send("Hello world");
		res.render('index.ejs')
	});

	app.get('/login', function(req,res){
		res.render('login.ejs', {message: req.flash('loginMessage')})
	})

	//ths will go passport authentication
	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/signup', function(req, res){
		res.render('signup.ejs', {message: req.flash('signupMessage') });
	})


	app.get('/profile', isLoggedIn, function(req, res){
		res.render('profile.ejs', { user: req.user });
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));


	//instead of params, we're using body-parser and now use we req.body.<variable>
	app.get('/:username/:password', function(req, res){
		var newUser = new User();
		newUser.local.username = req.params.username;
		newUser.local.password = req.params.password;
		console.log(newUser.local.username + " " + newUser.local.password);
		newUser.save(function(err){
			if(err)
				throw err;
		});
		res.send("Success!");
	})

	app.get('/dick', isLoggedIn,function(req, res){
		res.send("Hello dick!");
	});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	function isLoggedIn(req, res, next) {
		if(req.isAuthenticated()){
			return next();
		}

		res.redirect('/login');
	}

};

