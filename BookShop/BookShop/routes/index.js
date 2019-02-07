'use strict';
var express = require('express');
var router = express.Router();
var sql = require('mssql/msnodesqlv8');
var multiparty = require('multiparty');

/* GET home page. */
var getData = function () {

}

router.get('/', function (req, res) {
	res.render('index', { title: 'Express', "data": getData() });
});
router.get('/task/new', async function (req, res) {
	res.render('page2', { title: 'Express', "data": getData() });
});
router.get('/task/next', async function (req, res) {
	res.render('page3', { title: 'Express', "data": getData() });
});
async function add_task(name, priority) {
	var sql_text = `insert into Tasks(TaskName, Priority) values(@, @)`;

	var connection = new sql.ConnectionPool({
		database: '',
		server: ' ',
		driver: 'msnodesqlv8',
		options: { trustedConnection: true }

	});

	await connection.connect();

	var q_req = new sql.Request(connection);
	var arr_tasks = await q_req
		.input("name", sql.NVarChar(120), name)
		.input("priority", sql.Int, priority)
		.query(sql_text);

}
module.exports = router;
