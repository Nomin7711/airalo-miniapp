import { useGetTopUpList } from "@airalo/api/useGetTopUpList";
import { useMutateTopupPayment } from "@airalo/api/useMutateTopupPayment";
import Header from "@airalo/components/Header";
import PackageItem from "@airalo/components/PackageItem";
import Loader from "@components/Loader";
import { colors } from "@constants/colors";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

const TopUpPackageList = () => {
  const history = useHistory();
  const location = useLocation();
  const { esim, fromTravelsim } = location.state || {};
  console.log(location?.state);
  const { data, isLoading } = useGetTopUpList(esim?.iccid);
  const { mutateAsync: mutateTopUp, isLoading: topUpLoading } =
    useMutateTopupPayment();
  return (
    <div className="h-screen flex flex-col">
      <Loader visible={isLoading || topUpLoading} color={colors.primary} />
      <Header
        onClick={() => {
          if (fromTravelsim) {
            window.location.replace("/travelsim");
          } else history.goBack();
        }}
      />
      <div>
        <p className="text-black0 font-bold text-[22px] px-6 py-4">
          Цэнэглэгч картууд
        </p>
      </div>
      <div className="bg-black10 h-full rounded-tr-2xl rounded-tl-2xl p-6 space-y-4">
        {data?.map((item, idx) => (
          <PackageItem
            key={idx}
            item={item}
            esim={esim}
            mutateTopUp={mutateTopUp}
          />
        ))}
      </div>
    </div>
  );
};

export default TopUpPackageList;
