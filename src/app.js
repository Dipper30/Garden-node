const express = require('express')
const app = express()
const router = require('./router/index.js')
const schedule = require('node-schedule')
const {calculateStudyDuration} = require('./service/StudyDuration')

app.use(express.json({limit: '20mb'}))
app.use(express.urlencoded({extended: true}))

app.all('*', async (req, res, next) => {
  const { origin, Origin, referer, Referer } = req.headers;
  const allowOrigin = origin || Origin || referer || Referer || '*';
	res.header("Access-Control-Allow-Origin", allowOrigin);
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, token");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", 'Express');
	if (req.method == 'OPTIONS') {
  	res.sendStatus(200);
	} else {
    next();
	}
})

const tokenFreeUrls = ['/api/v1/login', '/api/v1/register', '/api/v1/checkAccount']

// token 校验
app.use('/', async (req, res, next) => {
  console.log(req.url);
  if ( tokenFreeUrls.includes(req.url) ) {
    next()
    return
  }
  const token = String(req.headers.token)
  if ( !token || token == 'undefined' ) {
    res.status(200).json({
      code: 10002,
      msg: 'Token校验失败'
    })
  } else {
    next()
  }
})

router(app)

app.use((err,req,res,next)=>{
  if (err) {
    let status = err.error_code ? 200 : 500
    res.status(status).json({
      code: err.error_code || 500,
      msg: err.msg || 'Bad Request'
    })
  }
})

app.listen(3000, "0.0.0.0", ()=>{
  console.log('hello dipper')
})


// 定时器任务，每天零点进行学习时间结算
schedule.scheduleJob('0 0 0 * * *', () => {
  calculateStudyDuration()
})

