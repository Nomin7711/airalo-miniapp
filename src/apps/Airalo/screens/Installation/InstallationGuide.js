import android1 from "@airalo/assets/img/android1.png";
import android2 from "@airalo/assets/img/android2.png";
import android3 from "@airalo/assets/img/android3.png";
import android4 from "@airalo/assets/img/android4.png";
import android5 from "@airalo/assets/img/android5.png";
import android6 from "@airalo/assets/img/android6.png";
import android7 from "@airalo/assets/img/android7.png";
import android8 from "@airalo/assets/img/android8.png";
import android9 from "@airalo/assets/img/android9.png";
import ios1 from "@airalo/assets/img/ios1.png";
import ios2 from "@airalo/assets/img/ios2.png";
import ios3 from "@airalo/assets/img/ios3.png";
import ios4 from "@airalo/assets/img/ios4.png";
import ios5 from "@airalo/assets/img/ios5.png";
import ios6 from "@airalo/assets/img/ios6.png";
import ios7 from "@airalo/assets/img/ios7.png";
import ios8 from "@airalo/assets/img/ios8.png";
import Header from "@airalo/components/Header";
import InstallationStep from "@airalo/components/InstallationStep";
import { DeviceButton } from "@airalo/screens/DeviceInfo/DeviceInfo";
import { goDataAndroidUrl, goDataIosUrl } from "@constants";
import { colors } from "@constants/colors";
import { ButtonBase } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { useHistory } from "react-router-dom";

