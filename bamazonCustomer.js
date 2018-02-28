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
 			console.log(result)

 			for (let i = 0; i < result.length; i++) {
 				if (response.itemId != result[i].item_id) {
 					console.log("Item not found!");

 				} else if (response.itemQuantity <= result[i].stock_quantity) {

	 				let stockUpdate = result[i].stock_quantity - parseInt(response.itemQuantity);
 					const query = "UPDATE products SET stock_quantity=? WHERE item_id=?"

 					connection.query(query, [stockUpdate, parseInt(response.itemId)], function(err, result) {

 						if (err) throw err;
 						console.log("Order placed! Enjoy your food");
 					})

 				} else if (response.itemQuantity > result[i].stock_quantity) {
 					console.log("Insufficient quantity!");
 				}
 			}

 			connection.end();
 		
 			})
 		})
}