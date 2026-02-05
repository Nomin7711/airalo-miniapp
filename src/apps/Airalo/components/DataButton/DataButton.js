import { ButtonBase } from "@mui/material";
import React from "react";

const DataButton = ({ text, onClick, selectedRegion, disabled, textMn }) => {
  return (
    <div
      className="mb-4 text-center"
      style={
        selectedRegion === text ? { borderBottom: "3px solid #FFCC01" } : {}
      }
    >
      <ButtonBase onClick={onClick} sx={{ width: "100%" }} disabled={disabled}>
        <p
          className={`${
            disabled ? "text-black40" : "text-airaloText"
          } text-sm font-bold p-2`}
        >
          {textMn}
        </p>
      </ButtonBase>
    </div>
  );
};

export default DataButton;
