require("dotenv").config();

const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");
const warehouseRoute = require("./routes/warehouse.js");
const inventoryRoute = require("./routes/inventory.js");

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use("/warehouse", warehouseRoute);
app.use("/inventory", inventoryRoute);

app.listen(PORT);
