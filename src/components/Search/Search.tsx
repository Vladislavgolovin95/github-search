import { observer } from "mobx-react-lite";
import { PLACEHOLDER } from "src/constants/constants";
import searchStore from "src/store/SearchStore";
import { Button } from "../Button/Button";
import "./styles.css";

export const Search = observer(() => {
  const { title, setTitle } = searchStore;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const handleClear = () => {
    setTitle("");
  };

  return (
    <div className="container">
      <div className="search-wrapper">
        <input
          className="search"
          type="text"
          placeholder={PLACEHOLDER}
          value={title}
          onChange={handleChange}
        />
        {title && <Button 
          className="clear-button"
          onClick={handleClear}  
        />}
      </div>
    </div>
  )
});