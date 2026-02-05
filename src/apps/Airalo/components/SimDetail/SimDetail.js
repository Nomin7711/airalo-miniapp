import noImg from "@airalo/assets/card/Style-4.svg";
import CountryModal from "@airalo/components/CountryModal";
import pricetag from "@assets/icons/pricetag.svg";
import Icon from "@components/Icon";
import { colors } from "@constants/colors";
import { ButtonBase } from "@mui/material";
import { formatNumber } from "@utils";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SimDetail = ({
  item,
  data,
  selected,
  esim,
  regionTitle,
  region,
  fromTravelsim,
}) => {
  const history = useHistory();
  const { type, title, image } = data?.[0]?.operators?.[0] || {};
  const [hasImg, setHasImg] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { countries: regionCountries } = region?.operators?.[0] || {};
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const {
    operator_data,
    images,
    countries,
    expired_at,
    status,
    total,
    created_at,
  } = esim || {};
  const expire = new Date(expired_at?.split(" ")?.[0]);
  const diffDay = Math.floor((expire - new Date()) / (1000 * 60 * 60 * 24));
  const remainingData = formatNumber(esim?.remaining / 1024, 2);
  let img = new Image();
  img.src = data ? image?.url : images?.url;
  img.onload = function () {
    setHasImg(true);
  };
  img.onerror = function () {
    setHasImg(false);
  };

  const handleButton = () => {
    history.push(`/airalo/deviceInfo`, {
      data,
      item,
      selectedRegion: type ? type : region?.operators?.[0]?.type,
      region,
      esim,
      fromTravelsim,
    });
    if (fromTravelsim) {
      window.location.assign(`/airalo/deviceInfo`);
    }
  };

  const handleToCharge = () => {
    history.push(`/airalo/topUpPackageList`, {
      esim,
      fromTravelsim,
    });
    if (fromTravelsim) {
      window.location.assign(`/airalo/topUpPackageList`);
    }
  };
  const handleToPackageDetail = () => {
    history.push(`/airalo/packageDetail`, {
      esim,
      fromTravelsim,
    });
    if (fromTravelsim) {
      window.location.assign(`/airalo/packageDetail`);
    }
  };

  return (
    <>
      <div className="p-4 w-full  bg-purpleOpacity rounded-xl flex flex-col gap-3 relative my-5">
        <div className={"w-full"}>
          <div className="flex justify-between">
            <p className="text-[18px] h-[30px] flex flex-row items-start font-semibold text-black85">
              {data?.length > 0
                ? title
                : operator_data
                ? operator_data?.title
                : regionTitle}
            </p>
            <img
              src={hasImg ? (data ? image?.url : images?.url) : noImg}
              alt={"img"}
              style={{
                width: "80px",
                height: "50px",
                position: "absolute",
                right: 16,
                top: -10,
              }}
            />
          </div>
          <div className="flex flex-row justify-between items-center mt-2">
            <div className="flex flex-row gap-2 items-center">
              <Icon icon={"ic24-globe"} color={colors.airaloText} size={22} />
              <p className="text-[14px] font-semibold text-airaloText">Улс</p>
            </div>
            <p className="text-[14px] text-airaloText font-semibold">
              {data?.length > 0 ? (
                data?.[0]?.title
              ) : countries?.length === 1 ? (
                countries?.[0]?.title
              ) : (
                <ButtonBase
                  sx={{
                    padding: "4px 8px",
                    border: "1px solid #240073",
                    borderRadius: "4px",
                  }}
                  onClick={openModal}
                >
                  <p className="text-[14px] text-airaloText font-semibold">
                    {countries ? countries?.length : regionCountries?.length}{" "}
                    countries
                  </p>
                </ButtonBase>
              )}
            </p>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 items-center ">
              <Icon
                icon={"ic20-import-export"}
                color={colors.airaloText}
                size={22}
              />
              <p className="text-[14px] font-semibold text-airaloText">Дата</p>
            </div>
            <p className="text-[14px] text-airaloText font-semibold">
              {item?.data
                ? item?.data
                : remainingData > 0
                ? `${remainingData} GB/ ${total / 1024} GB`
                : "Дууссан"}
            </p>
          </div>
        </div>
        <div className="w-full">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 items-center">
              <Icon
                icon={"ic24-calendar"}
                color={colors.airaloText}
                size={22}
              />
              <p className="text-[14px] font-semibold text-airaloText">
                Хугацаа
              </p>
            </div>

            <p className="text-[14px] text-airaloText font-semibold">
              {item?.day
                ? `${item?.day} Days`
                : diffDay
                ? diffDay > 0
                  ? `${diffDay} Days`
                  : "Дууссан"
                : `${esim?.validity} Days`}
            </p>
          </div>
        </div>
        {selected && (
          <div className="w-full">
            <div className="flex justify-between items-center">
              <div className="flex flex-row gap-2 items-center">
                <Icon icon={"ic24-tag"} color={colors.airaloText} size={22} />
                <p className="text-[14px] font-semibold text-airaloText">
                  Статус
                </p>
              </div>

              <p className="text-[14px] text-airaloText font-semibold">
                {status}
              </p>
            </div>
          </div>
        )}

        <div className="w-full">
          {/*{item?.discount > 0 && (*/}
          {/*  <div className="flex justify-between items-center">*/}
          {/*    <div className="flex items-center">*/}
          {/*      <img src={pricetag} alt={""} />*/}
          {/*      <p className="p-4 text-xs font-semibold text-airaloText">Үнэ</p>*/}
          {/*    </div>*/}
          {/*    <p className="text-base text-airaloText font-bold">*/}
          {/*      {formatNumber(item?.real_price, 0)}₮*/}
          {/*    </p>*/}
          {/*  </div>*/}
          {/*)}*/}

          {selected === "new" && (
            <div className="flex grid justify-items-stretch grid-cols-2 gap-2 text-center">
              <ButtonBase
                onClick={handleToCharge}
                sx={{
                  background: colors.black0,
                  paddingY: "6px",
                  borderRadius: "8px",
                }}
              >
                <p className="text-hipay text-sm font-medium flex flex-row my-2 gap-2 items-center">
                  <Icon icon={"ic24-plus"} size={16} color={colors.hipay} />{" "}
                  Цэнэглэх
                </p>
              </ButtonBase>
              <ButtonBase
                onClick={handleToPackageDetail}
                sx={{
                  background: colors.primary,
                  paddingY: "6px",
                  borderRadius: "8px",
                }}
              >
                <p className="text-black0 text-sm font-medium flex flex-row my-2 gap-2 items-center">
                  Дэлгэрэнгүй
                </p>
              </ButtonBase>
            </div>
          )}
          {item && (
            <div className={`relative ${item?.discount > 0 && "mt-4"}`}>
              <ButtonBase
                onClick={handleButton}
                sx={{
                  background: colors.black0,
                  paddingY: "12px",
                  borderRadius: "8px",
                  width: "100%",
                }}
              >
                <p className=" flex flex-row items-end my-0 gap-3 justify-center">
                  {item?.discount > 0 && (
                    <span className={"text-[12px] line-through text-black55"}>
                      {formatNumber(item?.real_price, 0)}₮
                    </span>
                  )}

                  <span className={"text-hipay text-[16px] font-semibold"}>
                    {formatNumber(item?.price)}₮
                  </span>
                </p>
              </ButtonBase>
              {item?.discount > 0 && (
                <div
                  className={
                    "absolute top-[-15px] left-auto right-[16px] bg-black10 rounded"
                  }
                >
                  <p className="text-[#FF8A31] text-xs p-2 font-bold">
                    -{item?.discount}% off
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        <CountryModal
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
          countries={countries ? countries : regionCountries}
        />
      </div>
    </>
  );
};

export default SimDetail;
