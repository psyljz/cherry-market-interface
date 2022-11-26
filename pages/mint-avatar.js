import { useWeb3Contract } from "react-moralis"

import justAvatarAbi from "../constants/JustAvatar.json"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"

import { ethers } from "ethers"

import { useNotification } from "web3uikit"

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    console.log(chainId)
    const raffleAddress = "0xe667Dd06b268eBf3845B1BD66904bd743478Fe0d"

    const [entranceFee, setEntranceFee] = useState("0")
    const [numberOfPlayers, setNumberOfPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    const dispatch = useNotification()

    const {
        runContractFunction: enterRaffle,
        data: enterTxResponse,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: justAvatarAbi,
        contractAddress: raffleAddress,
        functionName: "mintNft",
        msgValue: entranceFee,
        params: {},
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: justAvatarAbi,
        contractAddress: raffleAddress,
        functionName: "MAX_AVATAR",
        params: {},
    })

    const { runContractFunction: getPlayersNumber } = useWeb3Contract({
        abi: justAvatarAbi,
        contractAddress: raffleAddress,
        functionName: "MAX_AVATAR",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: justAvatarAbi,
        contractAddress: raffleAddress,
        functionName: "getTokenCounter",
        params: {},
    })
    async function updateUI() {
        // const entranceFeeFromContract = (await getEntranceFee()).toString()

        const numPlayersFromCall = (await getPlayersNumber()).toString()
        const recentWinnerFromCall = (await getRecentWinner()).toString()
        // setEntranceFee(entranceFeeFromContract)
        setNumberOfPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete",
            position: "topR",
            icon: "bell",
        })
    }
    return (
        <div className="p-5">
            <div class="flex justify-center">
                <div class="rounded-lg shadow-lg bg-white max-w-sm">
                    <a href="#!">
                        <img
                            class="rounded-t-lg"
                            src="https://nice.4everland.store/just-avatar-rawpic/avatar100.svg"
                            alt=""
                        />
                    </a>
                    <div class="p-6">
                    <div class="flex py-4 px-4 font-bold text-2xl text-bla ck">
                <h1 className="m-auto text-gray-900 text-xl  mb-2 font-bold">JustAvatar</h1>
            </div>
                        
                        <p class="text-gray-700 text-base mb-4">
                        Everyone cares about how they appear to others — how they look to others and how others judge their actions. 
                        
                            
                        </p>
                        <p class="text-gray-700 text-base mb-4">
                         
                        And these perceptions, in turn, influence how we look and behave.
                
                        </p>
                        <p class="text-gray-700 text-base mb-4">
                         
                
                             There are 1000 unique avatar free to mint.
                         </p>
                        <div className="flex items-center justify-between">
                        <button
                            type="button"
                            className=" flex items-center inline-block px-6 py-2.5 bg-teal-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                            onClick={async function () {
                                await enterRaffle({
                                    onSuccess: handleSuccess,
                                    onError: (error) => console.log(error),
                                })
                            }}
                        >
                            {isLoading || isFetching ? (
                                <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full m-auto"></div>
                            ) : (
                                "MINT"
                            )}
                        </button>

                        <div className=" flex items-center inline-block px-6 py-2.5 bg-blue-700 text-white font-medium text-xs leading-tight uppercase rounded shadow-md focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition  ">
                            AVATAR MINTED: {recentWinner}/{numberOfPlayers}
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            {raffleAddress ? (
                <></>
            ) : (
                <div>请切换到Goerli测试网络</div>
            )}
        </div>
    )
}
