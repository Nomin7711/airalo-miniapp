import { JSEncrypt } from "jsencrypt";
import qs from "qs";

import { mainConfig } from "./index";

const key = mainConfig.isTest
  ? `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvzuL2xaalMS8SAoOSFcv
ys34PmjQbsEV62tiNPglwo1n0JQleHd2RMm7aAZpoBiUOpVtMGLc9IfX4O4nwKyE
3i+wAOeYLdZJUroqz01uc+mecr1btn4C78Cxx5ghJFBbEFaZXPcmA5+YBgP9O467
/YCBwEvtUeuK5u5zK9i8dA0H+ttrTIw1VgKtFtJ4IOUKjT0wV1TGobEFd7+Fx2xP
vFuWWucl4viUM7aoN3tvbcAYPmJHUU2X4LPkhHdpYUIXKhMtyc0a1LAw/MAuPIe5
vUNj7r634XQNhBcZAheQFWo8zFVcWCvbnUEo3sIvUJqVheCGISa29Y3e/kF0opSm
IwIDAQAB
-----END PUBLIC KEY-----`
  : `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2Qw9KqJLwTVo4GwUXK+l
CijVPp2ycKO+SGN8LDIT4/PyrJAZ1OEORhYaiwHGTb+0L9zJsYGpHyVFY5s9zVcw
YdgS49DqZCCadpMe2Mlw+4FXzJnBECpCU3+kKDQ+L9CUcevurR7cBhaZsJlVYe2p
jRt9M+L//szpisUqlpZQlCUwBI/hgqNVjJ9uMYWHW+fDjLUVKiizfj8Moc/U/hoE
a6YQLE2V+uJnIWqmDHv2EQwYErRu5f4GiZ6ClgJ6qF8k4eqdZyOsDYYVvLOud0OL
F2NCTy1qjoUrZed489mfGa4yTN0fROELjBEbqnaN40bkflQkt0fw2MlAJQbvE6yK
8QIDAQAB
-----END PUBLIC KEY-----`;

export const encrypt = (data) => {
  let RSAEncrypt = new JSEncrypt();
  RSAEncrypt.setPublicKey(key);
  return RSAEncrypt.encrypt(data);
};

export const generateXAPISignature = (requestData, url) => {
  try {
    let signature = `${url}`;
    const conjunction = url?.indexOf("?") > 0 ? "&" : "?";
    signature += conjunction;
    if (typeof requestData === "object") {
      signature += `${qs.stringify(requestData, { skipNulls: true })}&`;
    } else {
      signature = encodeURI(signature)
        .replace(/%5B/g, "[")
        .replace(/%5D/g, "]")
        .replace(/%25/g, "%")
        .replace(/%3A/g, ":")
        .replace(
          /[!'()*]/g,
          (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
        );
    }
    if (signature.length > 200) {
      signature = signature.slice(0, 199) + "&";
    }
    signature += `request_time=${Math.floor(Date.now() / 1000)}&`;
    signature = encrypt(signature);

    return signature;
  } catch (e) {
    return "";
  }
};
