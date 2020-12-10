const router = require("express").Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require necessary middlewares in order to control access to specific routes
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const isLoggedIn = require("../middlewares/isLoggedIn");

const Player = require("../models/Player.model");
const Events = require("../models/Events.model");

////// Player Profile//////////////////////
router.get("/:id", (req, res) => {
  console.log(req.params.id);
  Player.findById(req.params.id)
    .then((user) => {
      console.log(user);
      return res.json({ user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});

///////// User Settings - Update  details, Profile Picture and Password////////////
//router.get('/settings',isLoggedIn,(req,res)=> {
//  const style = "/stylesheets/settings.css"
//res.render('user/settings',{ currentUser: req.session.user,style })})
//   //------------- update general settings -------------//
//
//router.post('/general-settings', (req, res) => {
//  const { username, email, about,location } = req.body;
//  const style = "/stylesheets/settings.css"
//  User.findByIdAndUpdate(req.session.user._id, { username, email, about,location }, { new: true })
//    .then((currentUser) => {
//      req.session.user = currentUser;
//      res.redirect( '/user/profile')})
//    .catch(() =>res.render('user/settings',{errorMessage:"there was and error updating your profile",style}));
//});
//
////-----------------UpdatePassword-------------------------------///
//
//router.post("/updatePassword", (req, res) => {
//  const { oldPassword, newPassword, repeatPassword } = req.body;
//  const style = "/stylesheets/settings.css"
//  if (newPassword !== repeatPassword) {
//    res.render('user/settings',{errorMessage:'Your new passowrd and confirmation do not match please try again',style})
//  }
//  const isSamePassword = bcrypt.compareSync(
//    oldPassword,
//    req.session.user.password
//  );
//  if (!isSamePassword) {
//  res.render('user/settings',{errorMessageP:'Please try again  your old password',style})
//  }
//  const hash = bcrypt.genSaltSync(10);
//  const hashedPassword = bcrypt.hashSync(newPassword, hash);
//  User.findByIdAndUpdate(
//    req.session.user._id,
//    { password: hashedPassword },
//    { new: true }
//  ).then((currentUser) => {
//    req.session.user = currentUser;
//    res.render("user/settings", {
//      updateMessageP: "Your Password has being updated",style
//    });
//  });
//});
//
//
//// ----------------------- Update Profile Picture --------------------//
//
//router.post('/upload-profile-picture',upload.single("Picture"), (req,res, next)=>{
//const style = "/stylesheets/profile.css"
//User.findByIdAndUpdate(req.session.user._id, {Picture:req.file.path}, { new: true })
//.then((currentUser)=> {
//req.session.user = currentUser;
//res.redirect('/user/profile')})
//.catch(() =>res.render('user/profile',{errorMessagepic:"there was and error updating your picture",style}));
//} )
//
////-------------------- Delete Account -----------------------------------------//
//router.get('/delete-account',isLoggedIn,(req,res)=> {
//  const style = "/stylesheets/settings.css"
//  res.render('user/delete-account',{ currentUser: req.session.user, style})})
//
//
//router.post('/delete-account', isLoggedIn,(req,res)=> {
//  const {password } = req.body;
//  const style = "/stylesheets/settings.css"
//  const correctPassword = bcrypt.compareSync(password,req.session.user.password);
//  if (!correctPassword) {
//  res.render('user/delete-account',{errorMessageP:'Wrong password please try again',style})
//  return;
//  }
//  User.findByIdAndDelete(req.session.user._id)
//
//    .then(() => {
//      req.session.destroy(err => {
//        if (err) {
//          return res.status(500).render('user/delete-account', { errorMessageP: err.message, style });
//        }
//        res.redirect('/');
//      });
//    })
//    .catch(err => console.error('Error deleting the User', err));
//})
//
//
//
//
/////// Routes for the Post Model/////////////////////////////////////
//router.get('/newpost',isLoggedIn,(req,res)=> {
//  const style = "/stylesheets/posts.css"
//  const scrypt = "/javascripts/script.js"
//res.render('user/new-post',{ currentUser: req.session.user,style,scrypt })})
//
//
//router.post("/newpost",isLoggedIn,upload.single("image"), (req, res) => {
//  const { country,city,budget,currency,days,when,title, description, body } = req.body;
//  let image = "https://res.cloudinary.com/dwttlckdr/image/upload/v1606406295/travel_q6liqk.jpg"
//  if(req.file){
//    image=req.file.path
//  }
//  Post.create({
//    type: "text",
//    country,
//    city,
//    budget,
//    currency,
//    days,
//    when,
//    title,
//    image,
//    description,
//    body,
//    author: req.session.user._id,})
//    .then((createdPost) => {
//    User.findByIdAndUpdate(
//      req.session.user._id,
//      {
//        $addToSet: { posts: createdPost._id },
//      },
//      { new: true }
//    )
//    .then((currentUser) => {
//      req.session.user = currentUser;
//      res.redirect("/user/profile");
//    });
//  });
//});
//
//
//
//router.get('/readmore/:slug',isLoggedIn, (req,res)=>{
//  const style = "/stylesheets/readP.css"
//  Post.findOne({slug:req.params.slug})
//  .populate('author')
//  .then((post) => {
//    const treatedDate = post.when.toString().slice(4,16);
//    res.render('user/read-more', {post:post,style,treatedDate})})
//  .catch(err => console.log(err))
//  });
//
module.exports = router;
