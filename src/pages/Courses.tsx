import rickMortyMob from "../assets/images/rick-morty-mobile.png";
import rickMortyDes from "../assets/images/rick-morty-desktop.png";
import css from "./Courses.module.css";
import SearchInput from "../components/searchInput/SearchInput";
import CardCharacter from "../components/cardCharacter/CardCharacter";

const Characters = ({ loading }: any) => {
    // const [characters, setCharacters] = useState([]);

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
