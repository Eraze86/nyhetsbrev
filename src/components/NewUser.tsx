import axios from "axios";
import { ChangeEvent, useState } from "react"
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
        newsLetter: false, 

    });

    function handleUser(e: ChangeEvent<HTMLInputElement>){
        let name = e.target.name
        let uppdate= ({ ...newUser, [name]: e.target.value })
        setNewUser(uppdate)
       
    }
    function handleCheck(e: any){
        let isChecked = e.target.checked;
        if(isChecked){
            let checked = ({...newUser, newsLetter: true})
            setNewUser(checked)
        }  
    }
  
function addNewUser(){
        axios.post<INewUser>("http://localhost:3000/users/add", newUser, { headers })
        .then(response => {console.log(response.data)})
        .catch(error => { console.log(error , "fel")})
        console.log(newUser)


}

    return <>
  
    <div><form>
            Användarnamn: <input type="text" name="userName" value={newUser.userName} onChange={handleUser} /><br/>
            Lösenord: <input type="text" name="passWord" value={newUser.passWord} onChange={handleUser}/> <br/>
            E-mail <input type="text" name="email" value={newUser.email} onChange={handleUser}/> <br/>
            Nyhetsbrev? <input type="checkbox" name="newsLetter"  onChange={handleCheck} />
            </form>
            <button onClick={addNewUser}>Skapa användare</button> 
        </div>
    </>
}