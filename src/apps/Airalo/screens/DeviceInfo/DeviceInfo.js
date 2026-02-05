import { useGetDeviceList } from "@airalo/api/useGetDeviceList";
import { useMutatePayment } from "@airalo/api/useMutatePayment";
import { useMutateTopupPayment } from "@airalo/api/useMutateTopupPayment";
import Header from "@airalo/components/Header";
import Button from "@components/Button";
import Loader from "@components/Loader";
import { colors } from "@constants/colors";
import { ButtonBase } from "@mui/material";
import { handleName } from "@utils";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const DeviceButton = ({ selected, setSelected }) => {
  return (
    <div className="grid grid-cols-2 py-2">
      <ButtonBase
        sx={{
          paddingY: "12px",
          borderRadius: "8px",
          background: selected === "ios" && colors.primary,
        }}
        onClick={() => setSelected("ios")}
      >
        <p
          className={`${
            selected === "ios" ? "text-black0" : "text-primary"
          } font-bold text-xs`}
        >
          iOS
        </p>
      </ButtonBase>
      <ButtonBase
        sx={{
          paddingY: "12px",
          borderRadius: "8px",
          background: selected === "android" ? colors.primary : colors.black0,
        }}
        onClick={() => setSelected("android")}
      >
        <p
          className={`${
            selected === "android" ? "text-black0" : "text-primary"
          } font-bold text-xs`}
        >
          Android
        </p>
      </ButtonBase>
    </div>
  );
};

const DeviceInfo = () => {
  const history = useHistory();
  const {
    item: item,
    data: countryData,
    selectedRegion,
    topUpPayment,
    esim,
    region,
    hideButton,
  } = history?.location?.state || {};
  const [selected, setSelected] = useState("ios");
  const [dataTemp, setDataTemp] = useState("ios");
  const [selectedBrand, setSelectedBrand] = useState();
  const { data, isLoading } = useGetDeviceList();
  const [nameGroup, setNameGroup] = useState();
  const [error, setError] = useState(false);
  const { mutateAsync, isLoading: paymentLoading } = useMutatePayment();
  const { mutateAsync: mutateTopUp, isLoading: topUpLoading } =
    useMutateTopupPayment();
  let fixedData = {};
  const handleData = (data) => {
    for (const item of data) {
      const { os, brand, name } = item || {};
      if (!fixedData?.[os]) {
        fixedData[os] = {};
      }
      const brandKey = brand.toLowerCase();
      if (!fixedData?.[os]?.[brandKey]) {
        fixedData[os][brandKey] = [];
      }
      if (!fixedData?.[os]?.[brandKey]?.includes(name))
        fixedData?.[os]?.[brandKey]?.push(name);
    }
    for (const os in fixedData) {
      for (const brandKey in fixedData[os]) {
        fixedData[os][brandKey].sort();
      }
    }
    setDataTemp(fixedData);
  };
  let brandGroup = [];
  if (dataTemp?.[selected]) {
    brandGroup = Object.keys(dataTemp[selected]);
  }
  useEffect(() => {
    if (data) {
      handleData(data);
    }
    if (selected === "ios") {
      setSelectedBrand("Apple");
      setNameGroup(fixedData?.[selected]?.["apple"]);
    } else {
      setSelectedBrand("Samsung");
      setNameGroup(fixedData?.[selected]?.["samsung"]);
    }
  }, [selected, data]);
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
    <div className="flex flex-col h-screen justify-between bg-black10 ">
      <Loader
        visible={isLoading || paymentLoading || topUpLoading}
        color={colors.primary}
      />
      <div className="divide-y divide-solid divide-x-0 divide-[#9180B9]">
        {/*<Header rightIcon={"ic20-more-hor"} />*/}
        <Header />
        <div className="bg-deepPurple px-4 text-center rounded-br-2xl rounded-bl-2xl">
          <DeviceButton selected={selected} setSelected={setSelected} />
          <p className="text-black0 font-bold text-[22px] py-4 text-start">
            eSIM шалгах
          </p>
        </div>
      </div>

      <div className="bg-black10 flex flex-col h-full flex-1 p-6 divide-y divide-solid divide-x-0 divide-[#9180B9] gap-4 overflow-y-scroll">
        <p className="text-deepPurple text-sm font-bold">
          Дараах гар утасны төрлүүдэд eSIM-г суулгах боломжтой:
        </p>
        <div className="pt-4 space-x-2 space-y-2 ">
          {brandGroup?.map((brand, idx) => (
            <ButtonBase
              key={idx}
              sx={{
                padding: "8px",
                borderRadius: "8px",
                background:
                  selectedBrand?.toLowerCase() === brand?.toLowerCase()
                    ? colors.primary
                    : colors.purple,
              }}
              onClick={() => {
                setSelectedBrand(brand);
                setNameGroup(dataTemp[selected][brand]);
              }}
            >
              <p className={`text-black0 font-bold text-xs`}>
                {handleName(brand)}
              </p>
            </ButtonBase>
          ))}
          <div className="pt-2 pb-[150px]">
            <p className="text-deepPurple text-sm font-bold">
              {handleName(selectedBrand)}
            </p>
            {nameGroup?.map((name, idx) => (
              <p key={idx} className="text-deepPurple text-xs">
                {handleName(name)}
              </p>
            ))}
          </div>
        </div>
      </div>
      {!hideButton && (
        <Button
          text={"Зөвшөөрч байна"}
          bgColor={"#13F0A9"}
          onClick={handleButton}
          hasTerm={true}
        />
      )}
    </div>
  );
};

export default DeviceInfo;
