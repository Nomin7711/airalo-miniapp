import Icon from "@components/Icon";
import Loader from "@components/Loader";
import { colors } from "@constants/colors";
import {
  Box,
  ButtonBase,
  Checkbox,
  CircularProgress,
  Drawer,
  Modal,
  Snackbar,
} from "@mui/material";
import Fade from "@mui/material/Fade";
import { useTravelsimSetPayment } from "@travelsim/api/useTravelsimSetPayment";
import cellular from "@travelsim/assets/cellular.svg";
import powered from "@travelsim/assets/powered.svg";
import viber from "@travelsim/assets/viber.svg";
import warning from "@travelsim/assets/warning.svg";
import wechat from "@travelsim/assets/wechat.svg";
import Header from "@travelsim/components/Header";
import { travelsimCountries } from "@travelsim/utils/countries";
import { formatNumber } from "@utils";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const PackageItem = ({ item, onClick }) => {
  return (
    <ButtonBase onClick={onClick} style={{ width: "100%", borderRadius: 12 }}>
      <div
        className={
          "w-full bg-[#EFE9FA] relative rounded-xl px-4 py-4 flex flex-col justify-between gap-4"
        }
      >
        <div
          className={"w-full flex flex-col gap-2 justify-between items-start"}
        >
          <div
            className={
              "w-full justify-between flex flex-row gap-1 items-center"
            }
          >
            <div className={"flex flex-row gap-1 items-center"}>
              <Icon
                icon={"ic20-import-export"}
                size={18}
                color={colors.black70}
              />
              <span className={"text-[13px] font-medium text-black70"}>
                Дата
              </span>
            </div>

            <span className={"text-[14px] font-semibold text-deepPurple"}>
              {item?.data === "Unlimited" ? "Хязгааргүй" : item?.data}
            </span>
          </div>

          <div
            className={
              "w-full justify-between flex flex-row gap-1 items-center"
            }
          >
            <div className={"flex flex-row gap-1 items-center"}>
              <Icon icon={"ic24-calendar"} size={18} color={colors.black70} />
              <span className={"text-[13px] font-medium text-black70"}>
                Хугацаа
              </span>
            </div>

            <span className={"text-[14px] font-semibold text-deepPurple"}>
              {item?.validity}
            </span>
          </div>
        </div>
        <div
          className={
            "flex flex-row items-end py-2 px-4 rounded-lg justify-center bg-black0 gap-2"
          }
        >
          {item?.is_free ? (
            <p className={"text-black85 text-[14px] font-semibold"}> 0₮</p>
          ) : item?.discount_percent > 0 ? (
            <>
              <p
                className={
                  "text-black55 text-[12px] line-through font-medium  flex flex-row gap-1"
                }
              >
                {`${formatNumber(item?.price)}`}
              </p>
              <p
                className={
                  "text-hipay text-[15px] font-semibold flex flex-row gap-1"
                }
              >
                {formatNumber(item?.discount_amount)} ₮
              </p>
            </>
          ) : (
            <p
              className={
                "text-black85 text-[14px] font-semibold flex flex-row gap-1"
              }
            >
              {`${formatNumber(item?.price)}₮`}
            </p>
          )}
        </div>
      </div>
    </ButtonBase>
  );
};
const normalizeString = (str) => {
  if (typeof str !== "string") {
    return "";
  }

  return str
    .replace(/\t/g, " ")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
};

