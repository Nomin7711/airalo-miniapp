import notFound from "@assets/notFound.png";
import Icon from "@components/Icon";
import Loader from "@components/Loader";
import { colors } from "@constants/colors";
import { ButtonBase, CircularProgress, Drawer, Snackbar } from "@mui/material";
import Fade from "@mui/material/Fade";
import { useGetTravelsimCharges } from "@travelsim/api/useGetTravelsimCharges";
import { useTravelsimSetPayment } from "@travelsim/api/useTravelsimSetPayment";
import powered from "@travelsim/assets/powered.svg";
import Header from "@travelsim/components/Header";
import { formatNumber } from "@utils";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const PackageItem = ({ item, onClick }) => {
  return (
    <ButtonBase onClick={onClick} style={{ width: "100%", borderRadius: 12 }}>
      <div
        className={
          "w-full bg-[#EFE9FA] relative rounded-xl px-4 py-3 flex flex-col justify-between gap-3"
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
            <span className={"text-[14px] mb-2 font-semibold  text-deepPurple"}>
              {item?.package}
            </span>
            <span className={"text-[14px] mb-2 font-semibold  text-deepPurple"}>
              {item?.data === "Unlimited" ? "Хязгааргүй" : item?.data}
            </span>
          </div>

          <div
            className={
              "w-full justify-between flex flex-row gap-1 items-center"
            }
          >
            <div className={"flex flex-row gap-1 items-center"}>
              <Icon icon={"ic24-calendar"} size={16} color={colors.black70} />
              <span className={"text-[13px] font-medium text-black70"}>
                Хугацаа
              </span>
            </div>

            <span className={"text-[13px] font-semibold text-airaloText"}>
              {item?.validity}
            </span>
          </div>
          <div
            className={
              "w-full justify-between flex flex-row gap-1 items-center"
            }
          >
            <div className={"flex flex-row gap-1 items-center"}>
              <Icon
                icon={"ic24-shopping-cart"}
                size={16}
                color={colors.black70}
              />
              <span className={"text-[13px] font-medium text-black70"}>
                Үнэ
              </span>
            </div>

            <p
              className={
                "text-airaloText text-[13px] font-semibold flex flex-row gap-1"
              }
            >
              {`${formatNumber(item?.price)}₮`}
            </p>
          </div>
          <div
            className={
              "w-full justify-between flex flex-row gap-1 items-center"
            }
          >
            <div className={"flex flex-row gap-1 items-center"}>
              <Icon icon={"ic24-ticket"} size={16} color={colors.black70} />
              <span className={"text-[13px] font-medium text-black70"}>
                Төлөв
              </span>
            </div>

            <p
              className={
                "text-airaloText text-[13px] font-semibold flex flex-row gap-1"
              }
            >
              {item?.order_status === "completed"
                ? "Баталгаажсан"
                : "Баталгаажуулж байна"}
            </p>
          </div>
          <div
            className={
              "w-full justify-between flex flex-row gap-1 items-center"
            }
          >
            <div className={"flex flex-row gap-1 items-center"}>
              <Icon icon={"ic24-time"} size={16} color={colors.black70} />
              <span className={"text-[13px] font-medium text-black70"}>
                Захиалгын огноо
              </span>
            </div>

            <p
              className={
                "text-airaloText text-[13px] font-semibold flex flex-row gap-1"
              }
            >
              {moment(item?.created_at).format("YYYY.MM.DD")}
            </p>
          </div>
        </div>
      </div>
    </ButtonBase>
  );
};
const normalizeString = (str) => {
  return str
    .replace(/\t/g, " ")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
};

const TravelSimCharge = () => {
  const history = useHistory();
  const location = useLocation();
  const [selectedPack, setSelectedPack] = useState({});
  const [open, setOpen] = useState(false);
  const [charges, setCharges] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [snackState, setSnackState] = useState({
    open: false,
    Transition: Fade,
    msg: "",
    type: "success",
  });
  const searchParams = new URLSearchParams(location.search);
  const iccid = searchParams.get("iccid");

  const { mutateAsync: fetchCharge, isLoading: chargesLoading } =
    useGetTravelsimCharges();
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
    const fetchGetCharges = async () => {
      try {
        const res = await fetchCharge(iccid);
        if (res?.code === 1) {
          setCharges(res.data);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchGetCharges();
  }, []);

  const toggleDrawer = (openStatus) => () => {
    setOpen(openStatus);
  };
  const handleOpenDrawer = (item) => {
    setSelectedPack(item);
    setOpen(true);
  };
  const handlePayment = () => {
    history.push("chooseState", {
      type: "sim",
      iccid: iccid,
      reCharging: true,
    });
  };
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
      <Drawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            height: "70vh",
            borderRadius: "16px 16px 0px 0px",
            boxSizing: "border-box",
            paddingBottom: 0,
          },
        }}
      >
        <div
          className={
            "bg-black10 h-full flex flex-col gap-2 w-full p-3 relative"
          }
        >
          <h5
            className={
              "text-black85 text-center w-full text-[16px] font-semibold mt-1 mb-3"
            }
          >
            Багцын мэдээлэл
          </h5>
          <div
            className={
              "flex flex-col bg-purpleOpacity w-full rounded-xl gap-3 px-4 py-4"
            }
          >
            <div
              className={
                "w-full justify-between flex flex-row gap-1 items-center"
              }
            >
              <span
                className={"text-[16px] mb-2 font-semibold  text-deepPurple"}
              >
                {selectedPack?.package}
              </span>
            </div>
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
              <Icon icon={"ic24-ticket"} size={20} color={colors.airaloText} />
              <div className={"flex flex-col gap-1 flex-grow"}>
                <span className={"text-airaloText text-[14px] font-medium"}>
                  {selectedPack?.order_status === "completed"
                    ? "Баталгаажсан"
                    : "Хүлээгдэж байна"}
                </span>
                <span className={"text-[11px] text-black55"}>
                  Захиалгын төлөв
                </span>
              </div>
            </div>

            <div className={"w-full flex flex-row gap-3 items-center"}>
              <Icon icon={"ic24-tag"} size={20} color={colors.airaloText} />
              <div className={"flex flex-col gap-1 flex-grow"}>
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
                        className={"text-airaloText text-[14px] font-semibold"}
                      >
                        {formatNumber(selectedPack?.discount_amount)} ₮
                      </span>
                    </>
                  ) : (
                    <span className={"text-airaloText text-[14px] font-medium"}>
                      {formatNumber(selectedPack?.price)} ₮
                    </span>
                  )}
                </div>
                <span className={"text-[11px] text-black55"}>Үндсэн үнэ</span>
              </div>
            </div>
            <div className={"w-full flex flex-row gap-3 items-center"}>
              <Icon
                icon={"ic24-globe"}
                size={20}
                className={"min-w-[20px]"}
                color={colors.airaloText}
              />
              <div
                className={"flex flex-col gap-1 max-w-full pr-4 max-w-[95%]"}
              >
                <div className={"flex flex-row gap-1 items-end w-full"}>
                  <span
                    className={
                      "text-[14px] text-airaloText font-medium truncate max-w-full"
                    }
                  >
                    {selectedPack?.operators}
                  </span>
                </div>
                <span className={"text-[11px] text-black55"}>Сүлжээ</span>
              </div>
            </div>
            <div className={"w-full flex flex-row gap-3 items-center"}>
              <Icon
                icon={"ic24-time"}
                size={20}
                className={"min-w-[20px]"}
                color={colors.airaloText}
              />
              <div className={"flex flex-col gap-1 max-w-full"}>
                <div className={"flex flex-row gap-1 items-end w-full"}>
                  <span className={"text-[14px] text-airaloText font-medium"}>
                    {moment(selectedPack?.created_at).format("YYYY.MM.DD")}
                  </span>
                </div>
                <span className={"text-[11px] text-black55"}>
                  Бүртгүүлсэн огноо
                </span>
              </div>
            </div>
          </div>
          {selectedPack?.note !== "" && (
            <>
              <h5
                className={"text-black85 text-[15px] font-semibold mt-3 mb-1"}
              >
                Дэлгэрэнгүй мэдээлэл
              </h5>
              <div
                className={
                  "flex flex-col flex-1 w-full h-full gap-3 max-h-[40%] overflow-y-scroll"
                }
              >
                <div
                  className={
                    "flex flex-col gap-2 w-full h-full relative guideTravelsim py-2"
                  }
                  dangerouslySetInnerHTML={{ __html: selectedPack?.note }}
                />
              </div>
            </>
          )}
        </div>
      </Drawer>
      <div className="flex flex-col flex-1 overflow-y-scroll w-full">
        <div className="p-6 flex flex-col gap-1">
          <p className="text-[20px] text-black0 font-semibold	my-0">
            Биет сим сунгалтын түүх
          </p>
          <p className={"text-[13px] text-black0"}>
            Биет симны цэнэглэлт хийх багцаа сонгоно уу.{" "}
          </p>
        </div>
        <div className="bg-black10 flex flex-col items-center flex-1 rounded-tr-2xl rounded-tl-2xl p-6 gap-3 w-full relative">
          <div
            className={
              "flex flex-col flex-1 items-center w-full overflow-y-scroll max-h-full gap-3 relative pb-[60px]"
            }
          >
            {chargesLoading ? (
              <div
                className={
                  "w-full h-full flex flex-row flex-grow items-center justify-center"
                }
              >
                <CircularProgress color="success" />
              </div>
            ) : charges?.length > 0 ? (
              charges?.map((item, idx) => (
                <PackageItem
                  key={idx}
                  item={item}
                  onClick={() => handleOpenDrawer(item)}
                />
              ))
            ) : (
              <div
                className={"w-full flex flex-col items-center justify-center"}
              >
                <img
                  src={notFound}
                  alt={"notFound"}
                  style={{ width: "70%", height: "auto", marginTop: "10%" }}
                />
                <p className="text-center text-[14px] text-black55 pt-8">
                  Сунгалтын түүх олдсонгүй.
                </p>
              </div>
            )}
          </div>
        </div>
        <div
          className={
            "absolute w-full bottom-0 right-0 left-0 px-4 bg-black0 py-4 z-10 gap-2 flex flex-col items-end"
          }
        >
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
                paymentLoading ? "bg-black25" : "bg-primary"
              } w-full text-[14px] font-semibold text-black0 h-[40px] flex flex-row justify-center items-center gap-2`}
            >
              {paymentLoading && <CircularProgress size={18} />}
              Цэнэглэх
            </div>
          </ButtonBase>
          <img className={"w-[120px]"} src={powered} alt={""} />
        </div>
      </div>
    </div>
  );
};

export default TravelSimCharge;
