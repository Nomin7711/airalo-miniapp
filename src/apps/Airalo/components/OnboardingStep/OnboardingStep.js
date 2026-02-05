import React from "react";

const OnboardingStep = ({ img, text1, text2, desc }) => {
  return (
    <div className="h-auto pb-safe ">
      <img
        src={img}
        alt="banner"
        className="w-full"
        style={{ width: "80%", height: "auto" }}
      />
      <div className="mt-16">
        <p className="text-deepPurple font-bold text-[24px]">{text1} </p>
        <p className="text-deepPurple font-bold text-[24px]">{text2} </p>
        <p className="text-base text-deepPurple px-8 my-4">{desc}</p>
      </div>
    </div>
  );
};

export default OnboardingStep;
