const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const app = express();
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://chudaa203:password1234@cluster0.5qdlfa8.mongodb.net/node-auth";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);

// // create a cookie
// app.get("/set-cookies", (req, res) =>{

//   //  res.setHeader("Set-cookie", "newUser = true");

//   // does the same as above but loooks cleaner
//    res.cookie("newUser", false);
//   // 1000 milli second, 24 hrs, 60 mins, 60 secs
//   res.cookie("isEmployee", true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });

//   res.send("you got the cookie, check the application tab in the inspect tool.");
// });

// // read a cookie
// app.get("/read-cookies", (req, res) =>{

//   const cookies = req.cookies;
//   // console.log(cookies);
//  console.log(cookies.newUser); //for new user only

//   res.json(cookies);
// });
