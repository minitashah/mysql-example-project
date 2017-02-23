var express = require('express');
var router = express.Router();
var db = require("../database");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'hello world' });
});

router.get('/layout', function (req, res, next) {
	res.render('layout');
});

router.get('/data/:tablename', function (req, res){
   var queryString = 'SELECT * FROM `'+ req.params.tablename + '`';
	 
	db.query(queryString, function(err, rows, fields) {
	    if (err) throw err;
	    if (rows) {
	    	res.send(rows);
	    }
	});
});
router.get('/admin/:id', function (req, res){
  var queryString =  'SELECT * FROM `admin` WHERE `id` = ' + req.params.id ; 
  db.query(queryString, function(err, rows, fields) {
    if(err) throw err;
    if(rows) {
      res.send(rows);
    }
  });
});
router.post('/admin', function (req, res) {
  var values = {
    email: req.body.email,
    password: req.body.password
  }
    db.query('INSERT INTO admin SET ?', value, 
        function (err, result, fields) {
            if (err) throw err;
            res.send(result);
        }
    );
});

router.put('/admin', function(req, res) {
  db.query('UPDATE admin SET email = ? WHERE id = ?', [req.body.email, req.body.id], 
    function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

router.delete('/admin/:id', function(req, res) {
  console.log(req.body.id);
  db.query("DELETE FROM `admin` WHERE `id` = ?", [req.params.id], 
    function (error, results, fields) {
    if (error) throw error;
    res.send(results);
  });
});

module.exports = router;