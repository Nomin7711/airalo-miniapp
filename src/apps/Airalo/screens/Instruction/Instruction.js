import CountryModal from "@airalo/components/CountryModal";
import DirectInstruction from "@airalo/components/DirectInstruction";
import Header from "@airalo/components/Header";
import ManualInstruction from "@airalo/components/ManualInstruction";
import QrCode from "@airalo/components/QrCode";
import { colors } from "@constants/colors";
import { ButtonBase } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const InstucButton = ({ selected, setSelected }) => {
  return (
    <div className="grid grid-cols-2 py-2">
      {/*<ButtonBase*/}
      {/*  sx={{*/}
      {/*    paddingY: "12px",*/}
      {/*    borderRadius: "8px",*/}
      {/*    background: selected === "direct" && colors.purple,*/}
      {/*  }}*/}
      {/*  onClick={() => setSelected("direct")}*/}
      {/*>*/}
      {/*  <p*/}
      {/*    className={`${*/}
      {/*      selected === "direct" ? "text-black0" : "text-dimPurple"*/}
      {/*    } font-bold text-xs`}*/}
      {/*  >*/}
      {/*    Direct*/}
      {/*  </p>*/}
      {/*</ButtonBase>*/}
      <ButtonBase
        sx={{
          paddingY: "12px",
          borderRadius: "8px",
          background: selected === "qr" ? colors.primary : colors.black0,
        }}
        onClick={() => setSelected("qr")}
      >
        <p
          className={`${
            selected === "qr" ? "text-black0" : "text-primary"
          } font-bold text-xs`}
        >
          QR код
        </p>
      </ButtonBase>
      <ButtonBase
        sx={{
          paddingY: "12px",
          borderRadius: "8px",
          background: selected === "manual" ? colors.primary : colors.black0,
        }}
        onClick={() => setSelected("manual")}
      >
        <p
          className={`${
            selected === "manual" ? "text-black0" : "text-primary"
          } font-bold text-xs`}
        >
          Кодоор идэвхижүүлэх
        </p>
      </ButtonBase>
    </div>
  );
};

const Instruction = () => {
  const history = useHistory();
  const [selected, setSelected] = React.useState("qr");
  const { esim } = history?.location?.state || {};
  const { coverages, countries } = esim || {};
  const networkList = coverages.map((coverage) => {
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
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="flex flex-col h-screen justify-between bg-black10 ">
      <div className="divide-y divide-x-0 divide-[#9180B9]">
        <Header rightIcon={"ic20-more-hor"} />
        <div className="bg-black0 px-4 text-center rounded-br-2xl rounded-bl-2xl pb-2">
          <InstucButton selected={selected} setSelected={setSelected} />
        </div>
      </div>
      <div className="bg-black10 flex flex-col h-screen flex-1 overflow-y-scroll w-full">
        {selected === "direct" && <DirectInstruction />}
        {selected === "qr" && (
          <QrCode esim={esim} openModal={openModal} networkList={networkList} />
        )}
        {selected === "manual" && (
          <ManualInstruction
            esim={esim}
            openModal={openModal}
            networkList={networkList}
          />
        )}
      </div>
      <CountryModal
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        countries={networkList}
      />
    </div>
  );
};

export default Instruction;
