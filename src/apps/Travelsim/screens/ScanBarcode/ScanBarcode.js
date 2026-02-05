import Icon from "@components/Icon";
import Loader from "@components/Loader";
import { colors } from "@constants/colors";
import {
  ButtonBase,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";
import Fade from "@mui/material/Fade";
import { useCheckIccid } from "@travelsim/api/useCheckIccid";
import { useGetTravelsimCharges } from "@travelsim/api/useGetTravelsimCharges";
import powered from "@travelsim/assets/powered.svg";
import simSN from "@travelsim/assets/sim/simSN.svg";
import Header from "@travelsim/components/Header";
import BarcodeScanner from "@travelsim/screens/ScanBarcode/BarCodeScanner";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const ScanBarcode = ({ location }) => {
  const history = useHistory();
  const [iccid, setIccid] = useState("");
  const [checkLoading, setCheckLoading] = useState(false);
  const { mutateAsync: checkAsync, isLoading: checking } = useCheckIccid();
  const { mutateAsync: fetchCharge, isLoading: chargesLoading } =
    useGetTravelsimCharges();
  const [snackState, setSnackState] = useState({
    open: false,
    Transition: Fade,
    msg: "",
    type: "success",
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackState({
      ...snackState,
      open: false,
    });
  };
  const chooseState = () => {
    if (iccid === "") {
      setSnackState({
        open: true,
        Transition: Fade,
        msg: "Биет симний сериал дугаарыг оруулна уу.",
        type: "warning",
      });
    } else if (iccid?.length !== 20) {
      setSnackState({
        open: true,
        Transition: Fade,
        msg: "Биет симний сериал дугаар 20 оронтой байх ёстой.",
        type: "warning",
      });
    } else {
      handleCheckIccid();
    }
  };
  const handleSnChange = (value) => {
    const numericValue = value.replace(/\D/g, ""); // Remove all non-numeric characters
    if (numericValue.length <= 20) {
      setIccid(numericValue);
    }
  };
  const handleCheckIccid = async () => {
    try {
      const res = await checkAsync(iccid);
      if (res?.code === 1) {
        const checkingIccid = res?.data?.some((range) => {
          const start = range?.start;
          const end = range?.end;
          return iccid >= start && iccid <= end;
        });
        if (checkingIccid) {
          setCheckLoading(true);
          const chargeRes = await fetchCharge(iccid);
          const reCharging = chargeRes?.data?.length > 0;
          history.push({
            pathname: "/travelsim/chooseState",
            state: { iccid, reCharging },
          });
          setCheckLoading(false);
        } else {
          setSnackState({
            open: true,
            Transition: Fade,
            msg: "Бүртгэлгүй сериал дугаар байна.",
            type: "warning",
          });
        }
      } else {
        setSnackState({
          open: true,
          Transition: Fade,
          msg: res?.message || "Сериал дугаар шаардлага хангахгүй байна.",
          type: "warning",
        });
      }
    } catch (e) {
      console.log(e);
      setSnackState({
        open: true,
        Transition: Fade,
        msg: "Алдаа гарлаа. Дахин оролдоно уу.",
        type: "error",
      });
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Loader visible={checking || checkLoading} color={colors.primary} />
      <Header travelsim={true} />
      <div className="flex flex-col flex-1 overflow-y-scroll w-full">
        <div className="p-6">
          <p className="text-[20px] text-black0 font-semibold	">
            Биет сим идэвхжүүлэх
          </p>
        </div>
        <div className="bg-black10 flex flex-col items-center flex-1 rounded-tr-2xl rounded-tl-2xl p-6 space-y-4 w-full relative">
          <p className={"text-xs text-[#160046]"}>
            Та худалдан авсан сим картны ард байрлах 20 оронтой тоог оруулна уу.
          </p>
          <TextField
            margin="dense"
            type="text"
            inputProps={{
              inputMode: "numeric",
              pattern: "\\d*",
              maxLength: 20,
            }}
            fullWidth
            variant={"outlined"}
            size={"small"}
            placeholder={"ICCID"}
            onChange={(e) => handleSnChange(e.target.value)}
            value={iccid}
            sx={{ marginTop: "20px", backgroundColor: "#fff" }}
            // error={iccid.length !== 20 && iccid.length > 0}
            // helperText={
            //   iccid?.length !== 20 && iccid?.length > 0
            //     ? "ICCID нь 20 оронтой байх ёстой."
            //     : ""
            // }
            onWheel={(event) => {
              event.preventDefault();
            }}
          />
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
                "flex flex-row items-center justify-center gap-2 w-full max-w-300px rounded-md bg-black10 p-4 mt-[30px]"
              }
            >
              <Icon
                icon={
                  snackState?.type === "warning"
                    ? "ic20-warning"
                    : "ic20-success"
                }
                size={24}
                color={
                  snackState.type === "warning"
                    ? colors.warning
                    : colors.success
                }
              />
              <p className={"text-[13px] text-black70 font-semibold"}>
                {snackState.msg}
              </p>
            </div>
          </Snackbar>
          <BarcodeScanner open={open} handleClose={handleClose} />
          {/*<ButtonBase*/}
          {/*  onClick={handleOpen}*/}
          {/*  sx={{*/}
          {/*    background: colors.black0,*/}
          {/*    paddingY: "12px",*/}
          {/*    width: "100%",*/}
          {/*    borderRadius: "16px",*/}
          {/*  }}*/}
          {/*>*/}
          {/*  <p className="text-[#EE7545] text-base font-semibold ">*/}
          {/*    Bar code уншуулах*/}
          {/*  </p>*/}
          {/*</ButtonBase>*/}
          <img src={simSN} className={"w-[90%] max-w-[350px]"} alt={""} />
          <div
            className={
              "absolute w-full bottom-0 right-0 left-0 px-4 bg-black0 py-4 z-10 gap-2 flex flex-col items-end"
            }
          >
            <ButtonBase
              disabled={checking}
              onClick={chooseState}
              sx={{
                borderRadius: "8px",
                boxSizing: "border-box",
                width: "100%",
              }}
            >
              <div
                className={`w-full rounded-lg ${
                  checking ? "bg-black25" : "bg-primary"
                } w-full text-[14px] font-semibold text-black0 h-[40px] flex flex-row justify-center items-center gap-2`}
              >
                {checking && <CircularProgress size={18} />}
                Үргэлжлүүлэх
              </div>
            </ButtonBase>
            <img className={"w-[120px]"} src={powered} alt={""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanBarcode;
