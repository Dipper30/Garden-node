
const v1 = require('./v1')
const login = require('../controller/Account')
const register = require('../controller/Register')


module.exports = ((app) => {
	// app.get('/', (req, res, next) => {
	// 	res.redirect('/');
	// });
 
	app.use('/api/v1', v1)
  // app.use('', v1)
})