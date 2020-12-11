const router = require("express").Router();
const bcrypt = require("bcryptjs"); 

// Require necessary middlewares in order to control access to specific routes
const shouldNotBeLoggedIn = require("../middlewares/shouldNotBeLoggedIn");
const isLoggedIn = require("../middlewares/isLoggedIn");

const Player = require("../models/Player.model");
const Events = require("../models/Events.model");

////// Player Profile//////////////////////
router.get("/:id", (req, res) => {
  console.log(req.params.id);
  Player.findOne({ username: req.params.id })
    .then((user) => {
      return res.json({ user });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});

//

router.put("/:id/edit-profile",isLoggedIn, (req, res) => {
  Player.findOneAndUpdate(req.params.id, req.body, { new: true })
    .then((userUpdated) => {
      res.json({ message: "all good", userUpdated });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});


////-----------------UpdatePassword-------------------------------///
//
router.post("/:id/update-password", (req, res) => {
  const {newPassword} = req.body;
  const hash = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, hash);
  Player.findOneAndUpdate(
    req.params.id,
    { password: hashedPassword },
    { new: true }
  ).then((updatedUser) => {
    res.json({ message: "all good", updatedUser });
    });
  });

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
