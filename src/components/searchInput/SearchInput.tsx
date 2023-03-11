import css from "./SearchInput.module.css";
import searchIcon from "../../assets/icons/search-icon.svg";

const SearchInput = () => {
    return (
        <form className={css.wrap}>
            <input
                type="search"
                name="search"
                className={css.input}
                placeholder="Filter by name ..."
                autoFocus
            />
            <button type="submit" className={css.button}>
                <img src={searchIcon} alt="Search icon" />
            </button>
        </form>
    );
};

export default SearchInput;
