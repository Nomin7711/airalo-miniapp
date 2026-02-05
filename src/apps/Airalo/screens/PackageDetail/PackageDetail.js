import { useGetTopUpList } from "@airalo/api/useGetTopUpList";
import { useMutateTopupPayment } from "@airalo/api/useMutateTopupPayment";
import Header from "@airalo/components/Header";
import PackageInfo from "@airalo/components/PackageInfo";
import PackageItem from "@airalo/components/PackageItem";
import StatusBox from "@airalo/components/StatusBox";
import UsedData from "@airalo/components/UsedData";
import arrow from "@assets/icons/arrow.svg";
import download from "@assets/icons/download.svg";
import help from "@assets/icons/help.svg";
import Icon from "@components/Icon";
import Loader from "@components/Loader";
import { colors } from "@constants/colors";
import {
  Box,
  ButtonBase,
  CircularProgress,
  circularProgressClasses,
  IconButton,
} from "@mui/material";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const CustomCircularProgress = ({ progress, remaining, data, total }) => {
  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        variant="determinate"
        sx={{
          color: "#E0434D",
        }}
        size={120}
        thickness={4}
        value={100}
      />
      <CircularProgress
        variant="determinate"
        sx={{
          color: colors.black0,
          animationDuration: "550ms",
          position: "absolute",
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: "round",
          },
        }}
        size={120}
        thickness={4}
        value={progress}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="text-center">
          <p className="text-[20px] text-black0 font-bold">
            {total ? total / 1024 : 0} GB
          </p>
          <p className="text-xxs text-black0 font-bold">
            {" "}
            {(remaining ? +remaining / 1024 : 0)?.toFixed(2)} GB үлдсэн
          </p>
        </div>
      </Box>
    </Box>
  );
};

const ViewInstructions = ({ esim }) => {
  const history = useHistory();
  return (
    <div className={"grid grid-cols-1"}>
      <ButtonBase
        sx={{
          background: colors.purpleOpacity,
          borderRadius: "16px",
          padding: "12px 16px",
        }}
        onClick={() => {
          history.push({
            pathname: "/airalo/instruction",
            state: { esim: esim },
          });
        }}
      >
        <div className="flex justify-between w-[100%] py-2">
          <div className="gap-2 flex text-start flex-row items-center ">
            <img src={download} alt={"download"} />
            <p className="text-sm text-airaloText">eSIM суулгах</p>
          </div>
          <img src={arrow} className={"h-[14px]"} alt={"arrow"} />
        </div>
      </ButtonBase>
    </div>
  );
};

const PackageDetail = ({ location }) => {
  const history = useHistory();
  const { esim, fromTravelsim } = location?.state || {};
  const {
    coverages,
    countries,
    operator_data,
    expired_at,
    status,
    total,
    remaining,
    data,
  } = esim || {};

  const [progress, setProgress] = React.useState(0);
  const [showAlert, setShowAlert] = React.useState(true);
  const [showWarning, setShowWarning] = React.useState(true);
  const { data: topUpList, isLoading } = useGetTopUpList(esim?.iccid);
  const { mutateAsync: mutateTopUp, isLoading: topUpLoading } =
    useMutateTopupPayment();
  useEffect(() => {
    if (esim) {
      setProgress((+esim?.remaining / +esim?.total) * 100);
    }
  }, [esim]);
  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(esim?.iccid)
      .then(() => {
        alert("Хуулагдлаа");
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };
  return (
    <div className="flex flex-col flex-1 h-screen">
      <Loader visible={isLoading || topUpLoading} color={colors.primary} />
      <Header
        rightSvg={help}
        rightClick={() => {
          history.push({
            pathname: "/airalo/installation",
          });
        }}
        onClick={() => {
          if (fromTravelsim) {
            window.location.replace("/travelsim");
          } else history.goBack();
        }}
      />
      <div className="overflow-y-scroll">
        <div className="grid grid-cols-2 px-6 pt-6 ">
          <div className="font-bold text-black0">
            <p className="text-[21px]">{operator_data?.title}</p>
            <div className="flex items-center mt-4">
              <p className="text-sm text-black25 pr-2 font-medium">
                ICCID NUMBER
              </p>
              <IconButton onClick={handleCopyToClipboard}>
                <Icon icon={"ic16-copy"} color={colors.black0} size={24} />
              </IconButton>
            </div>
            <p className="text-black0 ">{esim?.iccid}</p>
            <p className="text-xs mt-4 text-black25 font-medium">УЛС</p>
            <p className="mt-2 text-sm">
              {countries?.length === 1
                ? countries?.[0]?.title
                : `${countries?.length} улс`}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <CustomCircularProgress
              progress={progress}
              total={total}
              remaining={remaining}
              data={data}
            />
          </div>
        </div>

        <div className="mt-6 bg-black10 rounded-t-2xl p-6 pb-safe">
          {status === "ACTIVE" && showAlert && (
            <StatusBox
              pic={"ic16-check-circle"}
              text={"Тус СИМ карт амжилттай суулгагдсан байна."}
              color={"#87E25F"}
              setShowAlert={setShowAlert}
            />
          )}
          {status === "ACTIVE" && showWarning && (
            <StatusBox
              pic={"ic20-warning"}
              text={
                "СИМ картыг утаснаасаа устгахад дахин СУУЛГАХ боломжгүйг анхаарна уу."
              }
              color={"#FF3B63"}
              setShowAlert={setShowWarning}
            />
          )}
          <PackageInfo
            data={operator_data}
            coverages={coverages}
            countries={countries}
          />
          <div className="space-y-4 py-4">
            <p className="text-airaloText font-bold font-base">eSIM суулгах</p>
            <ViewInstructions esim={esim} />
            <UsedData
              progress={progress}
              data={data}
              total={total}
              remaining={remaining}
              expired_at={expired_at}
            />

            <div className="flex justify-between items-center">
              <p className="text-airaloText font-bold font-base">Цэнэглэх</p>
              <ButtonBase
                onClick={() =>
                  history.push({
                    pathname: "/airalo/topUpPackageList",
                    state: { esim },
                  })
                }
              >
                <p className="text-airaloText font-sm">Бүгд</p>
              </ButtonBase>
            </div>
            {topUpList?.map((item, idx) => (
              <PackageItem
                key={idx}
                item={item}
                esim={esim}
                mutateTopUp={mutateTopUp}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageDetail;
