import MainLayout from "@travelsim/components/MainLayout";
import ScanBarcode from "@travelsim/screens/ScanBarcode";
import Travelsim from "@travelsim/screens/Travelsim";
import TravelSimCharge from "@travelsim/screens/TravelSimCharge";
import TravelsimChooseState from "@travelsim/screens/TravelsimChooseState";
import TravelSimPackage from "@travelsim/screens/TravelSimPackage";

export const MainRoutes = [
  {
    component: MainLayout,
    routes: [
      {
        path: "/travelsim",
        component: Travelsim,
        exact: true,
      },
      {
        path: "/travelsim/chooseState",
        component: TravelsimChooseState,
        exact: true,
      },
      {
        path: "/travelsim/packageDetails",
        component: TravelSimPackage,
        exact: true,
      },
      {
        path: "/travelsim/charge",
        component: TravelSimCharge,
        exact: true,
      },
      {
        path: "/travelsim/scanBarcode",
        component: ScanBarcode,
        exact: true,
      },
    ],
  },
];
