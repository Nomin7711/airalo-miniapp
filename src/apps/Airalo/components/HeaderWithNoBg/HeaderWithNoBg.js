import Icon from "@components/Icon";
import { colors } from "@constants/colors";
import { IconButton } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";

const HeaderWithNoBg = ({ onClick, rightIcon, rightClick, rightSvg, text }) => {
  const history = useHistory();

  return (
    <div
      className="px-4 py-2  flex flex-row justify-between "
      style={{
        paddingTop: "max(env(safe-area-inset-top), 24px)",
      }}
    >
      <IconButton onClick={onClick ? onClick : history.goBack}>
        <Icon icon="ic24-chevron-left" size={24} color={colors.airaloText} />
      </IconButton>

      <div className="w-[calc(100%-80px)] flex items-center justify-center">
        <p className="text-airaloText font-bold text-base">{text}</p>
      </div>

      <IconButton onClick={history.goBack}>
        <Icon icon="ic24-close" size={24} color={colors.airaloText} />
      </IconButton>
    </div>
  );
};

export default HeaderWithNoBg;