const areSimilar = (str1, str2) => {
  const normalizedStr1 = normalizeString(str1);
  const normalizedStr2 = normalizeString(str2);
  return (
    normalizedStr1.includes(normalizedStr2) ||
    normalizedStr2.includes(normalizedStr1)
  );
};
const TravelSimPackage = () => {
  const history = useHistory();
  const location = useLocation();
  const [selectedPack, setSelectedPack] = useState({});
  const [open, setOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [termsChecked, setTermsChecked] = useState(false);
  const [openTerms, setOpenTerms] = useState(false);
  const [snackState, setSnackState] = useState({
    open: false,
    Transition: Fade,
    msg: "",
    type: "success",
  });
  const { pack, country, reCharging, countries, iccid } = location?.state || {};
  const { packages, operators } = pack || {};
  const freePackage = packages?.filter((x) => x?.is_free);

  const paidPackage = packages?.filter((x) => !x?.is_free);

  const { mutateAsync: toPaymentAsync, isLoading: paymentLoading } =
    useTravelsimSetPayment();

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackState({
      ...snackState,
      open: false,
    });
  };

  useEffect(() => {
    const parseOperatorsData = (data) => {
      const result = [];
      const regex = /([^,(]+)\(([^)]+)\)/g;
      let match;

      while ((match = regex.exec(data)) !== null) {
        const countryName = match[1].trim();
        const providers = match[2]
          .split(",")
          .map((provider) => provider.trim());
        result.push({ countryName, providers });
      }

      return result;
    };

    let cellularData = operators || "";
    if (cellularData.includes("USA")) {
      cellularData = cellularData.replace("USA", "United States");
    }
    cellularData = cellularData?.replace(/\t/g, " ");
    cellularData = cellularData?.replace(/\n/g, " ");

    let cellularDataArray = parseOperatorsData(cellularData);
    let includedCountries = pack?.countries?.map((country) =>
      travelsimCountries?.find(
        (travelCountry) => travelCountry.code === country?.country_code
      )
    );

    cellularDataArray.forEach((entry) => {
      const { countryName, providers } = entry;

      const country = includedCountries.find((c) =>
        areSimilar(c?.en, countryName)
      );
      if (country) {
        country.cellular = providers;
      }
    });

    setFilteredData(includedCountries);
  }, [operators, pack]);
  const toggleDrawer = (openStatus) => () => {
    setOpen(openStatus);
  };
  const handleOpenDrawer = (item) => {
    setSelectedPack(item);
    setOpen(true);
  };
  const handlePayment = async () => {
    if (!termsChecked) {
      setSnackState({
        open: true,
        Transition: Fade,
        msg: "Санамжтай уншиж танилцана уу.",
        type: "warning",
      });
    } else {
      const reqData = {
        package_id: selectedPack?.package_id,
        type: "sim",
        iccid: iccid,
      };
      try {
        const res = await toPaymentAsync(reqData);
        console.log(res);
        if (res?.code === 1) {
          if (res?.checkout_id) {
            window.hpsPayment({
              checkout_id: res?.checkout_id,
              returnScreen: `/travelsim`,
            });
          } else {
            setSnackState({
              open: true,
              Transition: Fade,
              msg: "Биет сим амжилттай цэнэглэгдлээ.",
              type: "success",
            });
            setTimeout(() => {
              history?.replace("/travelsim");
            }, 1400);
          }
        } else {
          setSnackState({
            open: true,
            Transition: Fade,
            msg: res?.message || "Биет сим цэнэглэхэд алдаа гарлаа",
            type: "warning",
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handleCheckboxChange = (event) => {
    setTermsChecked(event.target.checked);
  };
  const handleTermsClose = () => {
    setOpenTerms(false);
    setTermsChecked(false);
  };
  const showFreePackage = freePackage?.length > 0;
  return (
    <div className="h-screen flex flex-col">
      <Loader visible={false} color={colors.primary} />
      <Header travelsim={true} />
      <Snackbar
        key={"snackMsg"}
        open={snackState.open}
        TransitionComponent={snackState.Transition}
        autoHideDuration={2000}
        message={snackState.msg}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <div
          className={
            "flex flex-row items-center justify-center gap-2 w-full max-w-300px rounded-md bg-black10 p-4"
          }
        >
          <Icon
            icon={
              snackState?.type === "warning" ? "ic20-warning" : "ic20-success"
            }
            size={24}
            color={
              snackState.type === "warning" ? colors.warning : colors.success
            }
          />
          <p className={"text-[13px] text-black70 font-semibold"}>
            {snackState.msg}
          </p>
        </div>
      </Snackbar>
      <Modal open={openTerms} onClose={handleTermsClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "500px",
            p: 2,
            borderRadius: 16,
          }}
        >
          <div
            className={
              "w-full h-full bg-black0 p-4 rounded-[16px] flex flex-col gap-3 relative box-border"
            }
          >
            <ul
              className={
                "text-[12px] text-black70 h-[300px] overflow-y-auto flex flex-col gap-3 w-fit ps-4 pb-[70px]"
              }
            >
              <li>
                Та өмнө нь ДАТА БАГЦ суулгаж байсан бол тухайн багцын хугацаа
                дууссаны дараа дахин өөр БАГЦ-р цэнэглэж болно. Өмнөх багцын
                хугацаа дуусаагүй тохиолдолд дахин цэнэглэх боломжгүйг АНХААРНА
                УУ.
              </li>
              <li>
                Та өөрийн СИМ-ний ICCID дугаарыг дахин нягтална уу. Алдаатай
                оруулсан тохиолдолд өөр СИМ цэнэглэгдэх магадлалтайг анхаарна
                уу.
              </li>
              <li>
                Энэхүү дата СИМ нь суулгасан багцтай улсдаа ажиллах тул та
                тухайн улсдаа очсоны дараа гар утсандаа хийх нь илүү
                тохиромжтой.
              </li>
              <li>
                Аяллын дата СИМ-ийг утсандаа хийхээс өмнө бусад СИМ-үүдээ түр
                OFF болгох нь тохиргоо хийхэд илүү хялбар болгоно. Интернэт орж
                аяллын сим ажилласны дараа бусад СИМ-ээ асааж болно.
              </li>
              <li>
                Аяллын дата СИМ нь data roaming хэлбэрээр ажилладаг тул та
                заавал data roaming асаах хэрэгтэй.
              </li>
            </ul>
            <div
              className={
                "w-[90%] absolute bottom-0 flex flex-col gap-3 bg-black0 py-2 box-border"
              }
            >
              <div
                className={"w-full flex flex-row justify-between items-center"}
              >
                <span className={"text-[12px] font-semibold"}>
                  Холбоо барих:
                </span>
                <span
                  className={
                    "flex flex-row gap-1 items-center text-black70 text-[14px]"
                  }
                >
                  9008-8000
                  <img className={"w-[20px]"} src={viber} alt={"viber"} />
                  <img className={"w-[20px]"} src={wechat} alt={"wechat"} />
                </span>
              </div>
              <div
                className={"flex flex-row items-center w-full justify-start"}
              >
                <Checkbox
                  checked={termsChecked}
                  onChange={handleCheckboxChange}
                  name="terms"
                  color="primary"
                  sx={{ height: 20 }}
                />
                <ButtonBase
                  onClick={() => setTermsChecked((current) => !current)}
                >
                  <span className={"text-airaloText text-[11px] text-start"}>
                    Дээрх санамжийг ойлголоо. Тухайн бүтээгдэхүүнийг авахыг
                    зөвшөөрч байна.
                  </span>
                </ButtonBase>
              </div>
              <ButtonBase onClick={handleTermsClose}>
                <div
                  className={
                    "bg-black0 w-full rounded-[12px] py-2 text-center text-hipay border-[1px] border-solid border-hipay font-semibold"
                  }
                >
                  Хаах
                </div>
              </ButtonBase>
            </div>
          </div>
        </Box>
      </Modal>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            height: "90vh",
            borderRadius: "16px 16px 0px 0px",
            boxSizing: "border-box",
            paddingBottom: 0,
          },
        }}
      >
        <div
          className={
            "bg-black10 h-full flex flex-col gap-2 w-full p-5 relative"
          }
        >
          <h5
            className={
              "text-black85 text-center w-full text-[16px] font-semibold mt-1 mb-3"
            }
          >
            Баталгаажуулах
          </h5>
          {selectedPack?.is_free ? (
            <div
              className={
                "flex flex-col gap-2 rounded-[8px] px-3 py-2 border-solid shadow-md border-black25 border-[1px] "
              }
            >
              <div className={"w-full flex flex-row gap-3 items-center"}>
                <img className={"w-[40px]"} src={warning} alt={""} />

                <div className={"flex flex-col justify-center gap-2"}>
                  <p className={"my-0 text-[11px] text-black55"}>
                    Тухайн багцыг <b>Хятад, Макао, Хонгконг</b> -д ашиглах
                    боломжтой бөгөөд <b>Хятадын сүлжээнд орсон өдрийн 23:59</b>{" "}
                    цагт дуусахыг анхаарна уу.
                  </p>
                </div>
              </div>
            </div>
          ) : reCharging ? (
            <div
              className={
                "flex flex-col gap-2 rounded-[8px] px-3 py-2 border-solid shadow-md border-black25 border-[1px] "
              }
            >
              <div className={"w-full flex flex-row gap-3 items-center"}>
                <img className={"w-[40px]"} src={warning} alt={""} />

                <div className={"flex flex-col justify-center gap-2"}>
                  <p className={"my-0 text-[11px] text-black55"}>
                    Нэмж цэнэглэсэн дата нь өмнөх сим-ний хугацаа дууссан
                    тохиолдолд ашиглагдаж эхлэхийг анхаарна уу.
                  </p>
                </div>
              </div>

              {/*<p className={"my-0 text-[11px] text-black55"}>*/}
              {/*  Хэрэв буцаах хүсэлт гаргах бол travelsim.mn-ий{" "}*/}
              {/*  <span className={"text-[#09B83E]"}>Wechat 90088000,</span>{" "}*/}
              {/*  <span className={"text-[#7360f2]"}>Viber 90088000</span> дугаарт*/}
              {/*  хандана уу.*/}
              {/*</p>*/}
            </div>
          ) : null}
          <div
            className={
              "flex flex-col w-full rounded-xl bg-purpleOpacity gap-3 px-3 py-4"
            }
          >
            <div className={"w-full flex flex-row gap-3 items-center"}>
              <Icon
                icon={"ic20-import-export"}
                size={20}
                color={colors.airaloText}
              />
              <div className={"flex flex-col gap-1 flex-grow"}>
                <span className={"text-airaloText text-[14px] font-medium"}>
                  {selectedPack?.data}
                </span>
                <span className={"text-[11px] text-black55"}>Дата</span>
              </div>
            </div>
            <div className={"w-full flex flex-row gap-3 items-center"}>
              <Icon
                icon={"ic24-calendar"}
                size={20}
                color={colors.airaloText}
              />
              <div className={"flex flex-col gap-1 flex-grow"}>
                <span className={"text-airaloText text-[14px] font-medium"}>
                  {selectedPack?.validity}
                </span>
                <span className={"text-[11px] text-black55"}>Хугацаа</span>
              </div>
            </div>

            <div className={"w-full flex flex-row gap-3 items-center"}>
              <Icon icon={"ic24-tag"} size={20} color={colors.airaloText} />
              <div className={"flex flex-col gap-1 flex-grow"}>
                {selectedPack?.is_free ? (
                  <div className={"flex flex-row items-end gap-1"}>
                    <span
                      className={
                        "text-airaloText line-through text-[12px] font-medium"
                      }
                    >
                      {formatNumber(selectedPack?.price)}
                    </span>
                    <span
                      className={"text-airaloText text-[15px] font-semibold"}
                    >
                      0 ₮
                    </span>
                  </div>
                ) : (
                  <div className={"flex flex-row items-end gap-1"}>
                    {selectedPack?.discount_percent > 0 ? (
                      <>
                        <span
                          className={
                            "text-airaloText line-through text-[12px] font-medium"
                          }
                        >
                          {formatNumber(selectedPack?.price)}
                        </span>
                        <span
                          className={
                            "text-airaloText text-[14px] font-semibold"
                          }
                        >
                          {formatNumber(selectedPack?.discount_amount)} ₮
                        </span>
                      </>
                    ) : (
                      <span
                        className={"text-airaloText text-[14px] font-medium"}
                      >
                        {formatNumber(selectedPack?.price)} ₮
                      </span>
                    )}
                  </div>
                )}

                <span className={"text-[11px] text-black55"}>Үндсэн үнэ</span>
              </div>
            </div>
            <div className={"w-full flex flex-row gap-3 items-center"}>
              <Icon icon={"ic20-phone-1"} size={20} color={colors.airaloText} />
              <div className={"flex flex-col gap-1 flex-grow"}>
                <span className={"text-airaloText text-[14px] font-medium"}>
                  Биет сим
                </span>
                <span className={"text-[11px] text-black55"}>Төрөл</span>
              </div>
            </div>
          </div>
          <h5 className={"text-black85 text-[14px] font-semibold mt-3 mb-1"}>
            Ашиглах боломжтой улсууд ({countries?.length || 0})
          </h5>
          <div
            className={
              "flex flex-col flex-1 w-full h-full gap-3 max-h-[40%] overflow-y-scroll"
            }
          >
            {filteredData?.map((item, idx) => (
              <div
                key={idx}
                className={
                  "rounded-md w-full bg-black0 py-2 px-3 flex flex-row gap-3 items-center"
                }
              >
                <div
                  className={
                    "w-[40px] min-w-[40px] flex items-center rounded-sm justify-center shadow-md  object-cover overflow-hidden"
                  }
                >
                  <img
                    className={"rounded-sm w-full object-cover h-full"}
                    src={item?.src}
                    alt={""}
                  />
                </div>
                <p
                  className={
                    "my-0 text-black85 font-semibold text-[13px] text-left"
                  }
                >
                  {item?.mn}
                </p>
                <div
                  className={
                    "flex flex-col ml-auto gap-2 h-full justify-center items-end"
                  }
                >
                  {item?.cellular?.length > 0 &&
                    item?.cellular?.map((cel, celIdx) => (
                      <div
                        key={celIdx}
                        className={"flex flex-row gap-1 items-end"}
                      >
                        <span
                          className={"text-[10px] text-deepPurple font-medium"}
                        >
                          {cel}
                        </span>
                        <img className={"w-[14px]"} src={cellular} alt={""} />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div
            className={
              "absolute w-full flex flex-col items-end gap-2 bottom-0 right-0 left-0 py-3 px-4 bg-black0"
            }
          >
            <div className={"flex flex-row items-center w-full justify-start"}>
              <Checkbox
                checked={termsChecked}
                onChange={handleCheckboxChange}
                name="terms"
                color="primary"
                sx={{ height: 20 }}
              />
              <ButtonBase onClick={() => setOpenTerms(true)}>
                <span className={"text-[12px] text-black40"}>
                  <span className={"text-airaloText font-semibold"}>
                    &quot;Санамж&quot;
                  </span>
                  {"-ийг уншиж танилцсан."}
                </span>
              </ButtonBase>
            </div>

            <ButtonBase
              sx={{
                borderRadius: "8px",
                boxSizing: "border-box",
                width: "100%",
              }}
              disabled={paymentLoading}
              onClick={handlePayment}
            >
              <div
                className={`w-full rounded-lg ${
                  paymentLoading ? "bg-black25" : "bg-hipay"
                } w-full text-[14px] font-semibold text-black0 h-[40px] flex flex-row justify-center items-center gap-2`}
              >
                {paymentLoading && <CircularProgress size={18} />}
                Үргэлжлүүлэх
              </div>
            </ButtonBase>
            <img className={"w-[120px]"} src={powered} alt={""} />
          </div>
        </div>
      </Drawer>
      <div className="flex flex-col flex-1 overflow-y-scroll w-full">
        <div className="p-6 flex flex-col gap-1">
          <p className="text-[20px] text-black0 font-semibold	my-0">
            Улс сонгох
          </p>
          <p className={"text-[13px] text-black0"}>
            Биет симны багцаа сонгоно уу.{" "}
          </p>
        </div>
        <div className="bg-black10 flex flex-col items-center flex-1 rounded-tr-2xl rounded-tl-2xl p-6 gap-3 w-full relative">
          <p className="text-[18px] w-full text-black85 font-semibold	my-0">
            {pack?.title}
          </p>
          {showFreePackage && (
            <>
              <p className={"text-[14px] text-deepPurple font-semibold w-full"}>
                Үнэгүй багц
              </p>
              {freePackage?.map((item, idx) => (
                <PackageItem
                  key={idx}
                  item={item}
                  onClick={() => handleOpenDrawer(item)}
                />
              ))}
            </>
          )}
          <p className={"text-[14px] text-deepPurple font-semibold w-full"}>
            Төлбөртэй багцууд
          </p>
          <div
            className={
              "flex flex-col flex-1 items-center w-full overflow-y-scroll gap-3 relative"
            }
          >
            {paidPackage?.map((item, idx) => (
              <PackageItem
                key={idx}
                item={item}
                onClick={() => handleOpenDrawer(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TravelSimPackage;
