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
async function add_book(код_книги, количество_книг) {
	var sql_text = `insert into Корзина_книга(код_книги, количество_книг) values(@код_книги, @количество_книг)`;

	var connection = new sql.ConnectionPool({
		database: 'Book_Shop',
		server: 'DESKTOP-QJ276O0\SQLEXPRESS',
		driver: 'msnodesqlv8',
		options: { trustedConnection: true }

	});

	await connection.connect();

	var q_req = new sql.Request(connection);
	var arr_tasks = await q_req
		.input("код книги", sql.Int,код_книги)
		.input("количество книг", sql.Int, priority)
		.query(sql_text);

}

async function set_book_for_k(код_книги, количество_книг) {
	var sql_text = `update Корзина_книга set количество_книг=@количество_книг where код_книги=@код_книги`;

	var connection = new sql.ConnectionPool({
		database: 'Book_Shop',
		server: 'DESKTOP-QJ276O0\SQLEXPRESS',
		driver: 'msnodesqlv8',
		options: { trustedConnection: true }

	});

	await connection.connect();

	var q_req = new sql.Request(connection);
	var arr_tasks = await q_req
		.input("код книги", sql.Int, код_книги)
		.input("количество книг", sql.Int, количество_книг)
		.query(sql_text);

}


async function delete_book(код_книги) {
	var sql_text = `delete from Корзина_книга where код_книги = @код_книги`;

	var connection = new sql.ConnectionPool({
		database: 'Book_Shop',
		server: 'DESKTOP-QJ276O0\SQLEXPRESS',
		driver: 'msnodesqlv8',
		options: { trustedConnection: true }

	});

	await connection.connect();

	var q_req = new sql.Request(connection);
	var arr_tasks = await q_req
		.input("код книги", sql.Int, код_книги)
		.query(sql_text);

}

async function find_book(код_книги) {
	var sql_text = `select название, цена from Книга
    where код_книги= @код_книги`;

	var connection = new sql.ConnectionPool({
		database: 'Book_Shop',
		server: 'DESKTOP-QJ276O0\SQLEXPRESS',
		driver: 'msnodesqlv8',
		options: { trustedConnection: true }

	});

	await connection.connect();

	var q_req = new sql.Request(connection);
	var arr_tasks = await q_req.input('код_книги', sql.Int, код_книги).query(sql_text);

	return arr_tasks.recordset;
}
// получить все задачи из базы данных
async function get_all_data() {
	var sql_text = `select название, цена, количество_просмотров_книги from Книга
    order by название`;

	var connection = new sql.ConnectionPool({
		database: 'Book_Shop',
		server: 'DESKTOP-QJ276O0\SQLEXPRESS',
		driver: 'msnodesqlv8',
		options: { trustedConnection: true }

	});

	await connection.connect();

	var q_req = new sql.Request(connection);
	var arr_tasks = await q_req.query(sql_text);

	return arr_tasks.recordset;
}
module.exports = router;