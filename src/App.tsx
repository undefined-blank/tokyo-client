import useMetamask from "./hooks/useMetamask";
import { formatChainAsNum } from "./utils/formmatter";

function App() {
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
      <h1 className="font-bold text-2xl">UNDEFINED TOKYO</h1>

      {!hasProvider && <p>Please Install Metamask.</p>}

      {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
        <button
          className="border border-gray-600 rounded p-2 text-gray-700 hover:bg-gray-100"
          onClick={handleConnect}
          disabled={disableConnect}
        >
          Connect MetaMask
        </button>
      )}

      {wallet.accounts.length > 0 && (
        <>
          <div>Wallet Accounts: {wallet.accounts[0]}</div>
          <div>Wallet Balance: {wallet.balance}</div> {}
          <div>Hex ChainId: {wallet.chainId}</div> {}
          <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>{" "}
        </>
      )}

      {error && (
        <div onClick={() => setError(false)}>
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
    </div>
  );
}

export default App;
