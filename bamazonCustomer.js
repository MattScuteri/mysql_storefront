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
		inquirer.prompt([{
			name: "itemId",
 			message: "Please enter the ID of the item you wish to buy",
 			type: "input"
 		}, {
 			name: "itemQuantity",
 			message: "How many would you like to buy?",
 			type: "input"
 		}]).then(function(response) {

 			if (response.itemId != result[1].item_id) {
 				console.log("Item not found!");
 			} else if (response.itemQuantity <= result.stock_quantity) {

	 			let stockUpdate;
 				result.stock_quantity = result.stock_quantity - response.itemQuantity;
 			
 				const query = "UPDATE products SET stock_quantity ? WHERE item_id ?"

 				connection.query(query, [{stockUpdate: response.itemQuantity}], function(err, result) {

 					if (err) throw err;
 					console.log("Order placed! Enjoy your food");
 				})

 			} else if (response.itemQuantity > result.stock_quantity) {
 				console.log("Insufficient quantity!");
 			}

 			connection.end();
 		
 			})
 		})
}

// function promptUser() {
// 	inquirer.prompt([{
// 		name: "itemId",
// 		message: "Please enter the ID of the item you wish to buy",
// 		type: "input"
// 	}, {
// 		name: "itemQuantity",
// 		message: "How many would you like to buy?",
// 		type: "input"
// 	}]).then(function(response) {

// 		if (response.itemId != result.item_id) {
// 			console.log("Item not found!");
// 		};

// 		if (response.itemQuantity <= result.stock_quantity) {
// 			result.stock_quantity = result.stock_quantity - itemQuantity;
// 			console.log("Order placed! Enjoy your food");
// 		} else if (itemQuantity > result.stock_quantity) {
// 			console.log("Insufficient quantity!");
// 		}


// 		const query = "UPDATE products SET stock_quantity ? WHERE item_id ?"
// 		//store new data in variable and add to brackets in connection.query as in greatBay example

// 		connection.query(query, [response.itemId], function(err, result) {

// 		if (err) throw err;

// 		connection.end();
// 		})
// 	})
// }