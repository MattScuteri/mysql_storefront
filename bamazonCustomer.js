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
});

function showProducts() {
	console.log("Available products: ");
	connection.query("SELECT * FROM products", function(err, result) {
		if (err) throw err;

		//wrap in or each ad console log each item
		// console.log(result);

		result.forEach(function(result) {
			console.log("---------------------------------")
			console.log("Product: " + result.product_name);			
			console.log("ID: " + result.item_id);
			console.log("Price: " + result.price);
			console.log("---------------------------------")			
		});
		// Display IDs, names, prices
		promptUser();
	})
}

function promptUser() {
	inquirer.prompt([{
		name: "itemId",
		message: "Please enter the ID of the item you wish to buy",
		type: "input"
	}, {
		name: "itemQuantity",
		message: "How many would you like to buy?",
		type: "input"
	}]).then(function(response) {
		console.log(response)

		let parsedResponse = JSON.parse(response);

		console.log(parsedResponse);

		const query = "UPDATE products SET stock_quantity = stock_quantity - " + parsedResponse.itemQuantity + " WHERE item_id = " + parsedResponse.itemId;

		connection.query(query, function(err, result) {

		if (err) throw err;

		if (response.itemId[1] != result.item_id) {
			console.log("Item not found!");
		};

		if (response.itemQuantity[1] <= result.stock_quantity) {
			result.stock_quantity = result.stock_quantity - itemQuantity;
			console.log("Order placed! Enjoy your food");
		} else if (itemQuantity > result.stock_quantity) {
			console.log("Insufficient quantity!");
		}
		connection.end();
		})
	})
}