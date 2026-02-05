import Button from "@components/Button";
import React from "react";

const DirectInstruction = () => {
  return (
    <div className="divide-y divide-solid divide-x-0 divide-[#9180B9]">
      <div className="space-y-2 pb-4">
        <p className="text-deepPurple text-[18px] font-bold">
          Step 1/2 - Install eSIM
        </p>
        <p className="text-deepPurple text-xs ">
          1. Tap Install SIM, tap Continue twice and wait for a while. Your SIM
          will connect to the network, this may take a few minutes, then tap
          Done.
        </p>
        <p className="text-deepPurple text-xs ">
          2. Choose a label for your new SIM plan.
        </p>
        <p className="text-deepPurple text-xs ">
          3. Choose Primary for your default line, then tap
        </p>
        <p className="text-deepPurple text-xs ">Continue.</p>
        <p className="text-deepPurple text-xs ">
          4. Choose the Primary you want to use with iMessage and FaceTime for
          your Apple ID, then tap
        </p>
        <p className="text-deepPurple text-xs ">Continue.</p>
        <p className="text-deepPurple text-xs ">
          5. Choose your new SIM plan for cellular/mobile data, then tap
          Continue
        </p>
      </div>

      <div className="pt-4">
        <div className="bg-purpleOpacity divide-y divide-solid divide-black10 p-4 rounded-2xl divide-x-0 space-y-4">
          <div>
            <p className="text-deepPurple text-xxs ">COVERAGE</p>
            <p className="text-deepPurple text-xs font-bold mt-2">
              T-Mobile 5g
            </p>
          </div>
          <div>
            <p className="text-deepPurple text-xxs mt-4">APN</p>
            <p className="text-deepPurple text-xs font-bold mt-2">Автомат</p>
          </div>
          <div>
            <p className="text-deepPurple text-xxs mt-4">DATA ROAMING</p>
            <p className="text-deepPurple text-xs font-bold mt-2">ON болгох</p>
          </div>
        </div>
        <div className="pt-4">
          <div className="space-y-2">
            <p className="text-deepPurple text-[18px] font-bold">
              Step 2/2 - Install eSIM
            </p>
            <p className="text-deepPurple text-xs ">You sent</p>
            <p className="text-deepPurple text-xs ">
              The APN is set automatically.
            </p>
            <p className="text-deepPurple text-xs ">You sent</p>
            <p className="text-deepPurple text-xs ">
              1. Go to Cellular/Mobile Data, then select the recently downloaded
              SIM on your device. Enable the Turn On This Line toggle, then
              select your new eSIM plan for cellular/mobile data.
            </p>
            <p className="text-deepPurple text-xs ">
              2. Tap Network Selection, disable the Automatic toggle, then
              select the supported network available on the Airalo app manually
              if your SIM has connected to the wrong network.
            </p>
            <p className="text-deepPurple text-xs ">
              3. Enable the Data Roaming toggle for your new eSIM plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectInstruction;
