const app = require("./app");
const { MONGO_URL, PORT = 3000 } = process.env;

const mongoose = require("mongoose");

mongoose
  .set("strictQuery", false)
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT);
    console.log(`Server run on port ${PORT}`);
  })

  .catch((error) => {
    console.log(error.messege);
    process.exit(1);
  });
