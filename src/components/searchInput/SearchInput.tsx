import css from "./SearchInput.module.css";
import searchIcon from "../../assets/icons/search-icon.svg";

const SearchInput = () => {
    return (
        <div className={css.wrap}>
            <input
                type="search"
                name="search"
                className={css.input}
                placeholder="Filter by name ..."
                autoFocus
            />
            <img src={searchIcon} alt="Search icon" className={css.icon} />
        </div>
    );
};

export default SearchInput;
