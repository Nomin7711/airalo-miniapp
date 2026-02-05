import notFound from "@assets/notFound.png";
import Icon from "@components/Icon";
import Loader from "@components/Loader";
import { colors } from "@constants/colors";
import { ButtonBase, CircularProgress, Drawer, TextField } from "@mui/material";
import { useGetChargePackageList } from "@travelsim/api/useGetChargePackageList";
import Header from "@travelsim/components/Header";
import { travelsimCountries } from "@travelsim/utils/countries";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const CountryItem = ({ title, src, countryCode, onClick }) => {
  return (
    <ButtonBase onClick={onClick} className={"rounded-md w-full"}>
      <div
        className={
          "w-full bg-black0 rounded-md flex flex-row items-center justify-between px-4 py-3 h-[60px]"
        }
      >
        <div className={"flex flex-row gap-3 items-center"}>
          <div
            className={
              "w-[45px] h-[26px] flex flex-row items-center rounded-sm justify-center shadow-md  object-cover overflow-hidden"
            }
          >
            <img
              className={"rounded-sm w-full object-cover h-full"}
              src={src}
              alt={""}
            />
          </div>
          <p className={"my-0 font-medium text-[13px] text-black70 "}>
            {title}
          </p>
        </div>

        <Icon icon={"ic24-chevron-right"} size={20} color={colors.black40} />
      </div>
    </ButtonBase>
  );
};
const TravelsimChooseState = () => {
  const history = useHistory();
  const {
    mutateAsync: packageAsync,
    isLoading: packageLoading,
    isFetching,
  } = useGetChargePackageList();
  const location = useLocation();
  const { type, iccid, reCharging } = location?.state || {};

  console.log(iccid);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchPackageList = async () => {
      try {
        const res = packageAsync({ country: "", iccid });
        console.log(res);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPackageList();
  }, []);
  useEffect(() => {
    setFilteredData(travelsimCountries?.slice(0, 15));
  }, []);
  const handleSearchCountry = (value) => {
    const filteredCountries = travelsimCountries?.filter((country) => {
      return (
        country?.en.toLowerCase().includes(value.toLowerCase()) ||
        country?.mn.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredData(filteredCountries);
  };
  const toggleDrawer = (openStatus) => () => {
    setOpen(openStatus);
  };
  const handleOpenDrawer = (item) => {
    fetchSelectedPackageList(item);
    setOpen(true);
  };
  const fetchSelectedPackageList = async (item) => {
    try {
      const res = await packageAsync({ country: item?.code, iccid: iccid });
      if (res?.code === 1) {
        const filteredPackages = res?.data.filter((pack) =>
          pack?.countries?.some(
            (country) => country?.country_code === item?.code
          )
        );
        setSelectedCountry(item);
        setSelectedPackages(filteredPackages);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleToPackage = (pack) => {
    const includedCountries = pack?.countries?.map((country) =>
      travelsimCountries?.find(
        (travelCountry) => travelCountry.code === country?.country_code
      )
    );
    history.push("/travelsim/packageDetails", {
      pack: pack,
      country: selectedCountry,
      reCharging: reCharging,
      countries: includedCountries,
      iccid: iccid,
    });
  };
  return (
    <div className="h-screen flex flex-col">
      <Loader visible={isFetching} color={colors.primary} />
      <Header travelsim={true} />
      <Drawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            height: "500px",
            borderRadius: "16px 16px 0px 0px",
            boxSizing: "border-box",
            paddingBottom: 0,
            backgroundColor: "#f5f7fa",
          },
        }}
      >
        <div
          className={
            "min-h-[300px] flex-grow h-full flex flex-col gap-2 w-full py-2 px-1"
          }
        >
          {packageLoading ? (
            <div
              className={
                "w-full h-full flex flex-row flex-grow items-center justify-center"
              }
            >
              <CircularProgress color="success" />
            </div>
          ) : filteredData?.length > 0 ? (
            <>
              {selectedPackages.some(
                (item) => item?.countries?.length === 1
              ) && (
                <h5
                  className={
                    "text-black70 text-[15px] font-semibold px-4 mt-3 mb-1"
                  }
                >
                  Улсын багц
                </h5>
              )}
              <div
                className={
                  "w-full h-auto max-h-[160px] overflow-y-scroll flex flex-col gap-3 px-4 pb-[8px]"
                }
              >
                {selectedPackages?.map((pack, idx) =>
                  pack?.countries?.length === 1 ? (
                    <ButtonBase key={idx} onClick={() => handleToPackage(pack)}>
                      <div
                        className={
                          "shadow-sm rounded-md w-full bg-black0 py-3 px-3 flex flex-row gap-3 justify-between items-center"
                        }
                      >
                        <div className={"flex flex-row gap-2 items-center"}>
                          <div
                            className={
                              "w-[40px] min-w-[40px] flex items-center rounded-sm justify-center shadow-md  object-cover overflow-hidden"
                            }
                          >
                            <img
                              className={
                                "rounded-sm w-full object-cover h-full"
                              }
                              src={selectedCountry?.src}
                              alt={""}
                            />
                          </div>
                          <p
                            className={
                              "my-0 text-black70 font-medium text-[13px] text-left"
                            }
                          >
                            {pack?.title}
                          </p>
                        </div>
                        <Icon
                          icon={"ic24-chevron-right"}
                          size={16}
                          color={colors.black40}
                        />
                      </div>
                    </ButtonBase>
                  ) : null
                )}
              </div>
              {selectedPackages.some((item) => item?.countries?.length > 1) && (
                <h5
                  className={
                    "text-black70 text-[15px] font-semibold px-4 mt-3 mb-1"
                  }
                >
                  Олон улсад тохирсон багцууд
                </h5>
              )}

              <div
                className={
                  "w-full flex-grow overflow-y-scroll flex flex-col gap-3 px-4 pb-[10px]"
                }
              >
                {selectedPackages?.map((pack, idx) => {
                  const includedCountries = pack?.countries?.map((country) =>
                    travelsimCountries?.find(
                      (travelCountry) =>
                        travelCountry.code === country?.country_code
                    )
                  );
                  const displayedCountries = includedCountries.slice(0, 3);
                  const remainingCount = includedCountries.length - 3;

                  return pack?.countries?.length > 1 ? (
                    <ButtonBase key={idx} onClick={() => handleToPackage(pack)}>
                      <div
                        className={
                          "shadow-sm rounded-md w-full bg-black0 py-3 px-3 flex flex-row gap-3 justify-between"
                        }
                      >
                        <div className={"flex flex-row gap-2 items-center"}>
                          <div
                            className={
                              "w-[40px] min-w-[40px] flex items-center rounded-sm justify-center shadow-md  object-cover overflow-hidden"
                            }
                          >
                            <img
                              className={
                                "rounded-sm w-full object-cover h-full"
                              }
                              src={selectedCountry?.src}
                              alt={""}
                            />
                          </div>
                          <p
                            className={
                              "my-0 text-black70 font-medium text-[13px] text-left"
                            }
                          >
                            {pack?.title}
                          </p>
                        </div>
                        <div
                          className={
                            "flex flex-row gap-0 w-[35%] justify-end items-center"
                          }
                        >
                          {displayedCountries?.map((count, countIdx) => (
                            <div
                              key={countIdx}
                              className={
                                "w-[24px] min-w-[24px] h-[24px] border-solid border-[1px] border-white rounded-full overflow-hidden flex items-center justify-center ml-[-6px]"
                              }
                            >
                              <img
                                className={"w-full h-full object-cover"}
                                src={count?.src}
                                alt={""}
                                key={countIdx}
                              />
                            </div>
                          ))}
                          {remainingCount > 0 && (
                            <div
                              className={
                                "text-blue-400 bg-blue-100 rounded-full w-[24px] h-[24px] min-w-[24px] font-semibold flex items-center justify-center text-[10px] ml-[-6px]"
                              }
                            >
                              +{remainingCount}
                            </div>
                          )}
                          <Icon
                            icon={"ic24-chevron-right"}
                            size={16}
                            className={"ml-1"}
                            color={colors.black40}
                          />
                        </div>
                      </div>
                    </ButtonBase>
                  ) : null;
                })}
              </div>
            </>
          ) : (
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
          )}
        </div>
      </Drawer>
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
          <TextField
            fullWidth
            variant="outlined"
            size={"small"}
            placeholder="Хайх"
            onChange={(e) => handleSearchCountry(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderRadius: "12px",
                },
              },
            }}
          />
          <p className="text-[14px] text-black70 font-semibold w-full	my-2">
            Санал болгож буй улсууд
          </p>

          <div className="space-y-2 grid grid-cols-1 w-full pb-[80px]">
            {filteredData?.length === 0 ? (
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
                <CountryItem
                  key={idx}
                  src={item?.src}
                  countryCode={item?.code}
                  title={item?.mn}
                  engTitle={item?.en}
                  onClick={() => handleOpenDrawer(item)}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelsimChooseState;
