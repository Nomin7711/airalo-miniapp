import DataPlans from "@airalo/components/DataPlansTab";
import Header from "@airalo/components/Header";
import MySim from "@airalo/components/MySim";
import OnboardingCarousel from "@airalo/components/OnboardingCarousel";
import { airaloSelector } from "@airalo/redux/slices/mainSlice";
import dataImg from "@assets/icons/data.svg";
import dataSelected from "@assets/icons/dataSelected.svg";
import eSimImg from "@assets/icons/esim.svg";
import eSimSelected from "@assets/icons/esimSelected.svg";
import help from "@assets/icons/help.svg";
import { colors } from "@constants/colors";
import { styled, Tab, Tabs } from "@mui/material";
import queryString from "query-string";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const TabPanel = ({ children, value, index, ...props }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`home-tabpanel-${index}`}
      aria-labelledby={`home-tab-${index}`}
      className={value === index && "flex flex-1"}
      {...props}
    >
      {value === index && children}
    </div>
  );
};

function a11yProps(index) {
  return {
    id: `home-tab-${index}`,
    "aria-controls": `home-tabpanel-${index}`,
  };
}

const CustomTabs = styled(Tabs)(({ theme }) => ({
  height: 60,
  backgroundColor: colors.purpleOpacity,
  borderRadius: "16px",
  "& .MuiTabs-indicator": {
    position: "absolute",
    height: "100%",
    backgroundColor: colors.primary,
    borderRadius: "16px",
  },
}));

const CustomTab = styled(Tab)(({ theme }) => ({
  flex: 1,
  zIndex: 2,
  color: "#646E7B",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: "500",
  "&.Mui-selected": {
    color: "white",
  },
}));
const Home = () => {
  const history = useHistory();
  const result =
    queryString.parse(history.location.search, { parseBooleans: true }) || {};
  const [value, setValue] = React.useState(0);
  const [selected, setSelected] = React.useState("new");
  const [onBoarding, setOnBoarding] = React.useState(false);
  const { user } = useSelector(airaloSelector.getMain);
  const { userId } = user || {};
  const { fromInstallation } = history?.location?.state || {};
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    if (result?.description === "SUCCESS") {
      history.push("/airalo/installation");
    }
    const prev = localStorage.getItem(`onBoarding-${userId}`);
    if (prev) {
      setOnBoarding(false);
    } else {
      setOnBoarding(true);
    }
  }, []);

  useEffect(() => {
    if (fromInstallation) {
      setValue(1);
    }
  }, [fromInstallation]);
  const handleOnboardFinish = () => {
    localStorage.setItem(`onBoarding-${userId}`, true);
    setOnBoarding(false);
  };
  return (
    <div className="flex flex-col h-screen justify-between">
      {onBoarding ? (
        <OnboardingCarousel onFinish={handleOnboardFinish} />
      ) : (
        <>
          <Header
            rightSvg={help}
            rightClick={() => {
              history.push({
                pathname: "/airalo/installation",
              });
            }}
            onClick={() => {
              window.goBack();
            }}
          />

          <div className="flex flex-1 overflow-y-scroll w-full">
            {value === 0 ? (
              <TabPanel value={value} index={0}>
                <DataPlans />
              </TabPanel>
            ) : (
              <TabPanel value={value} index={1}>
                <MySim selected={selected} setSelected={setSelected} />
              </TabPanel>
            )}
          </div>

          <div className="px-6 pb-4 pt-2 bg-black10">
            <CustomTabs value={value} onChange={handleChange}>
              <CustomTab
                label={
                  <div>
                    <img
                      className={""}
                      src={value ? dataImg : dataSelected}
                      alt={"dataImg"}
                    />
                    <p className="font-bold text-[12px]">Багц авах</p>
                  </div>
                }
                {...a11yProps(0)}
              />
              <CustomTab
                label={
                  <div>
                    <img src={value ? eSimSelected : eSimImg} alt={"dataImg"} />
                    <p className="font-bold text-[12px]">Миний eSIM</p>
                  </div>
                }
                {...a11yProps(1)}
              />
            </CustomTabs>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
