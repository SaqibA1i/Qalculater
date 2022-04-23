import { useSelector } from "react-redux";
import { SpinnerInfinity } from "spinners-react";
import { getLoadingSelector } from "../../redux/loading/selectors";

const Loader = () => {
  const isLoading = useSelector(getLoadingSelector);

  return isLoading ? (
    <div className="loading-screen">
      <SpinnerInfinity
        size={100}
        color="red"
        secondaryColor="rgba(240, 248, 255, 0.795)"
      />
    </div>
  ) : (
    <></>
  );
};

export default Loader;
