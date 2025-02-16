import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Items from './itemController';
const app = express();
var item = new Items();
app.use(cors());   //Allow for frontend usage
app.use(bodyParser.json());   //Allow to receive JSON object

app.get("/", (req,res)=>{
    console.log("GET from server");
    res.status(200).send("GET from server");
})



app.get("/items", (req,res)=>{
    console.log("Getting items");
    try{
        var result = item.getAllItems();
        res.status(200).send(result);
    }
    catch(err){
        console.log("Can not get all items");
        res.status(400).send("Can not get all items");
    }
    
})

app.get("/items/:criteria/:detail", (req,res)=>{
    console.log("Getting items based on search");
    try{
        const result = item.getItemsBasedOnCriteria({criteria: req.params.criteria, detail: req.params.detail});
        res.status(200).send(result);
    }
    catch(err){
        console.log("Can not get items");
        res.status(500).send(`Can not get items based on this criteria ${req.params.criteria} and details: ${req.params.detail}`);
    }
  
})

app.post("/items", async (req,res)=>{
    console.log(req.body);
    try{
        await item.insertItem(req.body);
        res.status(201).send("Successfully created");
    }
    catch(err){
        console.log(err);
        res.status(409).send(err);
    }
    
})

app.put("/items/:itemID", (req,res)=>{
    console.log("Update item");
    try{
        const result = item.UpdateItem(req.body);
        res.status(204).send(result);
    }
    catch(err){
        console.log(err);
        res.status(409).send(err);
    }
    
})

app.delete("/items/:itemID", (req,res)=>{
    console.log("Deleting item: "+req.params.itemID);
    try{
        
            const result = item.DeleteItem(Number(req.params.itemID));
            res.status(204).send(result);
        
           
    }
    catch(err){
        console.log(err);
        res.status(409).send(err);
    }
})
app.listen(8080, ()=>{
    console.log("Server listening in port: 8080");
});