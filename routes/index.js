var express = require('express');
var router = express.Router();
var dbHelper = require('../common/dbHelper');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


router.get('/allPerson', function (req, res, next) {
    var User = dbHelper.getModel('users');
    User.find({}, function (err, docs) {
        if (err) {
            console.log('Mongodb err' + err);
        } else {
            docs.sort({department: 1});
            res.send(docs);
        }
    })
});

router.post('/searchSomeone', function (req, res, next) {
    var User = dbHelper.getModel('users');
    var userName = req.body.username;
    User.findOne({username: userName}, function (err, doc) {
        if (err) {
            console.log('Mongodb err' + err);
            res.sendStatus(500)
        } else if (!doc) {
            res.send(404);
        } else {
            res.json(doc);
        }

    })
});


router.post('/searchSparePerson', function (req, res, next) {
    var weekday = req.body.weekday;
    var myclass = req.body.myclass;
    var mydepartment = req.body.department;
    switch (weekday) {
        case  'Mon' :
            weekday = 0;
            break;
        case 'Tue' :
            weekday = 1;
            break;
        case 'Wed' :
            weekday = 2;
            break;
        case 'Thu' :
            weekday = 3;
            break;
        case 'Fri':
            weekday = 4;
            break;
        case 'Sat':
            weekday = 5;
            break;
        case 'Sun':
            weekday = 6;
            break;
        default:
            weekday = 0;
            break;
    }
    switch (myclass) {
        case 'yeClass':
            myclass = 0;
            break;
        case 'ssClass':
            myclass = 1;
            break;
        case 'wlClass':
            myclass = 2;
            break;
        case 'qqClass':
            myclass = 3;
            break;
        case 'qsClass':
            myclass = 4;
            break;
        default:
            myclass = 1;
            break;
    }

    var User = dbHelper.getModel('users');
    var tmp = {};
    if (mydepartment !== 'alldepartment') {
        tmp = {department: mydepartment}
    } else {
        tmp = {};
    }
    User.find(tmp, function (err, docs) {
        if (err) {
            console.log('Mongodb err' + err);
        } else {
            //docs.sort({department: 1});
            if (docs.length === 0) {
                res.send('404');
            } else {
                var newArr = [];
                newArr = docs.filter(function (each) {
                    return each.mySpareTime[weekday][myclass];
                });
                res.json(newArr);
            }

            //res.send(docs);
        }
    })

})


module.exports = router;