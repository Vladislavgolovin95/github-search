import { observer } from "mobx-react-lite"
import SearchStore from "src/store/SearchStore"
import { IRepo } from "src/types/types"
import { copyLink } from "src/utils/copyLink"
import { message } from "src/utils/message"
import iconFork from "../../assets/svg/fork.svg"
import iconStar from "../../assets/svg/star.svg"
import { Button } from "../Button/Button"
import { LinkBtn } from "../LinkBtn/LinkBtn"
import { StatsCard } from "../StatsCard/StatsCard"
import "./styles.css"
import { Link } from "react-router-dom"
import { AvatarProfile } from "../AvatarProfile/AvatarProfile"
import { DETAILS, MESSAGE, STATS_DESCRIPTION } from "src/constants/constants"

interface ICardRepoProps {
  item: IRepo;
}

export const CardRepo: React.FC<ICardRepoProps> = observer(({ item }) => {
  const { addFavorite, removeFavorite } = SearchStore;

  const handleFavoriteClick = () => {
    if (item.isFavorite) {
      removeFavorite(item.id);
      message.info(MESSAGE.delete);
    } else {
      addFavorite(item);
      message.success(MESSAGE.added);
    }
  };

  const handleCopyLinkClick = () => {
    copyLink(item.owner.html_url);
  };

  const statsClasses = {
    classWrapper: "stats-wrapper_repo",
    classWrapperIcon: "stats-wrapper-icon_repo",
    classImage: "stats-icon_repo",
    classWrapperText: "stats-text-wrapper_repo",
    classValue: "stats-value_repo",
    classDescription : "stats-description_repo"
  };

  return (
    <li className="card-repo">
      <div className="card-repo__content">
        <div className="card-repo__owner">
          <AvatarProfile 
            className="card-repo__img" 
            url={item.owner.avatar_url} 
          />
          <div className="stats-card-wrapper">
            <StatsCard
              classNames={statsClasses}
              url={iconStar}
              alt={STATS_DESCRIPTION.stars}
              value={item.stargazers_count.toLocaleString("ru-RU")}/>
            <StatsCard
              classNames={statsClasses}
              url={iconFork} alt={STATS_DESCRIPTION.forks}
              value={item.forks_count.toLocaleString("ru-RU")}/>
          </div>
        </div>
        <p className="card-repo__login">@{item.owner.login}</p>
        <LinkBtn 
          className="card-repo__link" 
          href={item.owner.html_url} 
          text={item.full_name} />
      </div>
      <div className="card-repo__actions">
        <div className="card-repo__buttons">
          <Button 
            className={`btn btn-card-repo ${item.isFavorite 
              ? 'btn-favorite_active' 
              : 'btn-favorite'}`} 
            onClick={handleFavoriteClick}/>
          <Button 
            className="btn btn-card-repo btn-copylink"
            onClick={handleCopyLinkClick}/>
        </div>
        <Link to={`/profile/${item.id}`}>
          <LinkBtn 
            className="link link_card-repo" 
            text={DETAILS}/>
        </Link>
      </div>
    </li>
  )
});