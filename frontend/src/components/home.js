import React, {useState, useEffect} from 'react';
import banner from '../assets/banner.jpg'
import './home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {InputGroup, Button, FormControl} from 'react-bootstrap'
import Notification from './notification'
import listsService from '../services/lists'
import { useHistory } from "react-router-dom";

const Home = () => {

  const [oldList, setOldList] = useState("");
  const [newList, setNewList] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [errorType, setErrorType] = useState(true);
  const [lists, setLists] = useState([]);
  const history = useHistory();

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
    let id = makeid(5)
    setNewList(id)
    history.push(`/list/${id}`)
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
  return(
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
}

export default Home