const customCarouselStyles = {
  background: colors.black10,
  backgroundRepeat: "no-repeat",
  height: "100%",
  position: "relative",
  flex: 1,
  paddingBottom: "max(env(safe-area-inset-top), 24px)",
  overflowY: "auto",
};
const iosStep = [
  {
    img: ios1,
    text1: "Та  Settings - Cellular",
    text2: "сонголтыг сонгоно",
    desc: "SIM-ээ суулгахаасаа өмнө таны төхөөрөмж тасалдалгүй интернэт холболттой эсэхийг шалгаарай. Интернэт холболтгүй үед eSIM суулгах боломжгүйг анхаарна уу.",
    btnText: "Дараах",
  },
  {
    img: ios2,
    text1: "Та  Add eSIM - Use QR Code",
    text2: "сонголтыг сонгоно",
    desc: "SIM-ээ суулгахаасаа өмнө таны төхөөрөмж тасалдалгүй интернэт холболттой эсэхийг шалгаарай. Интернэт холболтгүй үед eSIM суулгах боломжгүйг анхаарна уу.",
    btnText: "Дараах",
  },
  {
    img: ios3,
    text1: "Та  Cellular - Add eSIM",
    text2: "сонголтыг сонгоно",
    desc: "SIM-ээ суулгахаасаа өмнө таны төхөөрөмж тасалдалгүй интернэт холболттой эсэхийг шалгаарай. Интернэт холболтгүй үед eSIM суулгах боломжгүйг анхаарна уу.",
    btnText: "Дараах",
  },
  {
    img: ios4,
    text1: "Go DATA үйлчилгээний ",
    text2: "ашиглах eSIM QR уншуулна",
    desc: "Та Go DATA үйлчилгээнээс худалдаж авсан eSIM-ийн QR кодыг уншуулан суулгана. Уншуулах боломжгүй тохиолдолд Enter Details Manually сонголтыг сонгоно",
    btnText: "Дараах",
  },
  {
    img: ios5,
    text1: "eSIM-ийн мэдээлэл болох ",
    text2: "iOS SM-DP+Address , Activation Code-г хуулж оруулна",
    desc: "Та Go DATA үйлчилгээнээс худалдаж авсан eSIM-ийн SM-DP+Address , Activation Code-г хуулж оруулан Next товч дээр дарж суулгана.",

    btnText: "Дараах",
  },
  {
    img: ios6,
    text1: "Та Settings - Cellular - eSIM хэсэгт",
    text2: "Data Roaming-г идэвхижүүлнэ үү.",
    desc: "Таны суулгасан eSIM-ийн датаг ашиглахдаа Data Roaming идэвхитэй байгаа эсэхийг шалгаарай.",
    warn: "*eSIM-г устгахад дахин ашиглах боломжгүйг анхаарна уу",
    btnText: "Дараах",
  },
  {
    img: ios7,
    text1: "Та Settings - Cellular Data хэсгээс",
    text2: "шинээр суулгасан eSIM картаа сонгоно",
    desc: "Шинээр суулгасан eSIM картын дата-г гадаадад ашиглахдаа тухайн eSIM-г идэвхижүүлэх шаардлагатай.",
    warn: "*eSIM-г устгахад дахин ашиглах боломжгүйг анхаарна уу",
    btnText: "Дараах",
  },
  {
    img: ios8,
    text1: "Та Settings - Cellular - [Үүсгэсэн eSIM] - ",
    text2: "Network Selection - Automatic идэвхигүй",
    desc: "Тухайн улсад ашиглах боломжтой сүлжээг сонгон ашиглана. Ашиглах сүлжээг Миний eSIM - Дэлгэрэнгүй хэсгээс шалгана уу.",
    warn: "*eSIM-г устгахад дахин ашиглах боломжгүйг анхаарна уу",
    btnText: "Дараах",
  },
];
const androidStep = [
  {
    img: android1,
    text1: "Та  Settings - Connections",
    text2: "сонголтыг сонгоно",
    desc: "SIM-ээ суулгахаасаа өмнө таны төхөөрөмж тасалдалгүй интернэт холболттой эсэхийг шалгаарай. Интернэт холболтгүй үед eSIM суулгах боломжгүйг анхаарна уу.",
    btnText: "Дараах",
  },
  {
    img: android2,
    text1: "Та  Settings - Connections -",
    text2: "SIM card manager сонголтыг сонгоно",
    desc: "SIM-ээ суулгахаасаа өмнө таны төхөөрөмж тасалдалгүй интернэт холболттой эсэхийг шалгаарай. Интернэт холболтгүй үед eSIM суулгах боломжгүйг анхаарна уу.",
    btnText: "Дараах",
  },
  {
    img: android3,
    text1: "Та  Settings - Connections -",
    text2: "SIM card manager - Add mobile plan сонголтыг сонгоно",
    desc: "SIM-ээ суулгахаасаа өмнө таны төхөөрөмж тасалдалгүй интернэт холболттой эсэхийг шалгаарай. Интернэт холболтгүй үед eSIM суулгах боломжгүйг анхаарна уу.",
    btnText: "Дараах",
  },
  {
    img: android4,
    text1: "Та Add mobile plan - Scan carrier",
    text2: "QR code сонголтыг сонгоно",
    desc: "SIM-ээ суулгахаасаа өмнө таны төхөөрөмж тасалдалгүй интернэт холболттой эсэхийг шалгаарай. Интернэт холболтгүй үед eSIM суулгах боломжгүйг анхаарна уу.",

    btnText: "Дараах",
  },
  {
    img: android5,
    text1: "Go DATA үйлчилгээний  ",
    text2: "ашиглах eSIM QR уншуулна",
    desc: "Та Go DATA үйлчилгээнээс худалдаж авсан eSIM-ийн QR кодыг уншуулан суулгана. Уншуулах боломжгүй тохиолдолд Enter activation code сонголтыг сонгоно",

    btnText: "Дараах",
  },
  {
    img: android6,
    text1: "eSIM-ийн мэдээлэл болох",
    text2: "Android Activation Code-г хуулж оруулна",
    desc: "Та Go DATA үйлчилгээнээс худалдаж авсан eSIM-ийн Android Activation Code-г хуулж оруулан Next товч дээр дарж суулгана.",
    btnText: "Дараах",
  },
  {
    img: android7,
    text1: "Та Settings - Connections - Mobile ",
    text2: "networks - Data Roaming-г идэвхижүүлнэ үү.",
    desc: "Таны суулгасан eSIM-ийн датаг ашиглахдаа Data Roaming идэвхитэй байгаа эсэхийг шалгаарай.",
    warn: "*eSIM-г устгахад дахин ашиглах боломжгүйг анхаарна уу",
    btnText: "Дараах",
  },
  {
    img: android8,
    text1: "Та  Settings - Connections -",
    text2: "SIM card manager - Mobile data хэсэгт ашиглах eSIM-ээ сонгоно",
    desc: "Шинээр суулгасан eSIM картын дата-г гадаадад ашиглахдаа тухайн eSIM-г идэвхижүүлэх шаардлагатай.",
    warn: "*eSIM-г устгахад дахин ашиглах боломжгүйг анхаарна уу",
    btnText: "Дараах",
  },
  {
    img: android9,
    text1: "Та  Settings - Connections -",
    text2:
      "Mobile Networks - Network operators eSIM сонгох - Automatic идэвхигүй",
    desc: "Тухайн улсад ашиглах боломжтой сүлжээг сонгон ашиглана. Ашиглах сүлжээг Миний eSIM - Дэлгэрэнгүй хэсгээс шалгана уу.",
    warn: "*eSIM-г устгахад дахин ашиглах боломжгүйг анхаарна уу",
    btnText: "Дараах",
  },
];
const InstallationGuide = ({ onFinish }) => {
  const history = useHistory();
  const [selected, setSelected] = useState("ios");
  const [currentStep, setCurrentStep] = useState(1);
  const handleCarouselChange = (index) => {
    setCurrentStep(index + 1);
  };
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const handleNextStep = () => {
    const isIos = selected === "ios";
    const isLastStep = isIos
      ? currentStep === iosStep?.length
      : currentStep === androidStep?.length;
    if (isLastStep) {
      history.push({ pathname: "/airalo", state: { fromInstallation: true } });
    } else {
      nextStep();
    }
  };
  useEffect(() => {
    setCurrentStep(0);
  }, [selected]);

  const handleVideoLink = () => {
    if (selected === "ios") window.link({ url: goDataIosUrl });
    else window.link({ url: goDataAndroidUrl });
  };
  return (
    <div className="flex flex-col h-screen justify-between flex-1 bg-black10 overflow-y-scroll">
      <Header />
      <div className="bg-black0 px-4 text-center rounded-br-2xl rounded-bl-2xl ">
        <DeviceButton selected={selected} setSelected={setSelected} />
      </div>

      <div className="flex-col flex-1 " style={customCarouselStyles}>
        {selected === "ios" ? (
          <p className="text-airaloText text-[14px] font-bold text-center p-2 ">
            iPhone eSIM суулгах <br /> Алхам {currentStep}
          </p>
        ) : (
          <p className="text-airaloText text-[14px] font-bold text-center p-2 ">
            Android eSIM суулгах <br /> Алхам {currentStep}
          </p>
        )}
        <Carousel
          selectedItem={currentStep - 1}
          onChange={handleCarouselChange}
          showThumbs={false}
          showArrows={false}
        >
          {selected === "ios"
            ? iosStep?.map((step, idx) => (
                <div key={idx}>
                  <InstallationStep
                    img={step?.img}
                    text1={step?.text1}
                    text2={step?.text2}
                    desc={step?.desc}
                    warn={step?.warn}
                  />
                </div>
              ))
            : androidStep?.map((step, idx) => (
                <div key={idx}>
                  <InstallationStep
                    img={step?.img}
                    text1={step?.text1}
                    text2={step?.text2}
                    desc={step?.desc}
                    warn={step?.warn}
                  />
                </div>
              ))}
        </Carousel>
      </div>
      <div className="fixed bottom-0  w-full shadow-2xl flex-col items-center p-4 pb-safe z-10 bg-black10">
        <ButtonBase
          sx={{
            backgroundColor: colors.primary,
            paddingX: "32px",
            paddingY: "16px",
            borderRadius: "16px",
            width: "100%",
          }}
          onClick={handleNextStep}
        >
          <p className="text-sm text-black0 font-bold">{"Дараах"}</p>
        </ButtonBase>
        <ButtonBase
          sx={{
            paddingX: "32px",
            paddingY: "16px",
            borderRadius: "16px",
            width: "100%",
          }}
          onClick={handleVideoLink}
        >
          <p className="text-sm text-primary font-bold">
            {"Видео заавар үзэх"}
          </p>
        </ButtonBase>
      </div>
    </div>
  );
};

export default InstallationGuide;
