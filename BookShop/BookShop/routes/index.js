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
async function get_all_data() {
	var sql_text = `select * from Каталог_Книга`;

	var connection = new sql.ConnectionPool({
		database: 'Book_Shop',
		server: 'DESKTOP-QJ276O0',
		driver: 'msnodesqlv8',
		options: { trustedConnection: true }

	});

	await connection.connect();

	var q_req = new sql.Request(connection);
	var arr_tasks = await q_req.query(sql_text);

	return arr_tasks.recordset;
}
async function add_book(название, цена) {
	var sql_text = `insert into Корзина_Книга(Название, Цена) values(@Название, @Цена)`;

	var connection = new sql.ConnectionPool({
		database: 'Book_Shop',

		server: 'DESKTOP-QJ276O0',
		driver: 'msnodesqlv8',
		options: { trustedConnection: true }

	});

	await connection.connect();

	var q_req = new sql.Request(connection);
	var arr_tasks = await q_req
		.input("Название", sql.varchar, Название)
		.input("Цена", sql.money, Цена)
		.query(sql_text);

}
async function delete_book() {
	var sql_text = `delete Книга from Корзина_Книга where Книга = @код_книги`;

	var connection = new sql.ConnectionPool({
		database: 'Book_Shop',
		server: 'DESKTOP-QJ276O0',
		driver: 'msnodesqlv8',
		options: { trustedConnection: true }

	});

	await connection.connect();

	var q_req = new sql.Request(connection);
	var arr_tasks = await q_req
		.input("код_книги", sql.Int)
		.query(sql_text);

}
//const mssql = require('mssql');
//// Set database connection credentials
//const config = {
//	host: 'localhost',
//	database: 'Book_Shop',
//	server: 'DESKTOP-QJ276O0\SQLEXPRESS',
//	driver: 'msnodesqlv8',
//	options: { trustedConnection: true }
//};
////// Create a SQL pool
//const pool = mssql.createPool(config);
////// Export the pool
//module.exports = pool;
////// Load the SQL pool connection
//	const pool = require('../data/config');
////// Display all data
//app.get('/Page2', (request, response) => {
//	pool.query('SELECT * FROM Каталог_Книга', (error, result) => {
//		if (error) throw error;

//		response.send(result);
//	});
//});


module.exports = router;