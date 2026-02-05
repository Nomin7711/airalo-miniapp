import img from "@airalo/assets/card/Style-5.svg";
import arrow from "@assets/icons/arrow.svg";
import Icon from "@components/Icon";
import { colors } from "@constants/colors";
import { ButtonBase } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const DataItem = ({ item, selectedRegion, type = "esim", region }) => {
  const history = useHistory();
  const [hasImg, setHasImg] = useState(false);
  const { image, title } = region || {};
  const isNull = item?.flag?.includes("null");
  if (!isNull) {
    let img = new Image();
    img.src = item?.flag;
    img.onload = function () {
      setHasImg(true);
    };
    img.onerror = function () {
      setHasImg(false);
    };
  }

  return (
    <ButtonBase
      sx={{
        width: "100%",
        background: colors.black0,
        justifyItems: "space-around",
        padding: "12px 16px",
        borderRadius: "8px",
        height: 60,
        flex: 1,
        justifyContent: "space-between",
      }}
      onClick={() => {
        history.push("/airalo/packageList", {
          item: item,
          selectedRegion,
          region: region,
        });
      }}
    >
      <div className="flex flex-row w-full items-center gap-2">
        <div
          className={
            "w-[45px] h-[26px] overflow-hidden object-cover shadow-md flex flex-row justify-center items-center"
          }
        >
          <img
            src={region ? image?.url : hasImg ? item?.flag : img}
            alt={"img"}
            className={"rounded-sm w-[45px] object-cover h-full"}
          />
        </div>

        <p className=" text-[13px] text-black70 font-medium items-center flex text-start">
          {item ? item?.mn_name : title}
        </p>
      </div>
      <Icon
        icon={"ic24-chevron-right"}
        size={20}
        className={"ml-1"}
        color={colors.black40}
      />
    </ButtonBase>
  );
};

export default DataItem;
