import { AVATAR_ALT } from "src/constants/constants"

interface IAvatarProfile {
  className: string;
  url: string;
}

export const AvatarProfile: React.FC<IAvatarProfile> = ({ className, url }) => {
  return (
    <img 
      className={className}
      src={url} 
      alt={AVATAR_ALT}
    />
  )
}