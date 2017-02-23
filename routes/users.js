var express = require('express');
var router = express.Router();
var db = require("../database");

/* GET users listing. */
router.get('/', function(req, res, next) {
  var queryString = 'SELECT * FROM `users`';
  db.query(queryString, function(err, rows, field){
    if(err) {
      res.send(err);
    } else {
      for (var i = 0; i < rows.length; i++ ){
        rows[i].password = undefined;
      }
      res.send(rows);
    }
  });
});

router.get('/:id', function(req, res, next) {

  if(isNaN (req.params.id)) {
    res.send({
      error: "Invalid Id"
    });
    return;
  }

  var queryString = 'SELECT * FROM `users` WHERE `id` = '+ req.params.id ;
  db.query(queryString, function(err, rows, field){
    if(err) {
      res.send(err);
    } else {
      if(rows.length === 1) {
        var obj = rows[0];
        obj.password = undefined;
        res.send(obj);
      } else {
        res.send({});
      }
    }
  });
});

router.post('/', function(req, res, next){
  if (req.body.fname === '' || req.body.lname === '' || req.body.email === '') {
    res.send({
      error: "Missing required fields."
    });
    return;
  }
  if (req.body.fname.search(/[a-zA-Z]+/) === -1 || req.body.lname.search(/[a-zA-Z]+/) === -1) {
      res.send({
        error:"Only characters"
      });
      return;
  }
  console.log("ok1");
  var expres = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!expres.test(req.body.email)) {
    res.send({
      error: "Invalid email"
    });
    return;
  }
  
  var val = {
    fname : req.body.fname,
    lname : req.body.lname,
    email : req.body.email
  }
  var queryString = 'INSERT INTO `users` SET ?';
  db.query(queryString, val, function(err, rows, field){
    if(err) {
      res.send(err);
    } else {
      res.send(rows);
    }
  });
});

router.put('/', function(req, res) {
  db.query('UPDATE users SET fname = ?, lname = ?, email = ?  WHERE id = ?', [req.body.fname,req.body.lname,req.body.email, req.body.id], 
    function (error, results, fields) {
    if (error){
      res.send(error);
    } else {
       res.send(results);
    }
  });
});

router.delete('/:id', function(req, res) {
  db.query('DELETE FROM `users` WHERE `id` = ?', [req.params.id], 
  function(err, results, fields){
    if(err) {
      res.send(err); 
    } else {
      res.send(results);
    }
  });
});

module.exports = router;
