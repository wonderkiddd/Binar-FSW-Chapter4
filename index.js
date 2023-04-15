// import atau panggil package2 yg kita mau pakai di aplikasi kita
const express = require("express");
const path = require("path");
const { Op } = require('sequelize')

// manggil models/table disini
const { productcars } = require("./models");

const imagekit = require('./lib/imagekit');
const upload = require('./middleware/uploader');

// framework express = framework utk http server
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting view engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// lihat semua produk dari database
app.get("/", async (req, res) => {
  // get data dari database pake sequelize method findAll


  let cars;

  console.log(req.params)
  console.log(req.query)

  if (req.query.filter) {
    cars = await productcars.findAll({
      where: {
        size: {
          [Op.substring]: req.query.filter
        }
      },
      order: [['id', 'ASC']]
    });
  } else {
    // get data dari database pake sequelize method findAll
    cars = await productcars.findAll({
      order: [['price', 'DESC']]
    });
  }

  res.render("crud/index", {
    cars,
  });
});

// render page create cars
app.get("/cars/create", (req, res) => {
  res.render("crud/create");
});



// create car baru
app.post("/cars", upload.single('image'), async (req, res) => {
  // request body => req.body.name
  const { name, price, size } = req.body;
  const file = req.file

  // console.log('file foto', file)

  const split = file.originalname.split('.');
  const ext = split[split.length - 1];

  const img = await imagekit.upload({
    file: file.buffer,
    fileName: `IMG-${Date.now()}.${ext}`
  })

  await productcars.create({
    name,
    price,
    size: req.body.size,
    pict: img.url
  })

  // response redirect page
  res.redirect("/")
});

// render page edit cars
app.get("/cars/edit/:id", async (req, res) => {
  // detail product sesuai id yg di params
  const data = await productcars.findByPk(req.params.id);
  const productcarsDetail = data.dataValues;
  res.render("crud/update", {
    productcarsDetail,
    sizeOptions: ["small", "medium", "large"],
  });
});

// update cars
app.post("/cars/edit/:id", (req, res) => {
  // req.params.id

  const { name, price, size } = req.body;
  const id = req.params.id;

  // proses insert atau create data yg dari request body ke DB/tabel
  // pakai sequelize method create utk proses data baru ke table/model nya
  productcars.update(
    {
      name,
      price,
      size,
      size: req.body.size,
    },
    {
      where: {
        id,
      },
    }
  );

  // response redirect page
  res.redirect("/");
});

// delete produk
app.get("/cars/delete/:id", async (req, res) => {
  const id = req.params.id;
  productcars.destroy({
    where: {
      id,
    },
  })
  res.redirect('/');


});

app.listen(PORT, () => {
  console.log(`App Running on localhost: ${PORT}`);
});
