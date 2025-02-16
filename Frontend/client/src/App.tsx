// import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import * as React  from 'react';
import { useState, useEffect} from 'react';
const domain = "http://localhost:8080/";
interface ItemsPrompt{
  name: String,
  description: String,
  itemID: number
}

function getGreatestID(reqItem: ItemsPrompt[]): number{
  var greatest = 0;
  
  if(reqItem.length >0){
    for(var i=0; i< reqItem.length; i++){
      console.log(reqItem[i]);
      console.log(reqItem[i].itemID);
      if(reqItem[i].itemID >= greatest ){
        
        greatest = reqItem[i].itemID;
      }
    }
  }
  console.log("The greatest ID is: "+ greatest);
  return greatest;
}
function App() {
  
  /* 
  List items
  List items with basic filter
  delete items
  update items
  insert items
  */
  
  const [items, setItems] = useState<ItemsPrompt[]>([]);
  const [openUpdateForm, setOpenUpdateForm] =useState(false);
  const [updateID, setUpdateID] = useState<number>(0);
  const getItems = async ()=>{
    // var result: any = [];
    await axios.get(`${domain}items`)
    .then(res=>{
        // result = res.data;
        // console.log(result);
        //var result = res.data;
        setItems(res.data);

    })
    .catch(err=>{
      console.log(err);
      alert("having trouble getting the items");
    })
  }
  useEffect(()=>{
      getItems();
  }, [])

  function handleOpenUpdateForm(e: React.MouseEvent<HTMLButtonElement>){
    
    const button = e.target as HTMLButtonElement;
    setUpdateID(Number(button.id));
    alert("Opening updateForm with ID: "+ Number(button.id));
    setOpenUpdateForm(true);
  }

  const handleCloseUpdateForm = ()=>{
    setOpenUpdateForm(false);
  }
  return (
    <div>
      <div>
        <h3>Search Items</h3>
      <SearchForm setItems = {setItems}></SearchForm>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>    
        </thead>
        <tbody>
        {
      items.length > 0?
      items.map(item=>{
        return(
          <>
              <tr>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>
              <button id = {item.itemID.toString()} onClick = {function (e: React.MouseEvent<HTMLButtonElement>){
    
                  const button = e.target as HTMLButtonElement;
                  setUpdateID(Number(button.id));
                  alert("Opening updateForm with ID: "+ Number(button.id));
                  setOpenUpdateForm(true);
                }}>
                Update
              </button>
              <button onClick = {async function(){
                  await axios.delete(`${domain}items/${item.itemID.toString()}`)
                  .then(res=>{  
                    console.log("Delete successfully");
                    alert("Delete successfully");
                  })
                  .catch(err=>{
                    console.log(err);
                    alert("Unable to delete this item");
                  })
              }}>Delete</button>
            </td>
          </tr>
          </>
        )   
      })
      :
      <li>Nothing in db yet</li>
    }
        </tbody>
    </table>
      </div>
    <div>
        <h3>Insert items</h3>
        <InsertForm items = {items}></InsertForm>
    </div>

    {
      openUpdateForm == true?
      <>
        <UpdateForm itemID = {updateID}></UpdateForm>
        <button onClick = {()=>{
          handleCloseUpdateForm()
        }}>Close updateForm</button>
      </>
      
      :
      <></>
    }
    </div>
  );
}


interface InsertFormProps{
  items: ItemsPrompt[];
}
const InsertForm: React.FC<InsertFormProps> = ({items})=>{
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.name == "name"){
      setName(e.target.value);
    }
    else{
      setDescription(e.target.value);
    }
  }
  //EventTarget is the base for all that can receives an event, like the HTMLInputElement. So e should be an EventTarget type so ts knows
  return(
    <form onSubmit = {async function(e: React.ChangeEvent<EventTarget>){
      console.log("Sending new item");
      e.preventDefault();
        const postBody = {
          name: name,
          description: description,
          itemID: getGreatestID(items)+1
        }
  
        await axios.post(`${domain}items`, postBody)
        .then(res=>{
          console.log(res.data);
          alert("Inserted new item successfully");
        })
        .catch(err=>{
          console.log(err);
        })
    }}
    >
    <h5>Name: </h5>
    <input type = "text" name = "name" value = {name} onChange = {handleChange}></input>
    <h5>Description</h5>
    <input type = "text" name = "description" value = {description} onChange = {handleChange}></input>
    <button type = "submit">Submit</button>
    </form>

  )
}

interface SearchFormPrompt{
  setItems: React.Dispatch<React.SetStateAction<ItemsPrompt[]>>
}
const SearchForm: React.FC<SearchFormPrompt> = ({setItems})=>{
  const [criteria, setCriteria] = useState("");
  const [detail, setDetail] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    if(e.target.name == "criteria"){
      setCriteria(e.target.value);
    }
    else if(e.target.name == "detail"){
      setDetail(e.target.value);
    }
  }
  return(
    <form onSubmit = {async function(e: React.ChangeEvent<EventTarget>){
      e.preventDefault();
      var path: String = "";
      if(criteria == "" && detail == ""){
        path = "items";
      }
      else{
        path = `items/${criteria}/${detail}`;
      }

      await axios.get(`${domain}${path}`)
      .then(res=>{
        console.log(res);
        setItems(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
    }}>
        <h5>Please enter either "name" or "description"</h5>
        <input type = "text" name = "criteria" value = {criteria} onChange = {handleChange} ></input>
        <h5>Please enter the detail for the criteria</h5>
        <input type = "text" name = "detail" value = {detail} onChange = {handleChange}></input>
        <button type = "submit">Submit</button>
    </form>
  )
}
interface UpdateFormPrompt{
  itemID: number
}
const UpdateForm: React.FC<UpdateFormPrompt> = ({itemID})=>{
  console.log(itemID);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
      if(e.target.name == "name"){
        setNewName(e.target.value);
      }
      else{
        setNewDescription(e.target.value);
      }
  }

  // const handleSubmit = async (e: React.ChangeEvent<HTMLInputElement>)=>{
  //   e.preventDefault();
  //             const button = e.target as HTMLButtonElement;
  //             var id = button.id;
  //             var putBody = {
  //               itemID: id,
  //               name: newName,
  //               description: newDescription
  //             };
  //             await axios.put(`items/${itemID}`, )
  //             .then(res=>{
  //               console.log(res);
  //             })
  //             .catch(err=>{
  //               console.log(err);
  //               console.log("Can not update item with ID: "+ id);
  //             })
  // }
  return(
      <>
        <h3>Update Item {itemID}</h3>
        <form onSubmit = {async function(e: React.ChangeEvent<EventTarget>){
              e.preventDefault();
              // const button = e.target as HTMLButtonElement;
              // var id = button.id;
              var putBody = {
                itemID: itemID,
                name: newName,
                description: newDescription
              };
              await axios.put(`${domain}items/${itemID}`,putBody )
              .then(res=>{
                console.log(res);
                alert("Successfully modify item: "+itemID);
              })
              .catch(err=>{
                console.log(err);
                alert("Can not update item with ID: "+ itemID);
                
              })
  }}>
          <h5>Name</h5>
                <input name = "name" type = "text" value = {newName} onChange = {handleChange}></input>
                <h5>Design</h5>
                <input name = "description" type = "text" value = {newDescription} onChange = {handleChange}></input>
                <button type = "submit">Submit</button>
      </form>
      </>
      
  )
}
export default App;
