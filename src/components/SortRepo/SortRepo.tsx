import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import SearchStore from 'src/store/SearchStore';
import { SortCriterial } from 'src/types/types';
import "./styles.css";

export const SortRepos = observer(() => {
  const { sortCriterial, setSortCriterial } = SearchStore;
  const [isOpen, setIsOpen] = useState(false);

  const handleSortChange = (value: SortCriterial) => {
    setSortCriterial(value);
    setIsOpen(false); 
  };

  const sortOptions = [
    { value: SortCriterial.Name, label: "По имени" },
    { value: SortCriterial.Stars, label: "По звездам" },
    { value: SortCriterial.Forks, label: "По форкам" },
    { value: SortCriterial.Novelty, label: "По новизне" }
  ];

  return (
    <div className="custom-select">
      <div
        className="selected-option"
        onClick={() => setIsOpen(!isOpen)} 
      >
        {sortOptions.find(option => option.value === sortCriterial)?.label}
        <span className={`icon ${isOpen ? 'open' : ''}`}></span>
      </div>
      {isOpen && (
        <ul className="dropdown-options">
          {sortOptions.map((option) => (
            <li
              key={option.value}
              className="dropdown-item"
              onClick={() => handleSortChange(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});