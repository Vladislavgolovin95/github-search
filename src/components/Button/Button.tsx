import "./styles.css"

interface IButton {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  className: string;
}

export const Button: React.FC<IButton> = ({ onClick, className }) => {
  return (
    <button className={className} onClick={onClick}></button>
  )
}
