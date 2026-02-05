import { useMutatePayment } from "@airalo/api/useMutatePayment";
import { useMutateTopupPayment } from "@airalo/api/useMutateTopupPayment";
import img from "@airalo/assets/img/background.png";
import rocket from "@airalo/assets/img/rocket.png";
import searchDevice from "@airalo/assets/img/searchDevice.png";
import HeaderWithNoBg from "@airalo/components/HeaderWithNoBg";
import Loader from "@components/Loader";
import { colors } from "@constants/colors";
import { ButtonBase } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const customCarouselStyles = {
  background: "linear-gradient(0deg, #E0EFFC 0%, #EFE9FA 96.9%)",
  backgroundRepeat: "no-repeat",
  height: "100%",
  flex: 1,
  paddingBottom: "max(env(safe-area-inset-top), 24px)",
};
const DeviceDetail = () => {
  const history = useHistory();
  const {
    item: item,
    data: countryData,
    selectedRegion,
    topUpPayment,
    esim,
    region,
    hideButton,
    phoneName,
    selected,
  } = history?.location?.state || {};
  const [error, setError] = useState(false);
  const { mutateAsync, isLoading: paymentLoading } = useMutatePayment();
  const { mutateAsync: mutateTopUp, isLoading: topUpLoading } =
    useMutateTopupPayment();
  const handleButton = async () => {
    if (topUpPayment) {
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
    } else {
      const saveData = {
        type: selectedRegion?.toLowerCase(),
        country_code:
          countryData?.length > 0
            ? countryData?.[0]?.country_code
            : region?.slug,
        operator_id:
          countryData?.length > 0
            ? countryData?.[0]?.operators?.[0]?.id + ""
            : region?.operators?.[0]?.id,
        package_id: item?.id,
        quantity: 1 + "",
      };
      const res = await mutateAsync(saveData);
      if (res?.checkout_id) {
        window.hpsPayment({
          checkout_id: res?.checkout_id,
          returnScreen: "",
        });
      } else {
        alert("Алдаа гарлаа");
        setError(true);
      }
    }
  };
  return (
    <div style={customCarouselStyles}>
      <Loader visible={paymentLoading || topUpLoading} color={colors.primary} />
      <HeaderWithNoBg text={"eSIM шалгах"} />
      <div className="flex flex-col h-full overflow-y-scroll box-border w-full ">
        <div className="px-3 pt-6 pb-8 w-full flex flex-row items-center justify-center">
          <img
            src={rocket}
            alt={"rocket"}
            style={{
              width: "50%",
              minWidth: 150,
              height: "auto",
            }}
          />
        </div>

        <div className={"w-full box-border"}>
          <p className="text-center text-sm font-bold text-airaloText px-16">
            Таны сонгосон төхөөрөмж
          </p>
          <p className="text-center text-[18px] font-bold text-airaloText px-16 mt-2 ">
            {phoneName}
          </p>
          <div className="mx-6 mt-6 flex-col flex-1 bg-orange bg-opacity-20 rounded">
            <p className="text-xs text-airaloText text-center p-3">
              Үйлдвэрлэсэн улс загвараас хамаарч таны төхөөрөмж eSIM дэмждэг тул
              та утасны дээрх функц байгаа эсэхийг шалгана уу.
            </p>
            <p className="text-sm text-center text-airaloText bg-orange rounded py-2 px-4">
              {selected === "ios"
                ? " Settings - Cellular - Add eSIM - Use QR Code"
                : " Settings - Connections - SIM card manager - Add mobile plan  Scan carrier"}
            </p>
          </div>

          <div className="px-3 mt-6 text-center w-full flex flex-row items-center justify-evenly">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-primary rounded-full" />
              <p className={"text-black70 font-medium text-[14px]"}>
                Боломжтой
              </p>
            </div>
            <div className="flex items-center gap-2 ">
              <div className="h-4 w-4 bg-black0 rounded-full" />
              <p className={"text-black70 font-medium text-[14px]"}>
                Боломжгүй
              </p>
            </div>
          </div>

          <div className="flex-grow px-6 absolute w-full bottom-6 box-border flex flex-col gap-2 justify-center">
            <ButtonBase
              sx={{
                backgroundColor: colors.black0,
                paddingX: "8px",
                paddingY: "12px",
                borderRadius: "8px",
              }}
              onClick={() => history.goBack()}
            >
              <p className="text-airaloText text-xs ">Өөр төхөөрөмж сонгох</p>
            </ButtonBase>
            <ButtonBase
              sx={{
                backgroundColor: colors.primary,
                paddingX: "8px",
                paddingY: "12px",
                borderRadius: "8px",
              }}
              onClick={handleButton}
            >
              <p className="text-black0 text-xs font-bold">Үргэлжлүүлэх</p>
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetail;
