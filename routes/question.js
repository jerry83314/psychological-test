var express = require('express');
var app = express();
var router = express.Router();
const axios = require('axios');

let problemList = {};
let problemTitle = '';
let option = [];
let score = {
  neuroticism: [],
  extroversion: [],
  openness: [],
  agreeableness: [],
  conscientiousness: []
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
  switch(req.body.category) {
    case 'neuroticism':
      score.neuroticism.push(req.body.score)
      break;
    case 'extroversion':
      score.extroversion.push(req.body.score)
      break;
    case 'openness':
      score.openness.push(req.body.score)
      break;
    case 'agreeableness':
      score.agreeableness.push(req.body.score)
      break;
    case 'conscientiousness':
      score.conscientiousness.push(req.body.score)
      break;
  }
  res.send({
    success: true,
    msg: '新增成功'
  });
  console.log(score)
});

// 最後結算取得分數
router.get('/getScore', function(req, res) {
  let number = 0;
  for(value in score) {
    let category = score[value];
    console.log('score', category)
    for(key in category) {
      number += parseInt(category[key]);
    }
    console.log(number)
  }
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
  getData('extroversion', 0).then(() => {
    res.render('question03', {
      title: problemTitle,
      option: option
    });
  })
});

router.get('/04', function(req, res) {
  getData('extroversion', 1).then(() => {
    res.render('question04', {
      title: problemTitle,
      option: option
    });
  })
});

router.get('/05', function(req, res) {
  getData('openness', 0).then(() => {
    res.render('question05', {
      title: problemTitle,
      option: option
    });
  })
});

router.get('/06', function(req, res) {
  getData('openness', 1).then(() => {
    res.render('question06', {
      title: problemTitle,
      option: option
    });
  })
});

router.get('/07', function(req, res) {
  getData('agreeableness', 0).then(() => {
    res.render('question07', {
      title: problemTitle,
      option: option
    });
  })
});

router.get('/08', function(req, res) {
  getData('agreeableness', 1).then(() => {
    res.render('question08', {
      title: problemTitle,
      option: option
    });
  })
});

router.get('/09', function(req, res) {
  getData('conscientiousness', 0).then(() => {
    res.render('question09', {
      title: problemTitle,
      option: option
    });
  })
});

router.get('/10', function(req, res) {
  getData('conscientiousness', 1).then(() => {
    res.render('question10', {
      title: problemTitle,
      option: option
    });
  })
});

module.exports = router;
