import Toast from "@travelsim/components/Toast";
import React from "react";
import { renderRoutes } from "react-router-config";

const MainLayout = ({ route: { routes }, location }) => {
  return (
    <div
      className="flex flex-col h-screen justify-between z-0"
      style={{
        backgroundImage:
          "linear-gradient(132deg, #FF3B63 20.58%, #720098 79.95%)",
      }}
    >
      <>{renderRoutes(routes)}</>
      <Toast />
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 63.01%)",
        }}
        className={"w-full fixed bottom-0 bg-purpleOpacity h-[30x] z-100 "}
      ></div>
    </div>
  );
};

export default MainLayout;
