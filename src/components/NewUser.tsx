import axios from "axios";
import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom";
import { INewUser } from "../interface/INewUser";

export function NewUser(){

    let headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
    }

    const [newUser, setNewUser] = useState<INewUser>({
        userName: "",
        passWord: "", 
        email: "",
        newsLetter: false

    });
    const [accepted, setAccepted] = useState(false)
    const [create, setCreate] = useState(true)
//hämtar info från input, uppdaterar useState
    function handleUser(e: ChangeEvent<HTMLInputElement>){
        let name = e.target.name
        let uppdate= ({ ...newUser, [name]: e.target.value })
        setNewUser(uppdate)
       
    }
//kollar om man fyllt i checken till nyhetsbrevet, om man fyllt i blir newsLetter  = true
    function handleCheck(e: any){
        let isChecked = e.target.checked;
        if(isChecked){
            let checked = ({...newUser, newsLetter: true})
            setNewUser(checked)
        }  
    }
  // lägger till nu användare med post. 
function addNewUser(){
    console.log("ny användare", newUser)
        axios.post<INewUser>("http://localhost:3000/users/add", newUser, { headers })
        .then(response => {console.log("data", response.data)})
        .catch(error => { console.log("här blev det fel", error )})
        console.log(newUser)
        setAccepted(true)
    setCreate(false)

}

    return <>
  
    <div><form>
            Användarnamn: <input type="text" name="userName" value={newUser.userName} onChange={handleUser} /><br/>
            Lösenord: <input type="text" name="passWord" value={newUser.passWord} onChange={handleUser}/> <br/>
            E-mail <input type="text" name="email" value={newUser.email} onChange={handleUser}/> <br/>
            Nyhetsbrev? <input type="checkbox" name="newsLetter"  onChange={handleCheck} />
            </form>
            {create && <button onClick={addNewUser}>Skapa användare</button> }
            {accepted && <><p>Användare är skapad</p><Link to="/">Logga In </Link></>}
        </div>
    </>
}