const express = require("express");
const cors = require("cors");
const data = require("./restaraunts.json");
const fs = require("fs"); //File system so we can manipulate JSON file and store it again

const app = express();

const PORT = 4000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => console.log(`Our API is running on port: ${PORT}`));

const handleWriteFile = () => {
  const dataJson = JSON.stringify(data); //convert back to JSON
  fs.writeFile("restaraunts.json", dataJson, (err) => console.error(err));
};

//get all items (restaraunts) from JSON
app.get("/all-restaraunts", (req, res) => res.send(data));

//add new restaraunt
app.post("/add-restaraunt", (req, res) => {
  // console.log('this is body', req.body)
  data.push(req.body); //add new restaraunt to array
  handleWriteFile();
  res.send(data); //Send all restaraunts
});

//find and update a restaraunt
app.patch("/update-restaraunt", (req, res) => {
  //find file to update
  console.log(req.query);
  const { name } = req.query;
  console.log("This is: ", name);
  const itemFound = data.find((eachRestaraunt) => eachRestaraunt.name === name);
  const indexOfItem = data.indexOf(itemFound); //getting index of item found
  data[indexOfItem] = req.body; //overwriting the item with req.body

  console.log("This is item found: ", itemFound);

  handleWriteFile();
  res.send(data);
});

//find and delete a restaraunt
