import Icon from "@components/Icon";
import { colors } from "@constants/colors";
import { IconButton, Modal, Paper } from "@mui/material";
import React from "react";

const CountryModal = ({ modalIsOpen, closeModal, countries }) => {
  const flattenedCountries = countries?.map((country) => ({
    ...country,
    networks: country?.networks?.map((network) => network?.name).join(","),
    type: country?.networks?.map((network) => network?.types?.[0]).join(","),
  }));
  return (
    <Modal
      open={modalIsOpen}
      onClose={closeModal}
      aria-labelledby="bottom-sheet-modal"
      aria-describedby="bottom-sheet-modal-description"
    >
      <Paper
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          maxHeight: "60%",
          overflowY: "auto",
        }}
      >
        <div className="flex items-center justify-between">
          <p className="text-base text-airaloText font-bold ">
            Supported countries
          </p>
          <IconButton onClick={closeModal}>
            <Icon icon="ic24-close" size={24} color={colors.airaloText} />
          </IconButton>
        </div>

        {flattenedCountries?.map((country, idx) => (
          <div key={idx} className="flex justify-between">
            <div className="flex p-2 items-center">
              <img
                alt={""}
                src={country?.image?.url}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <p className="px-3 text-base font-medium text-black70">
                {country?.title}
              </p>
            </div>
            <div>
              <p className="px-3 text-base font-medium text-black70">
                {country?.networks} {country?.type}
              </p>
            </div>
          </div>
        ))}
      </Paper>
    </Modal>
  );
};

export default CountryModal;
