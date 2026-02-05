import SearchPhone from "@airalo/components/SearchPhone";
import Icon from "@components/Icon";
import { colors } from "@constants/colors";
import { ButtonBase, IconButton, Modal, Paper } from "@mui/material";
import { handleName } from "@utils";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const DeviceModal = ({
  modalIsOpen,
  closeModal,
  selectedData,
  selected,
  item,
  region,
  esim,
  selectedRegion,
  topUpPayment,
  data,
}) => {
  const history = useHistory();
  const [filteredData, setFilteredData] = useState();
  const fixed = Object.keys(filteredData ?? {});
  useEffect(() => {
    if (selectedData) setFilteredData(selectedData);
  }, [selectedData]);
  const handleSearch = (searchTerm) => {
    const filteredData = {};
    for (const brand in selectedData) {
      const models = selectedData?.[brand].filter((model) => {
        return (
          model?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
          brand?.toLowerCase().includes(searchTerm?.toLowerCase())
        );
      });

      if (models?.length > 0) {
        filteredData[brand] = models;
      } else if (brand.toLowerCase().includes(searchTerm.toLowerCase())) {
        filteredData[brand] = selectedData?.[brand];
      }
    }
    setFilteredData(filteredData);
  };
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
          height: "85%",
          overflowY: "auto",
        }}
      >
        <div className="flex items-center justify-between">
          <p className="text-base text-airaloText font-bold text-center">
            Та өөрийн төхөөрөмжөө сонгож баталгаажуулна уу.
          </p>
          <IconButton onClick={closeModal}>
            <Icon icon="ic24-close" size={24} color={colors.airaloText} />
          </IconButton>
        </div>
        <div className="py-4">
          <SearchPhone onSearch={handleSearch} />
          {fixed?.map((fix, idx) => {
            const temp = filteredData[fix];
            return (
              <div key={idx} className="mt-3">
                <p className="text-black40 font-bold text-sm">
                  {handleName(fix)}
                </p>
                <div className="px-2 flex flex-col">
                  {temp?.map((t, tIdx) => (
                    <ButtonBase
                      key={tIdx}
                      onClick={() =>
                        history.push({
                          pathname: "/airalo/deviceDetail",
                          state: {
                            phoneName: t,
                            selected: selected,
                            data: data,
                            item: item,
                            selectedRegion: selectedRegion,
                            region: region,
                            esim: esim,
                            topUpPayment,
                          },
                        })
                      }
                    >
                      <div className="flex flex-1 justify-between p-2 ">
                        <p className="text-sm text-start flex-1 mr-4">{t}</p>
                        <Icon
                          icon="ic24-check"
                          size={16}
                          color={colors.airaloText}
                        />
                      </div>
                    </ButtonBase>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Paper>
    </Modal>
  );
};

export default DeviceModal;
