import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Home = () => {
    const nav = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("username")) {
            nav("/office")
        } else {
            nav("/auth")
        }
    }, [])

    return (
        <></>
    )
}

export default Home