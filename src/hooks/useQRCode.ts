import QRCode from "qrcode";
import { useState } from "react";

const APP_URL = "http://127.0.0.1:5173/";

const useQRCode = () => {
  const [qrcode, setQrcode] = useState("");

  const generateQR = async (text: string) => {
    try {
      const res = await QRCode.toDataURL(`${APP_URL}/${text}`);
      setQrcode(res);
    } catch (err) {
      console.error(err);
    }
  };

  return { qrcode, generateQR };
};

export default useQRCode;
