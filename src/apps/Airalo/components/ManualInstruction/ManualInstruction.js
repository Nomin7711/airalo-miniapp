import Button from "@components/Button";
import Icon from "@components/Icon";
import { ButtonBase, IconButton } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";

const ManualInstruction = ({ esim, openModal, networkList }) => {
  const history = useHistory();
  const { matching_id, qrcode, lpa } = esim || {};
  const handleCopyToClipboard = (item) => {
    navigator.clipboard
      .writeText(item)
      .then(() => {
        alert("Хуулагдлаа");
      })
      .catch((error) => {
        console.error("Error copying to clipboard:", error);
      });
  };
  return (
    <div className="pb-safe">
      <div className="flex flex-col divide-y divide-solid divide-x-0 divide-[#9180B9] p-6 pb-[100px]">
        <div className="space-y-2">
          <p className="text-airaloText text-[18px] font-bold ">IOS</p>

          <div className="bg-purpleOpacity divide-y divide-solid divide-black10 p-4 rounded-2xl divide-x-0 space-y-4">
            <div className="flex justify-between">
              <div className="break-all">
                <p className="text-airaloText text-xs font-bold">
                  SM-DP+ADDRESS
                </p>
                <p className="text-airaloText text-sm  mt-2">{lpa}</p>
              </div>
              <IconButton onClick={() => handleCopyToClipboard(lpa)}>
                <Icon icon={"ic24-copy"} />
              </IconButton>
            </div>
            <div className="flex justify-between">
              <div className="break-all">
                <p className="text-airaloText text-xs mt-4 font-bold">
                  ACTIVATION CODE
                </p>
                <p className="text-airaloText text-sm  mt-2">{matching_id}</p>
              </div>
              <IconButton onClick={() => handleCopyToClipboard(matching_id)}>
                <Icon icon={"ic24-copy"} />
              </IconButton>
            </div>
            <div className="flex justify-between">
              <div className="break-all">
                <p className="text-airaloText text-xs mt-4 font-bold">
                  CONFIRMATION CODE
                </p>
                <p className="text-airaloText text-sm  mt-2">
                  Хоосон байж болно.
                </p>
              </div>
            </div>
            <div>
              <p className="text-airaloText text-xxs mt-4 text-center">
                SIM-ээ суулгахын тулд энэ мэдээллийг хуулж, дэлгэрэнгүй
                мэдээллийг гараар оруулна уу. *Суулгахаасаа өмнө таны төхөөрөмж
                тогтвортой интернет холболттой эсэхийг шалгаарай.
              </p>
            </div>
          </div>
          <p className="text-airaloText text-[18px] font-bold ">Android</p>

          <div className="bg-purpleOpacity divide-y divide-solid divide-black10 p-4 rounded-2xl divide-x-0 space-y-4">
            <div className="flex justify-between flex-1">
              <div className="break-all">
                <p className="text-airaloText text-xs font-bold">
                  SM-DP+ADDRESS
                </p>
                <p className="text-airaloText text-sm  mt-2 ">{qrcode}</p>
              </div>
              <IconButton onClick={() => handleCopyToClipboard(qrcode)}>
                <Icon icon={"ic24-copy"} />
              </IconButton>
            </div>
            <div>
              <p className="text-airaloText text-xxs mt-4 text-center">
                SIM-ээ суулгахын тулд энэ мэдээллийг хуулж, дэлгэрэнгүй
                мэдээллийг гараар оруулна уу. *Суулгахаасаа өмнө таны төхөөрөмж
                тогтвортой интернет холболттой эсэхийг шалгаарай.
              </p>
            </div>
          </div>
          <p className="text-airaloText text-[18px] font-bold ">Алхам 1.</p>
          <p className="text-airaloText text-xs ">
            1. Төхөөрөмж дээрээ Settings &gt; Cellular/Mobile Data &gt; Add eSIM
            эсвэл Cellular/Mobile Service &gt; Use OR Code сонгоно
          </p>
          <p className="text-airaloText text-xs ">
            2. Механикаар идэвхижүүлэх буюу &quot;Enter Details Manually&quot;-г
            сонгоод Go Data програм дээр байгаа SM-D+ Address ба Activation
            Code-г оруулж &quot;Үргэлжлүүлэх&quot; дээр даран хэсэг хугацаанд
            хүлээнэ үү. Таны SIM сүлжээнд холбогдох бөгөөд үүнд хэдэн минут
            зарцуулагдаж, дараа нь &quot;Complete&quot; болно.
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
          </p>
          <p className="text-airaloText text-xs pb-2">
            6. Суулгасан сим картаа Үндсэн cellular/mobile data-г сонгоно.
          </p>
        </div>

        <div className="pt-4">
          <p className="text-airaloText text-[18px] font-bold">
            Алхам 2. ДАТА идэвхижүүлэх
          </p>
          <div className="bg-purpleOpacity divide-y divide-solid divide-black10 p-4 rounded-2xl divide-x-0 space-y-4">
            <div>
              <p className="text-airaloText text-xxs ">Сүлжээ</p>

              {networkList?.length === 1 ? (
                <p className="text-base font-bold text-airaloText">
                  {networkList?.[0]?.networks?.[0]?.name}{" "}
                  {networkList?.[0]?.networks?.[0]?.types?.[0]}
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
                APN автоматаар
              </p>
            </div>
            <div>
              <p className="text-airaloText text-xxs mt-4">DATA ROAMING</p>
              <p className="text-airaloText text-xs font-bold mt-2">
                ON болгох
              </p>
            </div>
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
        text={"Заавар үзэх"}
        onClick={() => history.push("/airalo/installation")}
      />
    </div>
  );
};

export default ManualInstruction;
