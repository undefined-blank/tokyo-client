import useMetamask from "../hooks/useMetamask";
import { formatChainAsNum } from "../utils/formmatter";

const Home = () => {
  const {
    hasProvider,
    wallet,
    disableConnect,
    handleConnect,
    error,
    errorMessage,
    setError,
  } = useMetamask();

  return (
    <div className="w-full flex flex-col justify-center items-center p-8 gap-4">
      <h1 className="font-bold text-4xl">UNDEFINED TOKYO</h1>

      {!hasProvider && <p>Please Install Metamask.</p>}

      {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
        <button
          className="flex items-center gap-2 border border-gray-600 rounded p-2 text-gray-700 hover:bg-gray-100"
          onClick={handleConnect}
          disabled={disableConnect}
        >
          <img
            className="w-8 h-8"
            src={
              "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
            }
          />
          <p className="text-lg">Connect MetaMask</p>
        </button>
      )}

      {wallet.accounts.length > 0 && (
        <>
          <div>Wallet Accounts: {wallet.accounts[0]}</div>
          <div>Wallet Balance: {wallet.balance}</div>
          <div>Hex ChainId: {wallet.chainId}</div>
          <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
        </>
      )}

      {error && (
        <div onClick={() => setError(false)}>
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Home;
