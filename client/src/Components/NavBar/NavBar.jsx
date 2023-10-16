import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const NavBar = () => {
    return (
        <div>
            <Link to={"/"}>
                <button><p>LandingPage</p></button>
            </Link>
            <Link to={"/home"}>
                <button><p>Home</p></button>
            </Link>
            <Link to={"/about"}>
                <button><p>About</p></button>
            </Link>
            <Link to={"/create"}>
                <button><p>Create your Game</p></button>
            </Link>
            <button><p>Create Genre</p></button>
            <SearchBar />
        </div>
    );
}

export default NavBar;