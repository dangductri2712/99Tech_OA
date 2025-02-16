"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const itemController_1 = __importDefault(require("./itemController"));
const app = (0, express_1.default)();
var item = new itemController_1.default();
app.use((0, cors_1.default)()); //Allow for frontend usage
app.use(body_parser_1.default.json()); //Allow to receive JSON object
app.get("/", (req, res) => {
    console.log("GET from server");
    res.status(200).send("GET from server");
});
app.get("/items", (req, res) => {
    console.log("Getting items");
    try {
        var result = item.getAllItems();
        res.status(200).send(result);
    }
    catch (err) {
        console.log("Can not get all items");
        res.status(400).send("Can not get all items");
    }
});
app.get("/items/:criteria/:detail", (req, res) => {
    console.log("Getting items based on search");
    try {
        const result = item.getItemsBasedOnCriteria({ criteria: req.params.criteria, detail: req.params.detail });
        res.status(200).send(result);
    }
    catch (err) {
        console.log("Can not get items");
        res.status(500).send(`Can not get items based on this criteria ${req.params.criteria} and details: ${req.params.detail}`);
    }
});
app.post("/items", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    try {
        yield item.insertItem(req.body);
        res.status(201).send("Successfully created");
    }
    catch (err) {
        console.log(err);
        res.status(409).send(err);
    }
}));
app.put("/items/:itemID", (req, res) => {
    console.log("Update item");
    try {
        const result = item.UpdateItem(req.body);
        res.status(204).send(result);
    }
    catch (err) {
        console.log(err);
        res.status(409).send(err);
    }
});
app.delete("/items/:itemID", (req, res) => {
    console.log("Deleting item: " + req.params.itemID);
    try {
        const result = item.DeleteItem(Number(req.params.itemID));
        res.status(204).send(result);
    }
    catch (err) {
        console.log(err);
        res.status(409).send(err);
    }
});
app.listen(8080, () => {
    console.log("Server listening in port: 8080");
});
