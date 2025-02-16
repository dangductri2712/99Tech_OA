"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Items {
    constructor() {
        this.fs = require('fs');
        this.items = JSON.parse(this.fs.readFileSync("dist/db.json"));
    }
    // public constructor(items: Object[]){
    //     this.items = items;
    // }
    getAllItems() {
        console.log(this.items);
        return this.items;
    }
    getItemsBasedOnCriteria(criteriaBody) {
        var result = [];
        console.log("Getting items based on criteria in itemsController.js");
        for (var i = 0; i < this.items.length; i++) {
            if (criteriaBody.criteria == "name" && this.items[i].name == criteriaBody.detail) {
                result.push(this.items[i]);
            }
            else if (criteriaBody.criteria == "description" && this.items[i].description == criteriaBody.detail) {
                result.push(this.items[i]);
            }
        }
        return result;
    }
    insertItem(body) {
        this.items.push(body);
        var newData = JSON.stringify(this.items);
        try {
            this.fs.writeFile('dist/db.json', newData, function (err) {
                if (err) {
                    console.error(err);
                }
                console.log("Inserted file successfully to db.json");
            });
        }
        catch (err) {
            console.log(err);
        }
    }
    UpdateItem(body) {
        var newContent = [];
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].itemID == body.itemID) {
                newContent = this.items;
                newContent[i] = {
                    itemID: body.itemID,
                    name: body.name,
                    description: body.description
                };
                console.log(newContent);
                this.fs.writeFile('dist/db.json', JSON.stringify(newContent), function (err) {
                    if (err) {
                        console.error(err);
                    }
                    console.log("Inserted file successfully to db.json");
                });
                break;
            }
        }
        return newContent;
    }
    DeleteItem(itemID) {
        var newContent = [];
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].itemID == itemID) {
                newContent = this.items;
                var removedArr = newContent.splice(i, 1);
                this.items = newContent;
                this.fs.writeFile('dist/db.json', JSON.stringify(newContent), function (err) {
                    if (err) {
                        console.error(err);
                    }
                    console.log("Deleted item successfully to db.json");
                });
                break;
            }
        }
        return newContent;
    }
}
exports.default = Items;
