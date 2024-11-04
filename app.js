
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
// const user = require("./src/models/user");

// const loginRouter = require("./src/routers/login");

const signInRouter = require("./src/routers/signIn");
const homeRouter = require("./src/routers/home");
// const userRouter = require("./src/routers/userRouter");
const categoriesRouter = require("./src/routers/categories");
// const orderRouter = require("./src/routers/order");
const productRouter = require("./src/routers/products");
 const userApi = require("./src/api/userApi");
 const productsApi = require("./src/api/productApi");
 const categoryProductApi = require("./src/api/categoryProductApi");
 const categoryServiceApi = require("./src/api/categoryServiceApi")
 const serviceApi = require("./src/api/serviceApi")
// const favoritesApi = require("./src/api/favoriteApi");
// const AddressApi = require("./src/api/addressApi");
// const imageApi = require("./src/api/imageApi");
// const cartApi = require("./src/api/cartApi");
// const orderApi = require("./src/api/orderApi");
const path = require("path");

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use("/", loginRouter);
// app.use("/", userRouter);
app.use("/", signInRouter);
// app.use("/", loginRouter);
app.use("/", homeRouter);
app.use("/", categoriesRouter);
app.use("/", productRouter);
// app.use("/", orderRouter);
 app.use("/", userApi);
// app.use("/", AddressApi);
 app.use("/", categoryProductApi);
 app.use("/", categoryServiceApi);
 app.use("/", productsApi);
 app.use("/", serviceApi)
// app.use("/", imageApi);
// app.use("/", favoritesApi);
// app.use("/", cartApi);
// app.use("/", orderApi);

const PORT = 3030;
const uri =
  "mongodb+srv://leducdung02072004:g4H7FdXialfs66Cn@beebarber.ynx9m.mongodb.net/BeeBarber?retryWrites=true&w=majority&appName=BeeBarber";

// const registrationToken =
//   "eg9lMD6RTVC0DCFxXoRP7p:APA91bFHmDd-eYkvG0Ea1yR6rTLYba2FW8XqIKYEOX1PekB3r5nopDfJUMWdA-O8nD9rVPTnwoAEeLAf0UhD4DMVezcBLfNGqudsteLBSWaRNRA7jcqDTLC2xiOZMFC5dKHeLthJW2rn"; // replace with the actual device token

// const message = {
//   data: {
//     key1: "hihi",
//     key2: "haha",
//   },
//   token: registrationToken,
// };

// admin
//   .messaging()
//   .send(message)
//   .then((response) => {
//     console.log("Successfully sent message:", response);
//   })
//   .catch((error) => {
//     console.error("Error sending message:", error);
//   });

// app.get("/", (req, res) => {
//   res.redirect("/signIn");
// });

app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);
  await mongoose.connect(uri).then(console.log("connect mongoDb thanh cong"));
});
