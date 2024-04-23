var express = require("express")
var Sequelize = require("sequelize")
var app = express()

app.use(express.json())

const sequelize_Diseases = new Sequelize("database","username","password",{
    host: "localhost",
    dialect:"sqlite",
    storage: "./Database/SQLDiseasesData.sqlite",
})
const Diseases = sequelize_Diseases.define("disease",{
    Disease_ID:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    Disease_Name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    Disease_Details:{
        type: Sequelize.STRING,
        allowNull: false,
    },
})
sequelize_Diseases.sync()

app.get("/Diseases",(req,res) =>{
    Diseases.findAll().then((diseases) =>{
        res.json(diseases)
    }).catch((err) =>{
        res.status(500).send(err)    
    })
})

app.get("/Diseases/Disease_ID",(req,res) =>{
    Diseases.findByPk(req.params.Disease_ID)
    .then((diseases) =>{
        if (!diseases){
            res.status(404).send("Disease not found")
        } else {
            res.json(diseases)
        }
    }).catch((err) =>{
        res.status(500).send(err)
    })
})

app.post("/Diseases",(req,res) =>{
    Diseases.create(req.body)
    .then((diseases)=>{
        res.send(diseases)
    }).catch((err) =>{
        res.status(500).send(err)
    })
})

app.put("/Diseases/:Disease_ID", (req, res) => {

    Diseases.findByPk(req.params.Disease_ID)
        .then((diseases) => {
            if (!diseases) {
                res.status.send("Disease not found");
            } else {
                diseases
                    .update(req.body)
                    .then(() => {
                        res.send(diseases);
                    })
                    .catch((err) => {
                        res.status(500).send(err);
                    });
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        })
})
app.delete("/Diseases/:Disease_ID", (req, res) => {
    Diseases.findByPk(req.params.Disease_ID)
      .then((disease) => {
        if (!disease) {
          res.status(404).send("Disease not found");
        } else {
          MedicalHistory.destroy({
            where: {
              Disease_ID: req.params.Disease_ID
            }
          }).then(() => {
            disease.destroy().then(() => {
              res.send({});
            }).catch((err) => {
              res.status(500).send(err);
            });
          }).catch((err) => {
            res.status(500).send(err);
          });
        }
      }).catch((err) => {
        res.status(500).send(err);
      });
  });


const port = process.env.PORT || 5000;
app.listen(port,() => console.log (`Now The Server is listening on port ${port}`));