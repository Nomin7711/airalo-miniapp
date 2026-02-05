import Icon from "@components/Icon";
import { colors } from "@constants/colors";
import { IconButton } from "@mui/material";
import React from "react";

const StatusBox = ({ pic, color, text, setShowAlert }) => {
  return (
    <div
      className="py-3 px-4 flex items-center justify-between rounded-lg mb-4"
      style={{ background: color }}
    >
      <div className="flex items-center">
        <Icon icon={pic} size={42} color={colors.black0} />
        <p className="text-xxs text-black0 mx-4">{text}</p>
      </div>
      <IconButton onClick={() => setShowAlert(false)}>
        <Icon icon={"ic24-close"} color={colors.black0} />
      </IconButton>
    </div>
  );
};

export default StatusBox;
