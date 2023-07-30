import { useState } from "react";

interface Props {
  handleGenerateBet: (args: string[]) => void;
  disalbedSubmit?: boolean;
}

const FormContainer = ({ handleGenerateBet, disalbedSubmit }: Props) => {
  const [battingAmount, setBattingAmount] = useState("");
  const [withAddress, setWithAddress] = useState("");
  const [opponent, setOpponentAddress] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleGenerateBet([battingAmount, withAddress, opponent]);
  };

  return (
    <form className="flex flex-col gap-2 p-4" onSubmit={handleSubmit}>
      <div className="flex">
        <span className="w-32 text-gray-800">Bat Amount</span>
        <input
          className="flex-1 border rounded h-8 p-2"
          type="text"
          value={battingAmount}
          onChange={(e) => setBattingAmount(e.target.value)}
        />
      </div>

      <div className="flex">
        <span className="w-32 text-gray-800">Withness</span>
        <input
          className="flex-1 border rounded h-8 p-2"
          type="text"
          value={withAddress}
          onChange={(e) => setWithAddress(e.target.value)}
        />
      </div>

      <div className="flex">
        <span className="w-32 text-gray-800">opponent</span>
        <input
          className="flex-1 border rounded h-8 p-2"
          type="text"
          value={opponent}
          onChange={(e) => setOpponentAddress(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={disalbedSubmit || !battingAmount || !withAddress || !opponent}
        className="mt-8 border-2 border-gray-600 rounded p-2 hover:bg-gray-200"
      >
        Generate
      </button>
    </form>
  );
};

export default FormContainer;
