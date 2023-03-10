import character from "../../assets/character.png";
import css from "./CardCharacter.module.css";

const CardCharacter = () => {
    return (
        <div className={css.wrapCard}>
            <img src={character} alt="Character" />
            <div className={css.wrapTitle}>
                <h2>Rick Sanchez</h2>
                <h3>Human</h3>
            </div>
        </div>
    );
};

export default CardCharacter;
