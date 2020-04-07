import React, {useState, useEffect} from 'react';
import banner from './assets/banner.jpg'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {InputGroup, Button, FormControl, Table} from 'react-bootstrap'
import Notification from './components/notification'
import listsService from './services/lists'


const App = () => {

  const [oldList, setOldList] = useState("");
  const [newList, setNewList] = useState("");
  const [newItem, setNewitem] = useState("");
  const [itemList, setItemList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorType, setErrorType] = useState(true);
  const [lists, setLists] = useState([]);

  useEffect(() => {
    listsService
      .getAll()
      .then(initialLists => {
        setLists(initialLists)
      })
  }, [])


  const handleCodeChange = (event) => {
    setOldList(event.target.value);
  }
  const lookForList = () => {

    const found = lists.some(el => el.id === oldList)

    if(found){
      setNewList(oldList)
    }else{
      setErrorType(true)
      setErrorMessage("Listaa koodilla " + oldList + " ei löytynyt!")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setOldList("")
    }
  }

  const createNewList = () => {
    setNewList(makeid(5))

  }

  const handleItemChange = (event) => {
    setNewitem(event.target.value)
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

  const makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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


  if(newList === ""){
    return (
      <div className="wrapper">
        <img src={banner} alt="Banner"/>
        <Notification message={errorMessage} errorType={errorType}/>
        <div className="div">
          <InputGroup className="mb-3">
            <FormControl onChange={handleCodeChange} aria-describedby="basic-addon1" value={oldList} />
            <InputGroup.Prepend>
              <Button onClick={lookForList} variant="outline-secondary">Etsi listaa</Button>
            </InputGroup.Prepend>
          </InputGroup>
          <Button className="button" onClick={createNewList} variant="outline-secondary">Uusi ostoslista</Button>
          <Button className="button" onClick={() => console.log("kong",lists)} variant="outline-secondary">kong</Button>
        </div>
      </div>
    )
  }else{
    return (
      <div className="wrapper">
        <img src={banner} alt="Banner"/>
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
}

export default App;
