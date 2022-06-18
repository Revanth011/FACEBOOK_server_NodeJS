const mongoose = require("mongoose");
(function () {
  mongoose
    .connect(process.env.MDB)
    .then(() => console.log("MDB Connected"))
    .catch((err) => console.log(err));
})();
