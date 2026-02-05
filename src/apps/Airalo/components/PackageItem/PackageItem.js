import Icon from "@components/Icon";
import { colors } from "@constants/colors";
import { ButtonBase } from "@mui/material";
import { formatNumber } from "@utils";
import React from "react";

const PackageItem = ({ item, esim, mutateTopUp }) => {
  const handlePayment = async () => {
    const saveData = {
      iccid: esim?.iccid,
      package_id: item?.id,
      id: esim?.id,
    };

    const res = await mutateTopUp(saveData);
    window.hpsPayment({
      checkout_id: res?.checkout_id,
      returnScreen: "",
    });
  };
  return (
    <div className="bg-purpleOpacity p-4 rounded-2xl flex justify-between">
      <div>
        <div className="flex items-center gap-4 ">
          <Icon
            icon={"ic20-import-export"}
            size={24}
            color={colors.airaloText}
          />
          <p className="text-xs font-bold text-airaloText">DATA</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-[32px] font-bold text-airaloText">{item?.data}</p>
        </div>
      </div>

      <div className="text-end mt-2">
        <div>
          <ButtonBase
            sx={{
              background: colors.primary,
              borderRadius: "8px",
            }}
            className={"relative"}
            onClick={() => {
              handlePayment();
              // history.push({
              //   pathname: "/deviceInfo",
              //   state: { item: item, esim: esim, topUpPayment: true },
              // });
            }}
          >
            <p className="text-black0 text-xs py-2 px-6 font-bold">
              {formatNumber(item?.price)}₮
            </p>
            {item?.discount > 0 && (
              <div
                className={
                  "absolute top-[-12px] left-[-40%] bg-[#FF3B63] rounded"
                }
              >
                <p className="text-black0 text-xs p-1 font-bold">
                  -{item?.discount}% off
                </p>
              </div>
            )}
          </ButtonBase>
        </div>

        <p className="text-airaloText text-xs pt-2">
          Valid FOR {item?.day} Days
        </p>
      </div>
    </div>
  );
};

export default PackageItem;
