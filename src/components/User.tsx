import { useNavigate } from "react-router-dom";
import axios from "axios"
import { useEffect, useState } from "react"
import { IUser } from "../interface/IUser"

export function User() {
    const nav = useNavigate();
    const [getUser, setGetUser] = useState<IUser>({
        _id: "",
        userName: "",
        email: "",
        newsLetter: false
    })
    const [save, setSave] = useState(false)

    let userId = {
        _id: JSON.parse(localStorage.getItem("user") || "")
    }

    useEffect(() => {
        axios.post<IUser>("http://localhost:3000/users/user", userId)
            .then(async response => {
                let data =  response.data
                console.log("Data", data)
                setGetUser(data)
                // localStorage.setItem("user", JSON.stringify(data))
                // let ls = localStorage.getItem("user")
                
                console.log("funkar?",getUser)
            })

    }, [])


    // // vid click ändrar man nyhetsbrevet till true, annars till false
    function handleClick(e: any) {
        if (!getUser.newsLetter === true) {
            let itBeTrue = ({ ...getUser, newsLetter: true })
            setGetUser(itBeTrue)
            console.log("Ändra till true", getUser)
            setSave(true)

        } else {
            let notTrue = ({ ...getUser, newsLetter: false })
            setGetUser(notTrue)
            setSave(true)
            console.log("Ändra till false", getUser)
        }
    }
    //skickar infon till servern genom spara knappen
    async function saveNews() {
        await axios.put<IUser>("http://localhost:3000/users/user", getUser)
            .then(response => console.log("vad skickas?", response.data))
        setSave(false)
    }
    //tar bort localStorage och skickar en till logga in sidan
    function loggOut() {

        localStorage.removeItem("user");
        nav("/");


    }

    return <>
        <button onClick={loggOut}>Logga ut</button>
        <p>Välkommen användare {getUser.userName}</p>

        <p>Inställningar:</p>
        {(getUser.newsLetter === true) ? <><p>Nyhetsbrev: Ja </p>
            <button onClick={handleClick} >Avprenemurera</button>
            {save && <><br />Vänligen spara<br /><button onClick={saveNews}>Spara</button> </>}</> :
            <><p>Nyhetsbrev: Nej </p>
                <button onClick={handleClick} >Prenemurera</button>
                {save && <><br />Vänligen spara<br />
                    <button onClick={saveNews}>Spara</button> </>}
            </>}

    </>




}


