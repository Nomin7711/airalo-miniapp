import { useGetCountries } from "@airalo/api/useGetCountries";
import { useMutatePackageList } from "@airalo/api/useGetPackageList";
import DataButton from "@airalo/components/DataButton";
import DataItem from "@airalo/components/DataItem";
import Header from "@airalo/components/Header";
import help from "@assets/icons/help.svg";
import notFound from "@assets/notFound.png";
import Loader from "@components/Loader";
import { colors } from "@constants/colors";
import { CONTINENT } from "@constants/countries";
import { ButtonBase, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const ChooseState = () => {
  const history = useHistory();
  const location = useLocation();
  const { data, isLoading } = useGetCountries();
  const [selectedRegion, setSelectedRegion] = useState("Local");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredRegion, setFilteredRegion] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [regionData, setRegionData] = useState();
  const {
    mutateAsync,
    isLoading: regionLoading,
    isFetching,
  } = useMutatePackageList("global");
  useEffect(() => {
    if (data) {
      const sortedData = [...data];
      sortedData.sort((a, b) => b.order_id - a.order_id);
      setFilteredData(sortedData);
    }
  }, [data]);
  useEffect(() => {
    if (data) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const filtered = data.filter((item) =>
        item.mn_name.toLowerCase().includes(lowerCaseSearchTerm)
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);
  const handleRegion = async () => {
    const res = await mutateAsync();
    if (res) {
      setRegionData(res);
      let fixedRegion = res?.filter((item) => CONTINENT.includes(item?.slug));
      setFilteredRegion(fixedRegion);
    }
  };
  useEffect(() => {
    if (selectedRegion === "Region") {
      handleRegion();
    }
  }, [selectedRegion]);
  console.log(location?.state);
  return (
    <div className="h-screen flex flex-col">
      <Loader visible={isLoading || isFetching} color={colors.primary} />
      <Header
        rightSvg={help}
        rightClick={() => {
          history.push({
            pathname: "/airalo/installation",
          });
        }}
      />
      <div className="flex flex-col flex-1 overflow-y-scroll w-full">
        <div className="p-6 flex flex-col gap-1">
          <p className="text-[20px] text-black0 font-semibold	my-0">
            Улс сонгох
          </p>
          <p className={"text-[13px] text-black0"}>
            {" "}
            Биет симээ ашиглах улсаа сонгоно уу.{" "}
          </p>
        </div>
        <div className="bg-black10 flex flex-col items-center flex-1 rounded-tr-2xl rounded-tl-2xl p-6 gap-3 w-full relative">
          <div className="w-full grid justify-items-stretch grid-cols-2">
            <DataButton
              text={"Local"}
              textMn={"Улс"}
              onClick={() => {
                setSelectedRegion("Local");
              }}
              selectedRegion={selectedRegion}
            />
            <DataButton
              text={"Region"}
              textMn={"Бүс"}
              onClick={() => {
                setSelectedRegion("Region");
              }}
              selectedRegion={selectedRegion}
              disabled={false}
            />
          </div>
          {selectedRegion === "Local" && (
            <TextField
              fullWidth
              variant="outlined"
              size={"small"}
              placeholder="Хайх"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderRadius: "8px",
                  },
                },
              }}
            />
          )}

          <div className="space-y-2 grid grid-cols-1 w-full pb-[80px]">
            {selectedRegion === "Local" ? (
              filteredData?.length === 0 ? (
                <div
                  className={
                    "w-full flex flex-grow flex-col items-center justify-center"
                  }
                >
                  <img
                    src={notFound}
                    alt={"notFound"}
                    style={{ width: "100%", height: "auto", marginTop: "10%" }}
                  />
                  <p className="text-center text-black55 pt-8">
                    Санал болгох улс олдсонгүй
                  </p>
                </div>
              ) : (
                filteredData?.map((item, idx) => (
                  <DataItem
                    key={idx}
                    item={item}
                    type={"physical"}
                    selectedRegion={selectedRegion?.toLowerCase()}
                  />
                ))
              )
            ) : filteredRegion?.length === 0 ? (
              <div
                className={
                  "w-full flex flex-grow flex-col items-center justify-center"
                }
              >
                <img
                  src={notFound}
                  alt={"notFound"}
                  style={{ width: "100%", height: "auto", marginTop: "10%" }}
                />
                <p className="text-center text-black55 pt-8">
                  Санал болгох бүс олдсонгүй
                </p>
              </div>
            ) : (
              filteredRegion?.map((region, idx) => (
                <DataItem
                  key={idx}
                  region={region}
                  type={"physical"}
                  selectedRegion={selectedRegion?.toLowerCase()}
                />
              ))
            )}
          </div>
          <div
            className={
              "fixed bottom-0 left-0 right-0 w-full bg-black0 px-6 pt-2 pb-10"
            }
          >
            <ButtonBase
              // onClick={chooseState}
              sx={{
                background: colors.primary,
                paddingY: "12px",
                width: "100%",
                borderRadius: "16px",
              }}
            >
              <p className="text-black0 text-base font-semibold ">
                Үргэлжлүүлэх
              </p>
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChooseState;
