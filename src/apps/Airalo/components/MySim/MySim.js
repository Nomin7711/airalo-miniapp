import { useGetEsims } from "@airalo/api/useGetEsims";
import { useHpsUserLogin } from "@airalo/api/useHpsUserLogin";
import SimDetail from "@airalo/components/SimDetail";
import { fetchUserAiralo } from "@airalo/redux/slices/mainSlice";
import notFound from "@assets/notFound.png";
import Loader from "@components/Loader";
import { setTokenAiralo, setTokenTravelsim } from "@config/apiClient";
import { colors } from "@constants/colors";
import { ButtonBase, CircularProgress } from "@mui/material";
import { useHpsTraveilsimLogin } from "@travelsim/api/useHpsTraveilsimLogin";
import {
  useMutateTravelsimList,
  useTravelsimList,
} from "@travelsim/api/useTravelsimList";
import TravelsimDetail from "@travelsim/components/TravelsimDetail";
import { fetchUserTravelsim } from "@travelsim/redux/slices/mainSlice";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function PlatformChecker() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "ios";
  } else if (/android/i.test(userAgent)) {
    return "android";
  } else {
    return "unknown";
  }
}
const MySim = ({ selected, setSelected }) => {
  const { data, isLoading: esimLoading } = useGetEsims();
  const [hasTokenTravelsim, setHasTokenTravelsim] = useState(false);
  const [simArray, setSimArray] = useState([]);
  const { mutateAsync, isLoading: loginLoading } = useHpsTraveilsimLogin();
  const { mutateAsync: travelsimAsync, isLoading: travelsimLoading } =
    useMutateTravelsimList();
  const [filteredData, setFilteredData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setFilteredData(data);
      if (selected === "new") {
        const filtered = data?.filter((d) => d?.status !== "EXPIRED");
        setFilteredData(filtered);
      } else {
        const filtered = data?.filter((d) => d?.status === "EXPIRED");
        setFilteredData(filtered);
      }
    }
  }, [data, selected]);

  const handleTokenTravelsim = async () => {
    const tempAuthCode = await localStorage.getItem("authCode");
    try {
      const result = await mutateAsync({
        authorization_code: tempAuthCode,
      });
      if (result?.code === 1) {
        await setTokenTravelsim(result?.token);
        dispatch(fetchUserTravelsim());
        setHasTokenTravelsim(true);
      }
    } catch (error) {
      console.error("An error occurred");
      console.log(error);
    }
  };
  useEffect(() => {
    const handleTravelsimList = async () => {
      const res = await travelsimAsync();
      if (res?.code === 1) {
        setSimArray(res.data?.filter((obj) => obj?.status === 1) || []);
      }
    };
    if (hasTokenTravelsim) {
      handleTravelsimList();
    }
  }, [hasTokenTravelsim]);
  useEffect(() => {
    handleTokenTravelsim();
  }, []);

  const hasNothing =
    travelsimLoading === false &&
    esimLoading === false &&
    simArray?.length === 0 &&
    filteredData?.length === 0;
  return (
    <div className="flex flex-col flex-1 ">
      <Loader visible={esimLoading} color={colors.primary} />
      <div className="p-6 flex flex-col gap-4">
        <p className="text-[20px] text-black0 font-semibold	my-0">Миний SIM</p>
        <p className={"text-[13px] text-black0 mt-[-12px]"}>
          Esim болон биет сим.{" "}
        </p>
        <div className="grid grid-cols-2">
          <ButtonBase
            sx={{
              padding: "8px 12px",
              background: selected === "new" && colors.primary,
              borderRadius: "8px",
            }}
            onClick={() => setSelected("new")}
          >
            <p
              className={`text-xxs font-bold ${
                selected === "new" ? "text-black0" : "text-black0"
              }`}
            >
              Идэвхтэй SIM
            </p>
          </ButtonBase>
          <ButtonBase
            sx={{
              padding: "8px 12px",
              background: selected === "old" && colors.primary,
              borderRadius: "8px",
            }}
            onClick={() => setSelected("old")}
          >
            <p
              className={`${
                selected === "old" ? "text-black0" : "text-black0"
              } text-xxs font-bold`}
            >
              Хуучин SIM
            </p>
          </ButtonBase>
        </div>
      </div>

      <div className="bg-black10 flex flex-col flex-1 rounded-t-2xl px-4 py-6 space-y-6">
        {filteredData?.map((item, idx) => (
          <SimDetail selected={selected} esim={item} key={idx} />
        ))}
        {filteredData?.length > 0 && (
          <p className="text-airaloText text-xs text-center my-2 ">
            * Багцын хугацаа дуусахаас өмнө цэнэглэн үргэлжлүүлэн ашиглах
            боломжтой.
          </p>
        )}
        {simArray?.length > 0 && (
          <p className={"text-airaloText text-[18x] font-semibold"}>Биет сим</p>
        )}
        {travelsimLoading === false ? (
          simArray.map((item, idx) => (
            <TravelsimDetail item={item} key={idx} fromAiralo={true} />
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
      </div>
    </div>
  );
};

export default MySim;
