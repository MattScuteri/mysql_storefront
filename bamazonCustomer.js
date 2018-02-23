const mysql = require('mysql');
const inquirer = require('inquirer');

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

	promptUser();
});

function showProducts() {
	console.log("Available products: ");
	connection.query("SELECT * FROM products", function(err, result) {
		if (err) throw err;

		//wrap in or each ad console log each item
		result.forEach(function(result) {
			console.log("---------------------------------")
			console.log("Product: " + result.product_name);			
			console.log("ID: " + result.item_id);
			console.log("Price: " + result.price);
			console.log("---------------------------------")			
		});
		// Display IDs, names, prices
	})
}

function promptUser() {
	inquirer.prompt([{
		name: "itemId",
		message: "Please enter the ID of the item you wish to buy",
		type: "input"
	}]).then(function(response) {
		
	})
}