import { providers, utils, Contract } from 'ethers';
import { useState } from 'react';
import abi from './abi.json';

const Home = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<null | string>(null);
  const [walletBalance, setWalletBalance] = useState<null | string>(null);

  let provider: providers.Web3Provider;
  let contractWithSigner: Contract;

  // 메마 지갑 연결
  const connectToMetaMask = async () => {
    // 메타마스크 설치 확인
    if (typeof window.ethereum !== 'undefined') {
      // 메타마스크가 있을 시 지갑연결 요청
      provider = await new providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      console.log('connected to ', accounts[0]);
      setWalletAddress(accounts[0]);

      // 잔액 가져오기
      const balance = await provider.getBalance(accounts[0]);
      setWalletBalance(utils.formatEther(balance)); // Save the balance to state

      //컨트랙트 객체화
      const betContract = await new Contract('0xdF46e54aAadC1d55198A4a8b4674D7a4c927097A', abi, provider);

      // 컨트랙트와 연결된 지갑 결합(?)
      const signer = await provider?.getSigner();
      console.log(signer);
      contractWithSigner = await betContract?.connect(signer);
      console.log(contractWithSigner);

      // 성공하면 UI 변경
      setIsConnecting(true);
    } else {
      alert('please install MetaMask');
    }
  };

  const createGame = async (receiver: string, withness: string, amount: number) => {
    contractWithSigner.create_game(receiver, withness, amount);
  };
  const joinGame = async (gameId: number) => {
    contractWithSigner.join_game(gameId);
  };
  const claim = async (gameId: number, winner: string, v: string, r: string, s: string) => {
    contractWithSigner.claim(gameId, winner, v, r, s);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center p-8 gap-4">
      <h1 className="font-bold text-4xl">UNDEFINED TOKYO</h1>

      {!isConnecting && <p>Please Install Metamask.</p>}

      {!isConnecting && (
        <button
          className="flex items-center gap-2 border border-gray-600 rounded p-2 text-gray-700 hover:bg-gray-100"
          onClick={async () => {
            await connectToMetaMask();
          }}
        >
          <img className="w-8 h-8" src={'https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg'} />
          <p className="text-lg">Connect MetaMask</p>
        </button>
      )}

      {isConnecting && (
        <>
          <div>Wallet Accounts: {walletAddress}</div>
          <div>Wallet Balance: {`${walletBalance} ASTAR`}</div>
        </>
      )}
    </div>
  );
};

export default Home;
