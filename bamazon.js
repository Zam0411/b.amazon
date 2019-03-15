var mysql = require("mysql");
var inquirer = require("inquirer");


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "1234",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  productsList();
});

function productsList() {
  connection.query("SELECT * FROM products", function (err, data) {
    if (err) {
      console.error("error executing sql query: " + err.stack);
      return;
    }

    data.forEach(products => {
      console.table(`${products.item_id} - ${products.product_name}, PRICE: $${products.price}`);
    });

    // calling function to display options for making a purchase
    start();
  });
}



function start() {
  inquirer
    .prompt([
      {
        name: "items",
        type: "input",
        message: "What is the ID of the item you would like to purchase?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          console.log(" <----This is NOT a valid ID number! Please try again.")
          return false;
        }
      },
      {
        name: "inStock",
        type: "input",
        message: "How many of this item would you like to purchase?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          console.log(" <----This is NOT a valid number! Please try again.")
          return false;
        }
      }
    ])
    .then(function (answer) {
      var item = answer.items;
      var quantity = answer.inStock;

      connection.query("SELECT * FROM products WHERE ?", { item_id: item }, function (error, response) {
        if (error) throw error;


        else {
          var productData = response[0];

          if (productData.stock_quantity === 0) {
            console.log("We are very sorry there are currently none in stock. Please try again at a later time.");
            return start() ;
          }

          if (quantity <= productData.stock_quantity) {
            console.log("Your item is in stock. Your order has been placed!");

            connection.query("UPDATE products SET stock_quantity = " + (productData.stock_quantity - quantity) + " WHERE item_id = " + item, function (error, response) {
              if (error) throw error;

              console.log("Your total is $" + productData.price * quantity);
              start();
            })

          } else {
            console.log("There are only " + productData.stock_quantity + " left of this product. Purchase a lower amount or wait until we restock more.");
            start();

          }

        }

      })
    })

}

