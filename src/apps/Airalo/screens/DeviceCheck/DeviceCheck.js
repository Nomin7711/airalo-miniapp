import { useGetDeviceList } from "@airalo/api/useGetDeviceList";
import img from "@airalo/assets/img/background.png";
import ios from "@airalo/assets/img/ios.png";
import samsung from "@airalo/assets/img/samsung.png";
import searchDevice from "@airalo/assets/img/searchDevice.png";
import DeviceModal from "@airalo/components/DeviceModal";
import HeaderWithNoBg from "@airalo/components/HeaderWithNoBg";
import Icon from "@components/Icon";
import Loader from "@components/Loader";
import { colors } from "@constants/colors";
import { ButtonBase } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const customCarouselStyles = {
  background: "linear-gradient(0deg, #E0EFFC 0%, #EFE9FA 96.9%)",
  backgroundRepeat: "no-repeat",
  height: "100%",
  flex: 1,
  paddingBottom: "max(env(safe-area-inset-top), 24px)",
  overflow: "hidden",
};
const DeviceCheck = () => {
  const location = useLocation();
  const {
    item: item,
    data: countryData,
    selectedRegion,
    topUpPayment,
    esim,
    region,
  } = location?.state || {};
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { data, isLoading } = useGetDeviceList();
  const [selected, setSelected] = useState();
  const [selectedData, setSelectedData] = useState();

  const [dataTemp, setDataTemp] = useState("ios");

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
  useEffect(() => {
    if (data) {
      handleData(data);
    }
  }, [data]);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const handleButton = (selected) => {
    openModal();
    setSelected(selected);
    setSelectedData(dataTemp[selected]);
  };
  return (
    <div style={customCarouselStyles}>
      <Loader visible={isLoading} color={colors.primary} />
      <HeaderWithNoBg text={"eSIM шалгах"} />
      <div className="flex flex-col h-full overflow-y-scroll">
        <div className="px-3 pt-6 pb-8 w-full flex flex-row items-center justify-center">
          <img
            src={searchDevice}
            alt={"img"}
            style={{
              width: "50%",
              minWidth: 150,
              height: "auto",
            }}
          />
        </div>

        <div>
          <p className="text-center text-base font-bold text-airaloText px-16">
            Go Data үйлчилгээнд тавтай морилно уу. Та ямар төхөөрөмж дээр
            ашиглах вэ?
          </p>
          <p className="text-center text-xs text-airaloText mt-6 px-6">
            eSIM гэдэг нь embedded SIM буюу бүх төрлийн утсанд суулгах боломжгүй
            учир та өөрийн утсаа eSIM дэмждэг эсэхийг сайн нягтлах шаардлагатай.
          </p>
          <div className="px-6 mt-6 flex flex-1 gap-4">
            <div className="bg-black0 px-2 py-4 rounded-2xl w-fit flex flex-row items-center justify-center">
              <img
                src={ios}
                alt={"ios img godata"}
                style={{
                  width: "42px",
                  height: "auto",
                }}
              />
            </div>
            <ButtonBase
              sx={{
                backgroundColor: colors.black0,
                paddingX: "8px",
                paddingY: "16px",
                borderRadius: "16px",
                flex: 1,
              }}
              onClick={() => handleButton("ios")}
            >
              <div className="flex justify-between items-center w-full px-4">
                <p className="text-airaloText text-xs ">
                  Төхөөрөмжөө сонгоно уу.
                </p>
                <Icon
                  icon="ic24-chevron-down"
                  size={24}
                  color={colors.deepPurple}
                />
              </div>
            </ButtonBase>
          </div>
          <div className="px-6 mt-6 flex flex-1 gap-4">
            <div className="bg-black0 px-2 py-4 rounded-2xl w-fit flex flex-row items-center justify-center">
              <img
                src={samsung}
                alt={"samsung img godata"}
                style={{
                  width: "42px",
                  height: "auto",
                }}
              />
            </div>

            <ButtonBase
              sx={{
                backgroundColor: colors.black0,
                paddingX: "8px",
                paddingY: "16px",
                borderRadius: "16px",
                flex: 1,
              }}
              onClick={() => handleButton("android")}
            >
              <div className="flex justify-between items-center w-full px-4">
                <p className="text-airaloText text-xs ">
                  Төхөөрөмжөө сонгоно уу.
                </p>
                <Icon
                  icon="ic24-chevron-down"
                  size={24}
                  color={colors.deepPurple}
                />
              </div>
            </ButtonBase>
          </div>
        </div>
      </div>
      <DeviceModal
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        selectedData={selectedData}
        selected={selected}
        item={item}
        selectedRegion={selectedRegion}
        topUpPayment={topUpPayment}
        esim={esim}
        region={region}
        data={countryData}
      />
    </div>
  );
};

export default DeviceCheck;
