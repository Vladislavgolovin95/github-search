import "./styles.css"

interface IRepoCountProps {
  label: string;
  count: number;
}

export const RepoCount: React.FC<IRepoCountProps> = ({ label, count }) => {
  return <p className="repo-count">{`${label}: ${count} repositories`}</p>
};