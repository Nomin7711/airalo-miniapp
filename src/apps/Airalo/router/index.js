import MainLayout from "@airalo/components/MainLayout";
import ChooseState from "@airalo/screens/ChooseState";
import DeviceCheck from "@airalo/screens/DeviceCheck";
import DeviceDetail from "@airalo/screens/DeviceDetail";
import Home from "@airalo/screens/Home";
import InstallationGuide from "@airalo/screens/Installation";
import Instruction from "@airalo/screens/Instruction";
import PackageDetail from "@airalo/screens/PackageDetail";
import PackageList from "@airalo/screens/PackageList";
import TopUpPackageList from "@airalo/screens/TopUpPackageList";

export const AiraloRoutes = [
  {
    component: MainLayout,
    routes: [
      {
        path: "/airalo",
        component: Home,
        exact: true,
      },
      {
        path: "/airalo/packageList",
        component: PackageList,
        exact: true,
      },
      {
        path: "/airalo/chooseState",
        component: ChooseState,
        exact: true,
      },
      {
        path: "/airalo/topUpPackageList",
        component: TopUpPackageList,
        exact: true,
      },
      {
        path: "/airalo/deviceInfo",
        component: DeviceCheck,
        exact: true,
      },
      {
        path: "/airalo/deviceDetail",
        component: DeviceDetail,
        exact: true,
      },
      {
        path: "/airalo/packageDetail",
        component: PackageDetail,
        exact: true,
      },
      {
        path: "/airalo/instruction",
        component: Instruction,
        exact: true,
      },
      {
        path: "/airalo/installation",
        component: InstallationGuide,
        exact: true,
      },
    ],
  },
];
