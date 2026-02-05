import Icon from "@components/Icon";
import { colors } from "@constants/colors";
import { IconButton } from "@mui/material";
import travelsimSvg from "@travelsim/assets/travelsimLogo.svg";
import React from "react";
import { useHistory } from "react-router-dom";

const Header = ({
  onClick,
  rightIcon,
  rightClick,
  rightSvg,
  travelsim = false,
}) => {
  const history = useHistory();

  return (
    <div
      className="px-4 py-2 bg-black0 flex flex-row justify-between"
      style={{
        paddingTop: "max(env(safe-area-inset-top), 24px)",
      }}
    >
      <IconButton onClick={onClick ? onClick : history.goBack}>
        <Icon icon="ic24-chevron-left" size={24} color={colors.black85} />
      </IconButton>

      <div className="w-[calc(100%-80px)] flex items-center justify-center">
        {/*<span className={"text-[16px] font-medium"}>Биет сим</span>*/}
        <img alt="" src={travelsimSvg} height={18} />
      </div>

      {rightIcon ? (
        <IconButton onClick={rightClick}>
          <Icon icon={rightIcon} size={24} color={colors.black0} />
        </IconButton>
      ) : rightSvg ? (
        <IconButton onClick={rightClick}>
          <img src={rightSvg} alt={"icon"} />
        </IconButton>
      ) : (
        <div className="w-[40px] h-[40px]" />
      )}
    </div>
  );
};

export default Header;
