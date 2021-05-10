var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  const url = 'https://raw.githubusercontent.com/hexschool/js-training-task/master/api/BigFive.json';
  axios.get(url)
    .then((response) => {
      console.log(response.data)
      res.render('index', {
        title: response.data.name.zh,
        description: response.data.description
      });
    })
});

module.exports = router;
