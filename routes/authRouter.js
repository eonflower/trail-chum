const express = require('express')
const authRouter = express.Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken');
const Note = require('../models/Note')
const Trail = require('../models/Trail')


// signup

authRouter.post("/signup", (req, res, next) => {
  const { username, password, email } = req.body;

  // Function to check if inputs are empty
  const checkInputs = () => {
    if (!username || !password || !email) {
      throw new Error("Please fill in all input fields");
    }
  };

  try {
    // Call the function to check inputs
    checkInputs();


  // Check if the username contains only letters and numbers
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (!usernameRegex.test(username)) {
    res.status(400);
    return next(new Error("Username can only contain letters and numbers"));
  }

  User.findOne({username : req.body.username.toLowerCase() }, (err, user) => {
		if(err) {
			res.status(500)
			return next(err)
		}
		if(user) {
			res.status(403)
			return next(new Error("That username is already taken"))
		}

    User.findOne({ email: req.body.email.toLowerCase() }, (err, user) => {
      if (err) {
        res.status(500);
        return next(err);
      }
      if (user) {
        res.status(403);
        return next(new Error("That email is already taken"));
      }
    });

  // Check if the username and password have a minimum of 8 characters
  if (username.length < 8 || password.length < 8) {
    res.status(400);
    return next(new Error("Username and password must be at least 8 characters long"));
  }

		const newUser = new User({ username: username.toLowerCase(), password, email: email.toLowerCase() });

    newUser.save((err, savedUser) => {
      if (err) {
        res.status(500);
        return next(err);
      }

			const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET);
      if (!token) {
        res.status(500);
        return next(new Error("Token generation failed"));
			}

			return res.status(201).send({token, user: savedUser.withoutPassword()})
		})
	})

} catch (error) {
  res.status(400);
  return next(error);
}
});



// login 

authRouter.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if(!user){
      res.status(403)
      return next(new Error("Username or Password are incorrect"))
    }

    user.checkPassword(req.body.password, (err, isMatch) => {
      if (err || !isMatch) {
        res.status(403);
        return next(new Error("Username or Password are incorrect"));
      }

      const token = jwt.sign(user.withoutPassword(), process.env.SECRET);
      if (!token) {
        res.status(500);
        return next(new Error("Token generation failed"));
			}

      return res.status(200).send({ token, user: user.withoutPassword() })
    })
  })
});

// Get user information
authRouter.get("/:id", (req, res, next) => {
  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      res.status(500);
      return next(err);
    }
    return res.status(200).send(user);
  });
});

// Delete account information
authRouter.delete("/:id", async (req, res, next) => {
  try {
    const userId = req.auth._id;

    await Note.deleteMany({ user: userId });

    await Trail.deleteMany({ user: userId });


    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404);
      return next(new Error("User not found"));
    }
    return res.status(200).send(`Successfully deleted user`);
  } catch (err) {
    res.status(500);
    return next(err);
  }
});




module.exports = authRouter;