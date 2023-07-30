import useQRCode from "../hooks/useQRCode";
import FormContainer from "../components/FormContainer";
import useQueryString from "../hooks/useQueryString";
import { useMemo } from "react";

const Bet = () => {
  const { qrcode, generateQR, isLoading } = useQRCode();
  const query = useQueryString();

  const isGeneratedBet = useMemo(() => {
    const battingAmount = query.get("battingAmount");
    const opponent = query.get("opponent");
    const withAddress = query.get("withAddress");

    if (battingAmount && opponent && withAddress) {
      console.log("isGeneratedBet");
    }
  }, [query]);

  const handleGenerateBet = async ([
    battingAmount,
    withAddress,
    opponent,
  ]: string[]) => {
    try {
      const betTransaction = () => {
        console.log(battingAmount, opponent, withAddress);
      };

      betTransaction();

      generateQR(
        `bet/?battingAmount=${battingAmount}&withAddress=${withAddress}&opponent=${opponent}`
      );
    } catch (err) {
      console.error(err);
    }
  };

  console.log(isGeneratedBet);

  return (
    <div className="flex flex-col py-4 text-center items-center">
      <h1 className="text-2xl mb-8 font-bold">BETMAN</h1>

      {qrcode ? (
        <>
          <h2 className="text-xl border border-gray-400 w-fit p-1 px-2 rounded text-gray-700">
            SHARE TO OPPONENT
          </h2>
          <img className="px-24 py-8" src={qrcode} />
        </>
      ) : (
        <FormContainer
          handleGenerateBet={handleGenerateBet}
          disalbedSubmit={isLoading}
        />
      )}
    </div>
  );
};

export default Bet;
