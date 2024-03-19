const express = require("express");
const cors = require("cors");
const { restaurant_router } = require("./routers/restaurant.router");
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger_output.json');

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


app.use(`/restaurants`, restaurant_router);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on port:${PORT}`);
});