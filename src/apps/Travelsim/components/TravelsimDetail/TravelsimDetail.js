import Icon from "@components/Icon";
import { colors } from "@constants/colors";
import { ButtonBase } from "@mui/material";
import cellular from "@travelsim/assets/cellular.svg";
import sim from "@travelsim/assets/sim/sim.svg";
import simIcon from "@travelsim/assets/sim/simcard.svg";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const TravelsimDetail = ({ item, fromAiralo }) => {
  const history = useHistory();
  const handleToPackage = () => {
    const iccid = item?.iccid;
    if (fromAiralo) {
      window.location.assign(`/travelsim/charge?iccid=${iccid}`);
    } else {
      history.push(`/travelsim/charge?iccid=${iccid}`);
    }
  };

  return (
    <div className="p-4 bg-purpleOpacity w-full rounded-2xl flex flex-col gap-3 relative">
      <img
        className={"w-[80px] absolute top-[-16px] right-[16px]"}
        src={sim}
        alt={""}
      />
      <div
        className={
          "text-[18px] h-[40px] flex flex-row items-start font-semibold text-black85"
        }
      >
        {item?.title?.includes("Unlimited")
          ? item?.title.replace("Unlimited", "Хязгааргүй")
          : item?.title}
      </div>
      <div className={"flex flex-row justify-between items-center w-full"}>
        <div className={"flex flex-row gap-2 items-center"}>
          <Icon
            icon={"ic20-import-export"}
            size={20}
            color={colors.airaloText}
          />
          <div className={"flex flex-col gap-1 flex-grow"}>
            <span className={"text-airaloText text-[14px] font-medium"}>
              Дата
            </span>
          </div>
        </div>
        <div className={"font-semibold text-[15px] text-airaloText"}>
          {" "}
          {item?.data}
        </div>
      </div>
      <div className={"flex flex-row justify-between items-center w-full"}>
        <div className={"flex flex-row gap-2 items-center"}>
          <Icon icon={"ic20-calendar"} size={20} color={colors.airaloText} />
          <div className={"flex flex-col gap-1 flex-grow"}>
            <span className={"text-airaloText text-[14px] font-medium"}>
              Хугацаа
            </span>
          </div>
        </div>
        <div className={"font-semibold text-[15px] text-airaloText"}>
          {" "}
          {item?.validity}
        </div>
      </div>
      <div className={"flex flex-row justify-between items-center w-full"}>
        <div className={"flex flex-row gap-2 items-center"}>
          <img className={"w-[20px]"} src={simIcon} alt={""} />
          <div className={"flex flex-col gap-1 flex-grow"}>
            <span className={"text-airaloText text-[14px] font-medium"}>
              ICCID
            </span>
          </div>
        </div>
        <div className={"font-semibold text-[14px] text-airaloText"}>
          {" "}
          {item?.iccid}
        </div>
      </div>
      {item?.operators && (
        <div className={"flex flex-row justify-between items-center w-full"}>
          <div className={"flex flex-row gap-2 items-center"}>
            <Icon icon={"ic24-globe"} size={20} color={colors.airaloText} />
            <div className={"flex flex-col gap-1 flex-grow"}>
              <span className={"text-airaloText text-[14px] font-medium"}>
                Сүлжээ
              </span>
            </div>
          </div>
          <div className={"font-semibold text-"}>
            <div className={"flex flex-row gap-1 items-end"}>
              <span className={"text-[10px] text-airaloText font-semibold"}>
                {item?.operators}
              </span>
              <img className={"w-[14px]"} src={cellular} alt={""} />
            </div>
          </div>
        </div>
      )}

      <ButtonBase
        onClick={handleToPackage}
        sx={{
          background: colors.black0,
          paddingY: "10px",
          width: "100%",
          borderRadius: "8px",
        }}
      >
        <p className="text-hipay text-base font-semibold flex flex-row gap-2 items-center">
          <Icon icon={"ic24-plus"} size={16} color={colors.hipay} /> Цэнэглэх
        </p>
      </ButtonBase>
    </div>
  );
};

export default TravelsimDetail;
