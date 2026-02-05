import iconSet from "@assets/icons/selection.json";
import { colors } from "@constants/colors";
import IcomoonReact from "icomoon-react";
import React from "react";

const Icon = ({ color = colors.black70, size = 16, icon, className }) => {
  return (
    <IcomoonReact
      icon={icon}
      size={size}
      color={color}
      className={className}
      iconSet={iconSet}
    />
  );
};

export default Icon;
