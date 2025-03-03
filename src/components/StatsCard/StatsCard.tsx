import "./styles.css"

interface IStatsCardProps {
  url: string;
  value: string | number | boolean;
  description?: string;
  alt?: string;
  classNames: {
    classWrapper?: string;
    classWrapperIcon?: string;
    classImage?: string;
    classWrapperText?: string;
    classValue?: string;
    classDescription?: string;
  };
}

export const StatsCard: React.FC<IStatsCardProps> = ({ 
  url, 
  value, 
  description, 
  alt, 
  classNames,
}) => {
  const { 
    classWrapper,
    classWrapperIcon,
    classImage, 
    classWrapperText, 
    classValue, 
    classDescription 
  } = classNames;
  
  return (
    <div className={classWrapper}>
      <div className={classWrapperIcon}>
        <img className={classImage} src={url} alt={alt} />
      </div>
      <div className={classWrapperText}>
        <p className={classValue}>{value}</p>
        {description && <p className={classDescription}>{description}</p>}
      </div>
    </div>
  )
};