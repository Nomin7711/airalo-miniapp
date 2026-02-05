import React from "react";

const InstallationStep = ({ img, text1, text2, desc, warn }) => {
  return (
    <div className="h-[90%] pb-safe ">
      <img
        src={img}
        alt="banner"
        className="w-full"
        style={{ height: "auto", width: "180px" }}
      />
      <div className="mt-4">
        <p className="text-airaloText font-bold text-[14px]">{text1} </p>
        <p className="text-airaloText font-bold text-[14px]">{text2} </p>
        <p className="text-xxs text-airaloText px-8 my-2">{desc}</p>
        <p className="text-xxs text-hipay px-8 my-2">{warn}</p>
        <p className="text-xxs text-hipay px-8 my-2 mb-[80px]">
          Дата исим-ийг төхөөрөмжид идэвхжүүлсэн тохиолдолд буцаалт хийх
          боломжгүйг анхаарна уу. Идэвхжүүлэхээс өмнө буцаалт хийлгэх бол
          Харилцагчийн үйлчилгээний төвийн 7766-7700 дугаарт хандана уу.
        </p>
      </div>
    </div>
  );
};

export default InstallationStep;
