import { observer } from "mobx-react-lite";
import SearchStore from "src/store/SearchStore";
import { IRepo } from "src/types/types";
import { CardRepo } from "../CardRepo/CardRepo";
import { Loader } from "../Loader/Loader";
import { RepoCount } from "../RepoCount/RepoCount";
import { SortRepos } from "../SortRepo/SortRepo";
import "./styles.css";

interface IListRepoProps {
  repository: IRepo[];
  label: string;
}

export const ListRepo: React.FC<IListRepoProps> = observer(({ repository, label }) => {
  const { isLoading } = SearchStore;

  if (isLoading) {
    return (
      <div className="loading-wrapper">
        <Loader loading={isLoading} />
      </div>
    );
  }

  if (repository.length === 0) {
    return null; 
  }

  return (
    <div className="container">
      <ul className="list">
        <div className="container sort-panel">
          <RepoCount label={label} count={repository.length} />
          <SortRepos />
        </div>
        {repository.map(item => <CardRepo key={item.id} item={item} />)}
      </ul>
    </div>
  );
});