import "react-responsive-carousel/lib/styles/carousel.min.css";

import board1 from "@airalo/assets/img/board1.png";
import board2 from "@airalo/assets/img/board2.png";
import board3 from "@airalo/assets/img/board3.png";
import OnboardingStep from "@airalo/components/OnboardingStep";
import Icon from "@components/Icon";
import { colors } from "@constants/colors";
import { ButtonBase, IconButton } from "@mui/material";
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";

const customCarouselStyles = {
  background: "linear-gradient(0deg, #E0EFFC 0%, #EFE9FA 96.9%)",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  height: "100%",
  position: "relative",
  flex: 1,
  paddingBottom: "max(env(safe-area-inset-top), 24px)",
};
const OnboardingCarousel = ({ onFinish }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const handleCarouselChange = (index) => {
    setCurrentStep(index + 1);
  };
  const handleNextStep = () => {
    if (currentStep === 3) {
      onFinish();
    } else {
      nextStep();
    }
  };
  return (
    <div style={customCarouselStyles}>
      <div
        className="px-4 py-2 flex flex-row justify-between"
        style={{ paddingTop: "max(env(safe-area-inset-top), 24px)" }}
      >
        <IconButton onClick={window.goBack}>
          <Icon icon="ic24-chevron-left" size={24} color={colors.deepPurple} />
        </IconButton>

        <ButtonBase onClick={onFinish}>
          <p className="text-base text-deepPurple">Алгасах</p>
        </ButtonBase>
      </div>
      {/*<img*/}
      {/*  src={img}*/}
      {/*  alt={"img"}*/}
      {/*  style={{*/}
      {/*    backgroundSize: "cover",*/}
      {/*    width: "100%",*/}
      {/*    height: "auto",*/}
      {/*    position: "absolute",*/}
      {/*    alignContent: "center",*/}
      {/*    justifyItems: "center",*/}
      {/*    flex: 1,*/}
      {/*  }}*/}
      {/*/>*/}
      <Carousel
        selectedItem={currentStep - 1}
        onChange={handleCarouselChange}
        showThumbs={false}
        showArrows={false}
      >
        <div>
          <OnboardingStep
            img={board1}
            text1={"Гадаадад"}
            text2={"Дататай"}
            desc={
              " Та eSIM дэмждэг гар утсаараа Дэлхийн 25 улсад зорчихдоо GO Data-гаа ашиглаарай."
            }
          />
        </div>
        <div>
          <OnboardingStep
            img={board2}
            text1={"Бүсийн дата"}
            text2={"багцууд"}
            desc={
              "Ази тив - 14 улс, Европ тив - 39 улс, Хойд Америк тив - 3 улсуудад сүлжээ солин ашиглах боломжтой."
            }
          />
        </div>
        <div>
          <OnboardingStep
            img={board3}
            text1={"Ашиглахад"}
            text2={"хялбар"}
            desc={"Хэрэглээгээ Go DATA-раа хянаж, нэмэлт датагаа цэнэглээрэй."}
          />
        </div>
      </Carousel>

      <div className="fixed bottom-[12px] w-[100%] shadow-2xl flex items-center p-4 pb-safe">
        <ButtonBase
          sx={{
            backgroundColor: colors.primary,
            paddingY: "8px",
            borderRadius: "8px",
            width: "100%",
          }}
          onClick={handleNextStep}
        >
          <p className="text-md font-semibold text-black0">{"Цааш"}</p>
        </ButtonBase>
      </div>
    </div>
  );
};

export default OnboardingCarousel;
