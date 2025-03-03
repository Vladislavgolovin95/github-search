import { observer } from "mobx-react-lite";
import { Header } from "src/components/Header/Header"
import { ListRepo } from "src/components/ListRepo/ListRepo"
import { Search } from "src/components/Search/Search"
import { LABEL_LIST_REPO } from "src/constants/constants";
import SearchStore from "src/store/SearchStore";

const RepositoriesPage = observer(() => {
  const { result } = SearchStore;

  return (
    <>
      <Header /> 
      <Search /> 
      <ListRepo repository={result} label={LABEL_LIST_REPO.result}/>
    </>
  )
});

export default RepositoriesPage;