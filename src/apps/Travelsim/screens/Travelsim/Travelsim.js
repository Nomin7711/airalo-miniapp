import { useMutateGetEsims } from "@airalo/api/useGetEsims";
import { useHpsUserLogin } from "@airalo/api/useHpsUserLogin";
import SimDetail from "@airalo/components/SimDetail";
import { fetchUserAiralo } from "@airalo/redux/slices/mainSlice";
import notFound from "@assets/notFound.png";
import { setTokenAiralo } from "@config/apiClient";
import {
  Box,
  ButtonBase,
  Checkbox,
  CircularProgress,
  Modal,
} from "@mui/material";
import { useTravelsimList } from "@travelsim/api/useTravelsimList";
import info from "@travelsim/assets/info.svg";
import powered from "@travelsim/assets/powered.svg";
import viber from "@travelsim/assets/viber.svg";
import wechat from "@travelsim/assets/wechat.svg";
import Header from "@travelsim/components/Header";
import TravelsimDetail from "@travelsim/components/TravelsimDetail";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Travelsim = ({ location }) => {
  const history = useHistory();
  const [openTerms, setOpenTerms] = useState(false);
  const {
    data,
    isLoading: travelsimLoading,
    isFetching: travelsimFetching,
  } = useTravelsimList();
  const {
    mutateAsync: esimAsync,
    isLoading: esimLoading,
    isFetching: esimFetching,
  } = useMutateGetEsims();
  const [tokenAira, setTokenAira] = useState(false);
  const [filteredData, setFilteredData] = useState();
  const dispatch = useDispatch();
  const { mutateAsync, isLoading: loginLoading } = useHpsUserLogin();

  useEffect(() => {
    handleToken();
  }, []);

  const handleToken = async () => {
    const tempAuthCode = await localStorage.getItem("authCode");
    try {
      const result = await mutateAsync({
        authorization_code: tempAuthCode,
      });
      if (result?.code === 1) {
        await setTokenAiralo(result?.token);
        dispatch(fetchUserAiralo());
        setTokenAira(true);
      }
    } catch (error) {
      console.error("An error occurred");
      console.log(error);
    }
  };

  useEffect(() => {
    const handleEsimFetch = async () => {
      const res = await esimAsync();
      if (res?.code === 1) {
        const filtered = res?.data?.filter((d) => d?.status !== "EXPIRED");
        setFilteredData(filtered);
      }
    };
    if (tokenAira) {
      handleEsimFetch();
    }
  }, [tokenAira]);

  const simArray = data?.data?.filter((obj) => obj?.status === 1) || [];
  const activateSim = () => {
    history.push({
      pathname: "/travelsim/scanBarCode",
    });
  };
  const hasNothing =
    travelsimLoading === false &&
    esimLoading === false &&
    simArray?.length === 0 &&
    filteredData?.length === 0; //to check if user has no sims

  const handleTermsClose = () => {
    setOpenTerms(false);
  };
  return (
    <div className="h-screen flex flex-col">
      <Header onClick={() => window.goBack()} />
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
      <div className="flex flex-col flex-1 overflow-y-auto w-full">
        <div className="p-6 flex flex-row w-full justify-between items-center">
          <div className={"flex flex-col gap-1"}>
            <p className="text-[20px] text-black0 font-semibold	">Миний сим</p>
            <p className={"text-[13px] text-black0"}>
              Таны идэвхтэй биет болон esim.{" "}
            </p>
          </div>
          <ButtonBase onClick={() => setOpenTerms(true)}>
            <img className={"w-[24px]"} src={info} alt={""} />
          </ButtonBase>
        </div>
        <div className="bg-black10 flex flex-col flex-1 rounded-tr-2xl items-center rounded-tl-2xl py-6 px-4 space-y-8 w-full relative mb-[60px]">
          {!travelsimLoading ? (
            simArray.map((item, idx) => (
              <TravelsimDetail item={item} key={idx} />
            ))
          ) : (
            <CircularProgress color="success" />
          )}

          {filteredData?.length > 0 && (
            <p
              className={"text-airaloText w-full text-[18x] font-semibold mt-2"}
            >
              Идэвхтэй eSim
            </p>
          )}
          {!esimLoading ? (
            filteredData?.map((item, idx) => (
              <SimDetail
                selected={"new"}
                esim={item}
                key={idx}
                fromTravelsim={true}
              />
            ))
          ) : (
            <CircularProgress color="success" />
          )}
          {hasNothing && (
            <div className="w-full flex flex-col items-center gap-6 ">
              <img
                src={notFound}
                alt="notFound"
                className={"opacity-50"}
                style={{
                  width: "70%",
                  height: "auto",
                  marginTop: "10%",
                  maxWidth: "200px",
                }}
              />
              <p className="text-center text-[12px] text-black55">
                Танд бүртгэлтэй сим байхгүй байна.
              </p>
            </div>
          )}
          {filteredData?.length > 0 && (
            <p className="text-airaloText text-xs text-center my-2 ">
              * Багцын хугацаа дуусахаас өмнө цэнэглэн үргэлжлүүлэн ашиглах
              боломжтой.
            </p>
          )}
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
            onClick={activateSim}
          >
            <div
              className={`w-full rounded-lg bg-primary text-[14px] font-semibold text-black0 h-[40px] flex flex-row justify-center items-center gap-2`}
            >
              Сим идэвхжүүлэх
            </div>
          </ButtonBase>
          <img className={"w-[120px]"} src={powered} alt={""} />
        </div>
      </div>
    </div>
  );
};

export default Travelsim;
