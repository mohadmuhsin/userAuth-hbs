var express = require('express');
var router = express.Router();
var session;
const credential = {
  email: "muhsinmfz@gmail.com",
  password: "1234"
}

let mobilephones = [{
  image: "https://m.media-amazon.com/images/I/814ePfNubRL._SX679_.jpg ",
  cardtitle: "Samsung Galaxy M04 ",
  cardtext: "Light Green, 4GB RAM, 64GB Storage | Upto 8GB RAM with RAM Plus | MediaTek Helio P35 | 5000 mAh Battery",



},
{
  image: "https://m.media-amazon.com/images/I/71AvQd3VzqL._SX679_.jpg ",
  cardtitle: "OnePlus Nord CE 2 Lite 5G",
  cardtext: " (Blue Tide, 6GB RAM, 128GB Storage,Qualcomm® Snapdragon™, 6 GB RAM,128 GB Internal Storage)",


},
{
  image: " https://m.media-amazon.com/images/I/81BtVJkyYOL._SX679_.jpg ",
  cardtitle: "Oppo A77 ",
  cardtext: "(Sky Blue, 4GB RAM, 64 Storage) Finger Print Sensor with No Cost EMI/Additional Exchange Offers",



}

]
/* GET home page. */

router.get('/', function (req, res, next) {
  session = req.session;
  if (session.user) {
    res.redirect('/home')
  } else {
    res.render('index');
  }
});


//login user
router.post('/login', function (req, res) {

  // console.log(req.body)
  if (req.body.email == credential.email && req.body.password == credential.password) {
    session = req.session;
    req.session.user = req.body.email;
    res.redirect('/home')
  } else if (req.body.email == "" && req.body.password == "") {
    res.render('index', { nullcheck: ' Username and password required !!!' })
  }
  else {
    res.render('index', { login: 'Invalid Username or password' })

  }
})


// home page
router.get('/home', (req, res) => {
  session = req.session;
  if (session.user) {
    res.render('home', { mobilephones })
  } else {
    res.redirect('/')
  }
})

// home page post
router.post('/home', (req, res) => {

  if (req.session.user) {
    session = req.session;
    session.user = req.body.email;
    res.render('home', { mobilephones })
  } else {
    res.redirect('/')
  }

})

//router for logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/')
})


module.exports = router;
