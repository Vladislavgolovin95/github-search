import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Header } from "src/components/Header/Header";
import { LinkBtn } from "src/components/LinkBtn/LinkBtn";
import { ListRepo } from "src/components/ListRepo/ListRepo";
import { BACK, LABEL_LIST_REPO } from "src/constants/constants";
import SearchStore from "src/store/SearchStore";

const FavoritesPage = observer(() => {
  const { favorites } = SearchStore;

  return (
    <>
      <Header />
      <div className="container">
        <Link to="/">
          <LinkBtn className="link_navigate" text={BACK}/>
        </Link>
        <ListRepo repository={favorites} label={LABEL_LIST_REPO.favorites}/>
      </div>
    </>
  )
});

export default FavoritesPage;