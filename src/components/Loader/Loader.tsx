import { FadeLoader } from "react-spinners";

interface ILoaderProps {
  loading: boolean;
}

export const Loader: React.FC<ILoaderProps> = ({ loading }) => {
  return (
    <FadeLoader
      color="#3A3A3A"
      height={15}
      margin={15}
      radius={15}
      width={5}
      loading={loading}
    />
  );
};