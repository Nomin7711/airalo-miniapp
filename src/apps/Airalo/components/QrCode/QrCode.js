import logo from "@airalo/assets/img/logo.png";
import Button from "@components/Button";
import { ButtonBase, colors } from "@mui/material";
import { handleName } from "@utils";
import QRCode from "qrcode.react";
import React from "react";
import { useHistory } from "react-router-dom";

const QrCode = ({ esim, openModal, networkList }) => {
  const history = useHistory();
  const { qrcode, qrcode_url, operator_data, is_roaming } = esim || {};
  const isWebShareSupported = !!navigator.share;
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
    qrcode
  )}&size=200x200`;
  const handleShare = () => {
    if (isWebShareSupported) {
      navigator
        .share({
          title: "Airalo qr share",
          text: "Qr sent",
          url: qrImageUrl,
        })
        .then(() => {
          console.log("Shared successfully");
        })
        .catch((error) => {
          console.error("Error sharing:", error);
        });
    } else {
      console.log("Web Share API is not supported in this browser.");
    }
  };
  return (
    <div className="pb-safe">
      <div className="flex flex-col divide-y divide-solid divide-x-0 divide-[#9180B9] items-center p-6 pb-[100px]">
        <div className="space-y-2 pb-4 flex flex-col items-center">
          <p className="text-airaloText text-[18px] font-bold text-center">
            Алхам 1. СИМ суулгах
          </p>
          <div className="relative bg-black0 text-center w-[184px] h-[184px] flex items-center justify-center rounded-2xl">
            <QRCode
              value={qrcode}
              size={168}
              imageSettings={{ src: logo, height: 48, width: 48 }}
            />
          </div>

          <p className="text-airaloText text-xs px-6 text-center">
            SIM-ээ суулгахын тулд кодыг хэвлэх эсвэл өөр төхөөрөмж дээр харуулах
            замаар QR кодыг уншина уу. *Суулгахаасаа өмнө таны төхөөрөмж
            тогтвортой интернет холболттой эсэхийг шалгаарай.
          </p>

          <ButtonBase
            sx={{
              padding: "16px",
              border: "1px solid #EE7545",
              borderRadius: "16px",
              width: "90%",
            }}
            onClick={handleShare}
          >
            <p className="text-primary font-bold"> QR Code хуваалцах </p>
          </ButtonBase>
          <div className="pt-4 space-y-2">
            <p className="text-airaloText text-xs ">
              1. Төхөөрөмж дээрээ Settings &gt; Cellular/Mobile Data &gt; Add
              eSIM эсвэл Cellular/Mobile Service &gt; Use OR Code сонгоно
            </p>
            <p className="text-airaloText text-xs ">
              2. Go Data програм дээр байгаа QR кодыг уншаад
              &quot;Үргэлжлүүлэх&quot; дээр даран хэсэг хугацаанд хүлээнэ үү.
              Таны SIM сүлжээнд холбогдох бөгөөд үүнд хэдэн минут зарцуулагдаж,
              дараа нь &quot;Complete&quot; болно.
            </p>
            <p className="text-airaloText text-xs ">
              3. Шинэ SIM картынхаа нэрийг сонгоно.
            </p>
            <p className="text-airaloText text-xs ">
              4. Үндсэн буюу &quot;Primary&quot; сонголтыг сонгоно.
            </p>
            <p className="text-airaloText text-xs ">
              5. Apple ID дээрээ iMessage болон FaceTime-тэй ашиглах бол
              &quot;Үндсэн&quot;-ээр сонгоно.
            </p>{" "}
            <p className="text-airaloText text-xs ">
              6. Суулгасан сим картаа Үндсэн cellular/mobile data-г сонгоно.
            </p>
          </div>
        </div>

        <div className="pt-4">
          <p className="text-airaloText text-[18px] font-bold">
            Алхам 2. ДАТА идэвхжүүлэх
          </p>
          <div className="bg-purpleOpacity divide-y divide-solid divide-black10 p-4 rounded-2xl divide-x-0 space-y-4">
            <div>
              <p className="text-airaloText text-xxs ">Сүлжээ</p>
              {networkList?.length === 1 ? (
                <p className="text-base font-bold text-airaloText">
                  {networkList?.[0]?.title}
                </p>
              ) : (
                <ButtonBase onClick={openModal}>
                  <p className="text-base font-bold text-airaloText border-solid border-[1px] px-2 border-primary rounded-sm mt-1">
                    {networkList?.length} countries
                  </p>
                </ButtonBase>
              )}
            </div>
            <div>
              <p className="text-airaloText text-xxs mt-4">APN</p>
              <p className="text-airaloText text-xs font-bold mt-2">
                {handleName(operator_data?.apn_type)}
              </p>
            </div>
            {is_roaming && (
              <div>
                <p className="text-airaloText text-xxs mt-4">DATA ROAMING</p>
                <p className="text-airaloText text-xs font-bold mt-2">
                  ON болгох
                </p>
              </div>
            )}
          </div>
          <div className="pt-4 space-y-2">
            <p className="text-airaloText text-xs ">
              1. &quot;Cellular/Mobile Data&quot; руу очоод төхөөрөмж дээрээ
              шинээр суулгасан SIM-г сонго. Энэ шугамыг асаах буюу &quot;Turn On
              This Line&quot;-г идэвхжүүлнэ.
            </p>
            <p className="text-airaloText text-xs ">
              2. &quot;Сүлжээний сонголт&quot; буюу &quot;Network
              Selection&quot;-г дараад, &quot;Автомат&quot; буюу
              &quot;Automatic&quot;-г сонголтыг өөрчилж GO DATA-ийн санал болгож
              байгаа сүлжээг сонгоно.
            </p>
            <p className="text-airaloText text-xs ">
              3. Шинэ eSIM-ийн &quot;Data Roaming&quot;-г идэвхжүүлснээр Дата
              ашиглах боломжтой болно.
            </p>
          </div>
        </div>
      </div>
      <Button
        style={{ width: "100%" }}
        text={"Заавар үзэх"}
        onClick={() => history.push("/airalo/installation")}
      />
    </div>
  );
};

export default QrCode;
