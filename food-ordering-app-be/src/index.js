const express = require("express");
const cors = require("cors");
const { restaurant_router } = require("./routers/restaurant.router");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


app.use(`/restaurants`, restaurant_router);


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}`);
});