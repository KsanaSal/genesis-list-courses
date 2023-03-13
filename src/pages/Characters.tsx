import rickMortyMob from "../assets/images/rick-morty-mobile.png";
import rickMortyDes from "../assets/images/rick-morty-desktop.png";
import css from "./Characters.module.css";
import SearchInput from "../components/searchInput/SearchInput";
import CardCharacter from "../components/cardCharacter/CardCharacter";
import { useEffect, useState } from "react";
import getSearchCharacters from "../data/getSearchCharacters";

const Characters = ({ loading }: any) => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const getChacters = async () => {
            try {
                const fetchCharacters = await getSearchCharacters("as");
                console.log(fetchCharacters);
            } catch {
                console.log("first");
            }
        };
        getChacters();
    }, []);

    console.log(loading);

    return (
        <div>
            <img
                className={css.logo}
                src={rickMortyMob}
                srcSet={`${rickMortyMob} 360w, ${rickMortyDes} 600w`}
                alt="Logo"
            />
            <SearchInput />
            <CardCharacter />
        </div>
    );
};

export default Characters;
