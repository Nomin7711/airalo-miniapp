import { colors } from "@constants/colors";
import { ButtonBase } from "@mui/material";
import React from "react";

const Button = ({ text, onClick, bgColor, hasTerm }) => {
  return (
    <div
      className="fixed bottom-0 bg-black0 w-[100%] shadow-2xl flex items-center p-4 "
      style={{ paddingBottom: "max(env(safe-area-inset-top), 16px)" }}
    >
      {/*{hasTerm && <div></div>}*/}
      <ButtonBase
        sx={{
          backgroundColor: bgColor ? bgColor : colors.primary,
          paddingX: "32px",
          paddingY: "16px",
          borderRadius: "16px",
          width: "90%",
        }}
        onClick={onClick}
      >
        <p className="text-sm text-black0">{text}</p>
      </ButtonBase>
    </div>
  );
};

export default Button;
