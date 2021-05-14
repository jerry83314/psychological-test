var express = require('express');
var app = express();
var router = express.Router();
const axios = require('axios');

let problemList = {};
let problemTitle = '';
let option = [];
let score = {
  neuroticism: []
};

function getData(category, key) {
  return new Promise((resolve, reject) => {
    const url = 'https://raw.githubusercontent.com/hexschool/js-training-task/master/api/BigFive.json';
    axios.get(url)
      .then((response) => {
        problemList = response.data.problemList
        problemTitle = problemList[category].problems[key].problem
        option = problemList[category].problems[key].options
        resolve();
      })
  })
}

// 接分數的 api
router.post('/addScore', function(req, res) {
  console.log(req.body)
  if(req.body.category === 'neuroticism') {
    score.neuroticism.push(req.body.score)
  }
  res.send({
    success: true,
    msg: '新增成功'
  });
  console.log(score)
});

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/01', function(req, res) {
  getData('neuroticism', 0).then(() => {
    res.render('question01', {
      title: problemTitle,
      option: option
    });
  })
});

router.get('/02', function(req, res) {
  getData('neuroticism', 1).then(() => {
    res.render('question02', {
      title: problemTitle,
      option: option
    });
  })
});

router.get('/03', function(req, res) {
  res.render('question03')
});

module.exports = router;
