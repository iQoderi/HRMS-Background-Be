var express = require('express');
var router = express.Router();
var dbHelper = require('../common/dbHelper');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


module.exports = router;


router.get('/allperson', function (req, res, next) {
    var User = dbHelper.getModel('user');
    User.find({},function (err, docs) {
        if (err) {
            console.log('Mongodb err' + err);
        } else {
            res.send(JSON.stringify(docs));
        }
    })
})

router.post('/searchSomeone', function (req, res, next) {
    var User = dbHelper.getModel('user');
    var userName = req.body.username;
    User.find({username: userName}, function (err, doc) {
        if (err) {
            console.log('Mongodb err' + err);
        } else {
            res.send(JSON.stringify(docs));
        }
    })
})


router.post('/freePerson', function (req, res, next) {
    var weekday = req.body.weekday;
    var myclass = req.body.myclass;
    var departmet = req.body.department;
    switch (weekday) {
        case  'Mon' :
            weekday = 0
            break;
        case 'Tue' :
            weekday = 1
            break;
        case 'Wed' :
            weekday = 2
            break;
        case 'Thu' :
            weekday = 3
            break;
        case 'Fri':
            weekday = 4
            break;
        case 'Sat':
            weekday = 5
            break;
        default :
            weekday = 6;
    }
    switch (myclass){
        case (yeClass):
            myclass = 0;
            break;
        case (ssClass):
            myclass = 1;
            break;
        case (wlClass):
            myclass = 2;
            break;
        case (qqClass):
            myclass = 3;
            break;
        default :
            myclass = 4;
    }
    var User = dbHelper.getModel('user');
    var tmp = {$where: "this.mySpareTime[weekday][myclass]===false "};
    if(departmet !== 'alldepartment'){
        tmp.department = departmet;
    }
    User.find(tmp,function(err,docs){
        if (err) {
            console.log('Mongodb err' + err);
        } else {
            docs.sort({department: 1});
            res.send(JSON.stringify(docs));
        }
    })
})


