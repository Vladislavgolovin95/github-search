import "./styles.css"

interface LinkBtnProps {
  text: string;
  className?: string;
  href?: string;
}

export const LinkBtn: React.FC<LinkBtnProps> = ({ text, className, href }) => {
  if (href) {
    return (
      <a 
        href={href} 
        className={className} 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {text}
      </a>
    );
  };
  
  return (
    <button className={className}>
      {text}
    </button>
  );
};