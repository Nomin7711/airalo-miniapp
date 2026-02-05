import { useGetBanner } from "@airalo/api/useGetBanner";
import img from "@airalo/assets/img/banner.png";
import Loader from "@components/Loader";
import React from "react";

const Banner = () => {
  const { data, isLoading } = useGetBanner();
  return (
    <>
      <Loader visible={isLoading} />
      <img src={data ? data : img} alt="banner" className="w-full" />
    </>
  );
};

export default Banner;
