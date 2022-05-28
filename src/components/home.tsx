
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { INewUser } from "../interface/INewUser";
import { IUsers } from "../interface/IUsers";


export function Home() {

    const [user, setUser] = useState<INewUser>({
        userName: "",
        passWord: "", 
        email: "",
        newsLetter: false, 
    });
    const [getUser, setGetUser] = useState<INewUser>()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [logg, setLogg] = useState(true);
  
    function handleUser(e: ChangeEvent<HTMLInputElement>) {
        let name = e.target.name
        let uppdate = ({ ...user, [name]: e.target.value })
        setUser(uppdate)
    }

    function loggIn() {
        axios.post<INewUser>("http://localhost:3000/users", user)
            .then(response => { 
                let data = response.data
                console.log(response.data)
                setGetUser(data)
                localStorage.setItem("userId", data.userName);
                setIsLoggedIn(true)
                setLogg(false)
            })
            .catch(error => { console.error(error , "fel")})
        }

        function handleClick(e: any){
            if(!getUser.newsLetter === true){
                let itBeTrue = ({...getUser, newsLetter: true})
                setGetUser(itBeTrue)
                console.log("Ändra till true", getUser)
            }else{ 
                let notTrue = ({...getUser, newsLetter: false})
                setGetUser(notTrue)
            console.log("Ändra till false", getUser)}
        }
        function loggOut(){
            axios.put<INewUser>("http://localhost:3000/users", getUser)
            .then(response => console.log("vad skickas?", response.data))
            localStorage.removeItem("userId");
            setIsLoggedIn(false)
            setLogg(true)
        
        }

    return <>
           {logg && <div>Användarnamn: <input type="text" name="userName" value={user.userName} onChange={handleUser} /><br />
            Lösenord: <input type="text" name="passWord" value={user.passWord} onChange={handleUser} /> <br />
            <button onClick={loggIn}>LoggIn</button> <Link to="/newUser">Ny användare</Link></div>}
            
            {isLoggedIn && <><button onClick={loggOut}>Logga ut</button>
            <p>Välkommen användare {getUser.userName}</p>
            
                   <p>Inställningar:</p>
                    {(getUser.newsLetter === true)? <><p>Nyhetsbrev: Ja </p> <button onClick={handleClick} name="newsLetter">Avprenemurera</button> </>:
                    <><p>Nyhetsbrev: Nej </p><button onClick={handleClick} name="newsLetter">Prenemurera</button></>}
           </>}
     </>
}

