import { useGetPackageList } from "@airalo/api/useGetPackageList";
import Header from "@airalo/components/Header";
import SimDetail from "@airalo/components/SimDetail";
import help from "@assets/icons/help.svg";
import notFound from "@assets/notFound.png";
import Loader from "@components/Loader";
import { colors } from "@constants/colors";
import React from "react";
import { useHistory } from "react-router-dom";

const PackageList = ({ location }) => {
    const history = useHistory();
    const { item, selectedRegion, region } = location.state || {};
    const { data, isLoading } = useGetPackageList(selectedRegion, item?.code);

    // Flatten and collect all packages
    const allPackages = (data || []).flatMap((entry) =>
        (entry.operators || []).flatMap((operator) =>
            (operator.packages || []).map((pkg) => ({
                ...pkg,
                operatorTitle: operator?.title,
                regionTitle: entry?.title,
            }))
        )
    );

    const sortedPackages = allPackages.sort((a, b) => a.price - b.price);
    const fallbackPackages = (region?.operators?.[0]?.packages || []).sort((a, b) => a.price - b.price);

    return (
        <div className="h-screen flex flex-col">
            <Loader visible={isLoading} color={colors.primary} />
            <Header
                rightSvg={help}
                rightClick={() => {
                    history.push({
                        pathname: "/airalo/installation",
                    });
                }}
            />
            <div className="flex flex-col flex-1 overflow-y-scroll">
                <div className="p-6 flex flex-col gap-1">
                    <p className="text-[20px] text-black0 font-semibold	my-0">
                        Багц сонгох
                    </p>
                    <p className="text-[13px] text-black0">
                        ECимны багцаа сонгоно уу.
                    </p>
                </div>

                <div className="bg-black10 flex flex-col flex-1 rounded-tr-2xl rounded-tl-2xl p-6 space-y-5">
                    <p className="text-[18px] text-black85 font-semibold mb-2 w-full">
                        {data?.[0]?.title}
                    </p>

                    {isLoading ? null : sortedPackages.length > 0 ? (
                        sortedPackages.map((pkg, idx) => (
                            <SimDetail
                                item={pkg}
                                key={idx}
                                data={data}
                                regionTitle={pkg.regionTitle}
                            />
                        ))
                    ) : fallbackPackages.length > 0 ? (
                        fallbackPackages.map((item, idx) => (
                            <SimDetail
                                item={item}
                                key={idx}
                                data={data}
                                regionTitle={region?.operators?.[0]?.title}
                                region={region}
                            />
                        ))
                    ) : (
                        <div>
                            <img
                                src={notFound}
                                alt="notFound"
                                style={{ width: "100%", height: "auto", marginTop: "10%" }}
                            />
                            <p className="text-center text-black55 pt-8">
                                Санал болгох ESim олдсонгүй
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PackageList;
