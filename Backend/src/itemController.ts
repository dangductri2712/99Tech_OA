
//use fs module to read and insert new items into db.json (the easy db)
interface ItemPrompt{
    name: String,
    description: String
    itemID: number
}

interface CriteriaPrompt{
    criteria: String,
    detail: String
}
class Items{
    private fs = require('fs');
    private items: ItemPrompt[];

    public constructor (){
        this.items =  JSON.parse(this.fs.readFileSync("dist/db.json"));
    }

    // public constructor(items: Object[]){
    //     this.items = items;
    // }

    public getAllItems(): Object[] {
        console.log(this.items);
        return this.items;  
    } 

    public getItemsBasedOnCriteria(criteriaBody:CriteriaPrompt): ItemPrompt[]{
        var result: ItemPrompt[] = [];
        console.log("Getting items based on criteria in itemsController.js");
        for(var i=0; i< this.items.length; i++){
            if( criteriaBody.criteria == "name"  && this.items[i].name == criteriaBody.detail ){
                result.push(this.items[i]);
            }
            else if(criteriaBody.criteria == "description" && this.items[i].description == criteriaBody.detail){
                result.push(this.items[i]);
            }
        }
        return result;
    }
    public insertItem(body: ItemPrompt){
        this.items.push(body);
        var newData = JSON.stringify(this.items);
        try{
            this.fs.writeFile('dist/db.json', newData, function(err: any){
                if(err){
                    console.error(err);
                }
                console.log("Inserted file successfully to db.json")
            })

        }
        catch(err){
            console.log(err);
        }

    }

    public UpdateItem(body: ItemPrompt){
        var newContent: ItemPrompt[] = [];
        for(var i=0; i< this.items.length; i++){
            if(this.items[i].itemID == body.itemID){
                newContent = this.items;
                newContent[i] = {
                    itemID: body.itemID,
                    name: body.name,
                    description: body.description                    
                }
                console.log(newContent);
                this.fs.writeFile('dist/db.json', JSON.stringify(newContent), function(err: any){
                    if(err){
                        console.error(err);
                    }
                    console.log("Inserted file successfully to db.json")
                })
                break;
            }
        }
        return newContent;
    }

    public DeleteItem(itemID: number){
        var newContent: ItemPrompt[] = [];
        for(var i=0; i< this.items.length; i++){
            if(this.items[i].itemID == itemID){
                newContent = this.items;

                var removedArr = newContent.splice(i, 1);
                this.items = newContent;
                this.fs.writeFile('dist/db.json', JSON.stringify(newContent), function(err: any){
                    if(err){
                        console.error(err);
                    }
                    console.log("Deleted item successfully to db.json")
                })
                break;
            }
        }
        return newContent;
    }
}

export default Items;