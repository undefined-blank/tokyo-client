import { useState } from "react";
import QRCode from "qrcode";

const APP_URL = "http://127.0.0.1:5173";

const useQRCode = () => {
  const [qrcode, setQrcode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateQR = async (text: string) => {
    setIsLoading(true);
    try {
      const res = await QRCode.toDataURL(`${APP_URL}/${text}`);
      setQrcode(res);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { qrcode, generateQR, isLoading };
};

export default useQRCode;
