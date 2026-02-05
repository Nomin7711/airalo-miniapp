import { useGetCountries } from "@airalo/api/useGetCountries";
import { useMutatePackageList } from "@airalo/api/useGetPackageList";
import DataButton from "@airalo/components/DataButton";
import DataItem from "@airalo/components/DataItem";
import SearchInput from "@airalo/components/SearchInput";
import Banner from "@components/Banner";
import Loader from "@components/Loader";
import { colors } from "@constants/colors";
import { CONTINENT } from "@constants/countries";
import React, { useEffect, useState } from "react";

function PlatformChecker() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    // The user agent string contains "iPad", "iPhone", or "iPod", which indicates an iOS device
    return "ios";
  } else if (/android/i.test(userAgent)) {
    // The user agent string contains "Android", which indicates an Android device
    return "android";
  } else {
    // Neither iOS nor Android was detected
    return "unknown";
  }
}
const DataPlans = () => {
  const { data, isLoading } = useGetCountries();
  const [selectedRegion, setSelectedRegion] = useState("Local");
  const [filteredData, setFilteredData] = useState([]);
  const [filteredRegion, setFilteredRegion] = useState([]);
  const [regionData, setRegionData] = useState();

  const { mutateAsync, isLoading: regionLoading } = useMutatePackageList("global");
  useEffect(() => {
    if (data) {
      const sortedData = [...data];
      sortedData.sort((a, b) => b.order_id - a.order_id);
      setFilteredData(sortedData);
    }
  }, [data]);
  const handleSearch = (searchTerm) => {
    const filtered = data
      ?.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.mn_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => a.order_id - b.order_id);
    setFilteredData(filtered);
  };
  const handleRegion = async () => {
    const res = await mutateAsync();
    if (res) {
      setRegionData(res);
      let fixedRegion = res?.filter((data) => CONTINENT.includes(data?.slug));
      setFilteredRegion(fixedRegion);
    }
  };
  useEffect(() => {
    if (selectedRegion === "Region") {
      handleRegion();
    }
  }, [selectedRegion]);
  return (
    <div className="flex flex-1 flex-col">
      <Loader visible={isLoading || regionLoading} color={colors.primary} />
      <Banner />
      <div className="bg-black10 flex flex-col flex-1 rounded-t-2xl p-6 -mt-3">
        <SearchInput onSearch={handleSearch} />
        <div className="flex grid justify-items-stretch grid-cols-2">
          <DataButton
            text={"Local"}
            textMn={"Улс"}
            onClick={() => {
              setSelectedRegion("Local");
            }}
            selectedRegion={selectedRegion}
          />
          <DataButton
            text={"Region"}
            textMn={"Бүс"}
            onClick={() => {
              setSelectedRegion("Region");
            }}
            selectedRegion={selectedRegion}
            disabled={false}
          />
        </div>
        <div className="w-full py-2 space-y-2 grid grid-cols-1">
          {selectedRegion === "Local"
            ? filteredData?.map((item, idx) => (
                <DataItem
                  key={idx}
                  item={item}
                  selectedRegion={selectedRegion?.toLowerCase()}
                />
              ))
            : filteredRegion?.map((region, idx) => (
                <DataItem
                  key={idx}
                  region={region}
                  selectedRegion={selectedRegion?.toLowerCase()}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default DataPlans;
