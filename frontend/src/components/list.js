import React, {useState} from 'react'
import {InputGroup, Button, FormControl, Table} from 'react-bootstrap'
import Notification from './notification'
import banner from '../assets/banner.jpg'
import listsService from '../services/lists'
import { useParams, useHistory } from "react-router-dom";

const List = () => {
  
  const [newItem, setNewitem] = useState("");
  const [itemList, setItemList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorType, setErrorType] = useState(true);
  const [lists, setLists] = useState([]);
  const [newList, setNewList] = useState("");
  const history = useHistory();

  let id = useParams().id
  if(newList === ""){
    setNewList(id)
  }


  const renderList = () => {
    let list = itemList;
     return(
       <div>
         <Table striped bordered hover>
           <tbody>
             {list.map(item => <tr key={item}><td>{item}</td></tr>)}
           </tbody>
         </Table>
       </div>
     )
  }

  const addItem = () => {
    let list = itemList;
    if(!list.includes(newItem)){
      list.push(newItem)
      setItemList(list)
      setNewitem("")
    }else{
      setErrorType(true)
      setErrorMessage("Listasta löytyi jo tuote " + newItem)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNewitem("")
    }
  }

  const handleItemChange = (event) => {
    setNewitem(event.target.value)
  }

  const saveList = (event) => {
    event.preventDefault()
    const listObject = {
      content: itemList,
      id: newList
    }
    console.log("king", listObject)
    listsService
           .create(listObject)
           .then(returnedList => {
           setLists(lists.concat(returnedList))
           })
  }

  const goHome = () => {
    history.push(`/`)
  }

  return(
    <div className="wrapper">
    <img src={banner} alt="Banner" onClick={goHome} />
    <Notification message={errorMessage} errorType={errorType}/>
    <div className="div">
    <h1>Listan koodi on: {newList}</h1>
      <InputGroup className="mb-3">
        <FormControl onChange={handleItemChange} aria-describedby="basic-addon1" value={newItem}/>
        <InputGroup.Prepend>
          <Button onClick={addItem} variant="outline-secondary">Lisää tuote</Button>
          <Button onClick={saveList} variant="outline-secondary">Tallenna lista</Button>
        </InputGroup.Prepend>
      </InputGroup>
      <div className="listDiv">
        {renderList()}
      </div>
    </div>
  </div>
  )
}

export default List