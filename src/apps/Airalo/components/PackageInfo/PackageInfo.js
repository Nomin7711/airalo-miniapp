import CountryModal from "@airalo/components/CountryModal";
import network from "@assets/icons/network.svg";
import Icon from "@components/Icon";
import { colors } from "@constants/colors";
import { ButtonBase } from "@mui/material";
import { handleName } from "@utils";
import React, { useState } from "react";

const PackageInfo = ({ data, coverages, countries }) => {
  const networkList = coverages?.map((coverage) => {
    const matchingCountry = countries.find(
      (country) => country.country_code === coverage.name
    );
    if (matchingCountry) {
      return {
        name: coverage?.name,
        title: matchingCountry?.title,
        networks: coverage?.networks,
        image: matchingCountry?.image,
      };
    }
  });
  const { plan_type, is_kyc_verify, rechargeability } = data || {};
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="divide-y divide-solid divide-x-0 divide-purpleOpacity space-y-4 ">
      <div className="flex justify-between">
        <div className="flex items-center gap-3">
          <img className={"h-[20px]"} src={network} alt={"network"} />
          <div>
            <p className="text-airaloText text-xs">NETWORK</p>
            {networkList?.length === 1 ? (
              <p className="text-base font-bold text-airaloText">
                {networkList?.[0]?.networks?.[0]?.name}{" "}
                {networkList?.[0]?.networks?.[0]?.types?.[0]}
              </p>
            ) : (
              <ButtonBase onClick={openModal}>
                <p className="text-[14px] font-bold text-airaloText border-solid border-[1px] px-2 border-primary rounded-sm mt-1">
                  {networkList?.length} countries
                </p>
              </ButtonBase>
            )}
            {/*{dataCoverages?.[0]?.networks?.map((coverage, idx) => (*/}
            {/*  <p className="text-base font-bold text-airaloText" key={idx}>*/}
            {/*    {coverage?.name}*/}
            {/*  </p>*/}
            {/*))}*/}
          </div>
        </div>
        <Icon icon={"ic24-info"} color={colors.airaloText} size={24} />
      </div>
      <div className="flex justify-between pt-4">
        <div className="flex items-center gap-3">
          <Icon
            icon={"ic24-sign-contract"}
            size={20}
            color={colors.airaloText}
          />
          <div>
            <p className="text-airaloText text-xs">PLAN TYPE </p>
            <p className="text-[14px] font-bold text-airaloText">
              {handleName(plan_type)}
            </p>
          </div>
        </div>
        <Icon icon={"ic24-info"} color={colors.airaloText} size={24} />
      </div>
      <div className="flex justify-between pt-4">
        <div className="flex items-center gap-3">
          <Icon icon={"ic24-stat-on"} size={20} color={colors.airaloText} />
          <div className="flex-1">
            <p className="text-airaloText text-xs">ACTIVATION POLICY</p>
            <p className="text-[14px] font-semibold text-airaloText">
              The validity period starts when the eSIM connects to any supported
              network/s.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <div className="flex items-center gap-3">
          <Icon icon={"ic24-fingerprint"} size={20} color={colors.airaloText} />
          <div className="flex-1">
            <p className="text-airaloText text-xs">
              eKYC (IDENTITY VERIFICATION)
            </p>
            <p className="text-[14px] font-bold text-airaloText">
              {is_kyc_verify ? "Required" : "Not Required"}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-4 ">
        <div className="flex items-center gap-3 mb-4">
          <Icon icon={"ic24-copy"} size={20} color={colors.airaloText} />
          <div className="flex-1">
            <p className="text-airaloText text-xs">TOP-UP OPTION</p>
            <p className="text-[14px] font-bold text-airaloText">Available</p>
          </div>
        </div>
      </div>
      <CountryModal
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        countries={networkList}
      />
    </div>
  );
};

export default PackageInfo;
