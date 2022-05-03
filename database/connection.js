const mongoose = require('mongoose');
var colors = require('colors');

mongoose.connect("mongodb://localhost:27017/testdb", {
    useNewUrlParser: true,
})

mongoose.connection.on("error", err => {
  console.log("err", err)
})

mongoose.connection.on("connected", (err, res) => {
    console.log('mongoose is connected'.blue);
})