const testConstants = {
  travelsimBaseUrl: "https://test.hipay.mn:8042/",
  airaloBaseUrl: "https://test.hipay.mn:8036/",
  travelsimClientId: "trvilsim",
  airaloClientId: "pos0004",
  isTest: true,
};
const prodConstants = {
  // travelsimBaseUrl: "https://appapi.hipay.mn/",
  travelsimBaseUrl: "https://travelsim-backend.hps.mn/",
  airaloBaseUrl: "https://airalo-backend.hps.mn/",
  travelsimClientId: "travelsm",
  airaloClientId: "godata01",
  isTest: false,
};

export const mainConfig = {
  // ...testConstants,
  ...prodConstants,
};
