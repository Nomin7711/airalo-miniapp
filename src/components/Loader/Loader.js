import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = ({ visible, color }) => {
  return (
    visible && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black10 opacity-50 z-20">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color={color ? color : "#0fb4e2"}
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={visible}
        />
      </div>
    )
  );
};
export default Loader;
