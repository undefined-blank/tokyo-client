import { providers } from "ethers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [isConnecting, setIsConnecting] = useState(false);
    const navigate = useNavigate();

    let provider: providers.Web3Provider;

    // 메마 지갑 연결
    const connectToMetaMask = async () => {
        // 메타마스크 설치 확인
        if (typeof window.ethereum !== "undefined") {
            // 메타마스크가 있을 시 지갑연결 요청
            provider = await new providers.Web3Provider(window.ethereum);
            const walletAddress = await provider.send(
                "eth_requestAccounts",
                []
            );
            console.log("connected to ", walletAddress);

            // 성공하면 여기에 상태변수 바꾸기
            setIsConnecting(true);
            navigate("/form");
        } else {
            alert("please install MetaMask");
        }
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
                    <img
                        className="w-8 h-8"
                        src={
                            "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                        }
                    />
                    <p className="text-lg">Connect MetaMask</p>
                </button>
            )}

            {isConnecting && (
                <>
                    {/* <div>Wallet Accounts: {wallet.accounts[0]}</div>
          <div>Wallet Balance: {wallet.balance}</div> */}
                </>
            )}
        </div>
    );
};

export default Home;
