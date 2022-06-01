import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IGetUser } from "../interface/IGetUser";

export function Home() {
    const nav = useNavigate();
    const [user, setUser] = useState<IGetUser>({
        _id: "",
        userName: "",
        passWord: "",
        email: "",
        newsLetter: false,
    });

    // jämför useName och password med databasen, skickar tillbaka info. 
    function loggIn() {
        axios.post<IGetUser>("http://localhost:3000/users", user)
            .then(response => {
                let data = response.data
         
                localStorage.setItem("user", JSON.stringify(data))
                nav("/user");
            })
            .catch(error => { console.error(error, "fel") })
    }
    //hämta användarnman och lösenord
    function handleUser(e: ChangeEvent<HTMLInputElement>) {
        let name = e.target.name
        let uppdate = ({ ...user, [name]: e.target.value })
        setUser(uppdate)
    }

    return <>
        <div>Användarnamn: <input type="text" name="userName" value={user.userName} onChange={handleUser} /><br />
            Lösenord: <input type="text" name="passWord" value={user.passWord} onChange={handleUser} /> <br />
            <button onClick={loggIn}>LoggIn</button> <Link to="/newUser">Ny användare</Link></div>
    </>
}

