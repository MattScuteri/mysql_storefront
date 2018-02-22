const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'root',
	database: 'bamazonDB'
});

connection.connect(function(err) {
	if (err) throw err;
	console.log("connected to id " + connection.threadId + "\n");

	showProducts();
});

function showProducts() {
	console.log("Available products: ");
	connection.query("SELECT * FROM products", function(err, result) {
		if (err) throw err;

		// console.log(result)

		const availableProducts = JSON.parse(result);

		console.log("ID: " + availableProducts.RowDataPacket.item_id);
		console.log("Product: " + availableProducts.RowDataPacket.product_name);
		console.log("Price: " + availableProducts.RowDataPacket.price);
		// Display IDs, names, prices
		connection.end();
	})
}