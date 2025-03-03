import { observer } from "mobx-react-lite"
import { Link } from "react-router-dom"
import iconHeart from "src/assets/svg/heart.svg"
import iconPerson from "src/assets/svg/person.svg"
import iconSearch from "src/assets/svg/search.svg"
import { FAVORITES, LOGO, MY_GIT_URL, ROUTES, USER } from "src/constants/constants"
import SearchStore from "src/store/SearchStore"
import "./styles.css"

export const Header = observer(() => {
  const { favorites } = SearchStore;
  
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <div className="header__logo">
            <img src={iconSearch} alt={LOGO}/>
            <Link to={ROUTES.home}>
              <h1 className="header__title">GitHubSearch</h1>
            </Link>
          </div>
          <div className="header__user">
            <Link to="/favorites" className="favorites-link icon-heart">
              <img src={iconHeart} alt={FAVORITES} />
            </Link>
            {favorites.length > 0 && (
              <div className="favorite-count">
                {favorites.length}
              </div>
            )}
            <a href={MY_GIT_URL} target="_blank" className="favorites-link">
              <div className="favorites-link-wrapper">
                <img className="favorites-icon" src={iconPerson} alt={USER} />
              </div>
            </a>
          </div>
        </div>
      </div>
    </header>
  )
});