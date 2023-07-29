import useQRCode from "../hooks/useQRCode";

const Bet = () => {
  const { qrcode } = useQRCode();

  return (
    <div>
      <h1>BET PAGE</h1>
      {qrcode && <img src={qrcode} />}
    </div>
  );
};

export default Bet;
