import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import iconArchive from "src/assets/svg/archive.svg";
import iconEdit from "src/assets/svg/edit.svg";
import iconFolder from "src/assets/svg/folder.svg";
import iconFork from "src/assets/svg/fork.svg";
import iconLanguage from "src/assets/svg/language.svg";
import iconStar from "src/assets/svg/star.svg";
import { MESSAGE, NO, OPEN_REPO_ALT, REPO_NOT_FOUND, STATS_DESCRIPTION, TITLE_PROFILE, YES } from "src/constants/constants";
import SearchStore from "src/store/SearchStore";
import { copyLink } from "src/utils/copyLink";
import { formatDate } from "src/utils/formatDate";
import { message } from "src/utils/message";
import { AvatarProfile } from "../AvatarProfile/AvatarProfile";
import { Button } from "../Button/Button";
import { LinkBtn } from "../LinkBtn/LinkBtn";
import { StatsCard } from "../StatsCard/StatsCard";
import "./styles.css";

export const CardProfile = observer(() => {
  const { id } = useParams<string>();
  const { addFavorite, removeFavorite, result } = SearchStore;

  const repo = result.find(repo => repo.id === Number(id));

  if (!repo) {
    return <div>{REPO_NOT_FOUND}</div>;
  }

  const handleFavoriteClick = () => {
    if (repo.isFavorite) {
      removeFavorite(repo.id);
      message.info(MESSAGE.delete);
    } else {
      addFavorite(repo);
      message.success(MESSAGE.added);
    }
  };
  const handleCopyLinkClick = () => {
    copyLink(repo.owner.html_url);
  };

  const statsClasses = {
    classWrapper: "stats-wrapper_profile",
    classWrapperIcon: "stats-wrapper-icon_profile",
    classImage: "stats-icon_profile",
    classWrapperText: "stats-text-wrapper_profile",
    classValue: "stats-value_profile",
    classDescription : "stats-description_profile"
  };

  return (
    <div className="profile-card">
      <h2 className="card-title">{TITLE_PROFILE}</h2>
      <div className="profile-card__info">
        <AvatarProfile 
          className="profile-img"
          url={repo?.owner.avatar_url || ''}
        />
        <div className="profile-text-wapper">
          <p className="profile-repo__title">{repo?.full_name}</p>
          <p className="profile-repo__description">{repo?.description}</p>
        </div>
      </div>
      <div className="repo-list-stats">
        <StatsCard 
          classNames={statsClasses}
          url={iconStar} 
          value={(repo?.stargazers_count || 0).toLocaleString("ru-RU")}
          description={STATS_DESCRIPTION.stars}/>
        <StatsCard 
          classNames={statsClasses}
          url={iconFork} 
          value={(repo?.forks_count || 0).toLocaleString("ru-RU")}
          description={STATS_DESCRIPTION.forks}/>
        <StatsCard 
          classNames={statsClasses}
          url={iconArchive} 
          value={repo?.archived ? YES : NO} 
          description={STATS_DESCRIPTION.archive}/>
        <StatsCard 
          classNames={statsClasses}
          url={iconLanguage} 
          value={repo?.language || ''} 
          description={STATS_DESCRIPTION.lang}/>
        <StatsCard 
          classNames={statsClasses}
          url={iconFolder} 
          value={repo?.created_at ? formatDate(repo?.created_at) : ''}
          description={STATS_DESCRIPTION.create}/>
        <StatsCard 
          classNames={statsClasses}
          url={iconEdit} 
          value={repo?.updated_at ? formatDate(repo?.updated_at) : ''} 
          description={STATS_DESCRIPTION.update}/>
      </div>
      <div className="profile-wrapper-actions">
        <div className="profile-actions">
          <Button 
            className="btn profile_btn btn-copylink"
            onClick={handleCopyLinkClick}/>
          <Button 
            className={`btn profile_btn ${repo?.isFavorite 
              ? 'btn-favorite_active' 
              : 'btn-favorite'}`}
            onClick={handleFavoriteClick}/>
        </div>
          <LinkBtn 
            className="link profile-link" 
            href={repo?.owner.html_url}
            text={OPEN_REPO_ALT}/>
      </div>
    </div>
  )
});