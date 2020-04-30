import React, {useState, useEffect} from 'react'
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

  useEffect(() => {
    listsService
      .getAll()
      .then(initialLists => {
        setLists(initialLists)
      })
  }, [])

  let code = useParams().code
  if(newList === ""){
    setNewList(code)
  }

  const deleteItem = (item) => {

    
    let list = lists.find(el => el.code = newList);

    let templist = list.content;
    let index = templist.indexOf(item);
    templist.splice(index, 1)
    setItemList(templist)

    listsService
    .update(newList, templist)
  }


  const renderList = () => {
    let list = lists.find(el => el.code = newList);
    console.log("kaikki listat", lists)

    //console.log(lists, list)

    if(list){
      let content = list.content
      return(
        <div>
          <Table striped bordered hover>
            <tbody>
              {content.map(item => <tr key={item}><td onClick={() => deleteItem(item)}>X</td><td>{item}</td></tr>)}
            </tbody>
          </Table>
        </div>
      )
    }else{
      return(
        <div>
        </div>
      )
    }
  }

  const addItem = () => {
    let list = lists.find(el => el.code = newList);
    let templist

    if(list.content === undefined){
      templist = []
    }else{
      templist = list.content;
    }

    if(!templist.includes(newItem)){
      templist.push(newItem)
      setItemList(templist)
      setNewitem("")
      listsService
      .update(newList, templist)
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
      code: newList
    }
    listsService
           .update(newList, listObject)
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