import Toast from "@airalo/components/Toast";
import React from "react";
import { renderRoutes } from "react-router-config";

const MainLayout = ({ route: { routes }, location }) => {
  const displayOnBoarding = false;

  return (
    <div
      className="flex flex-col h-screen justify-between"
      style={{
        backgroundImage:
          "linear-gradient(260deg, #FFC071 4.88%, #AC507D 67.45%)",
      }}
    >
      {displayOnBoarding ? null : <>{renderRoutes(routes)}</>}
      <Toast />
    </div>
  );
};

export default MainLayout;
