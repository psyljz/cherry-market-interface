import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import { Form, useNotification, Button } from "web3uikit"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { ethers } from "ethers"
import nftAbi from "../constants/BasicNft.json"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import networkMapping from "../constants/networkMapping.json"
import { useEffect, useState } from "react"
import { data } from "autoprefixer"

export default function Home() {
    const { chainId, account, isWeb3Enabled } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const marketplaceAddress = networkMapping[chainString].NftMarketplace[0]
    const dispatch = useNotification()
    const [proceeds, setProceeds] = useState("0")

    const { runContractFunction } = useWeb3Contract()

    const submitContact = async (event) => {
        event.preventDefault()
        data = [
            {
                name: "NFT Address",
                type: "text",
                inputWidth: "50%",
                value: "0xe667Dd06b268eBf3845B1BD66904bd743478Fe0d",
                key: "nftAddress",
            },
            {
                name: "Token ID",
                type: "number",
                value: event.target.tokenid.value,
                inputWidth: "10%",
                key: "tokenId",
            },
            {
                name: "Price (in ETH)",
                type: "number",
                inputWidth: "10%",
                value: event.target.prcie.value,
                key: "price",
            },
        ]
        approveAndList(data)
    }

    async function approveAndList(data) {
        console.log("Approving...")
        const nftAddress = data[0].value
        const tokenId = data[1].value
        const price = ethers.utils.parseUnits(data[2].value, "ether").toString()

        const approveOptions = {
            abi: nftAbi,
            contractAddress: nftAddress,
            functionName: "approve",
            params: {
                to: marketplaceAddress,
                tokenId: tokenId,
            },
        }

        await runContractFunction({
            params: approveOptions,
            onSuccess: (tx) => handleApproveSuccess(tx, nftAddress, tokenId, price),
            onError: (error) => {
                console.log(error)
            },
        })
    }

    async function handleApproveSuccess(tx, nftAddress, tokenId, price) {
        console.log("Ok! Now time to list")
        await tx.wait()
        const listOptions = {
            abi: nftMarketplaceAbi,
            contractAddress: marketplaceAddress,
            functionName: "listItem",
            params: {
                nftAddress: nftAddress,
                tokenId: tokenId,
                price: price,
            },
        }

        await runContractFunction({
            params: listOptions,
            onSuccess: () => handleListSuccess(),
            onError: (error) => console.log(error),
        })
    }

    async function handleListSuccess() {
        dispatch({
            type: "success",
            message: "NFT listing",
            title: "NFT listed",
            position: "topR",
        })
    }

    const handleWithdrawSuccess = () => {
        dispatch({
            type: "success",
            message: "Withdrawing proceeds",
            position: "topR",
        })
    }

    async function setupUI() {
        const returnedProceeds = await runContractFunction({
            params: {
                abi: nftMarketplaceAbi,
                contractAddress: marketplaceAddress,
                functionName: "getProceeds",
                params: {
                    seller: account,
                },
            },
            onError: (error) => console.log(error),
        })
        if (returnedProceeds) {
            setProceeds(returnedProceeds.toString())
        }
    }

    useEffect(() => {
        setupUI()
    }, [proceeds, account, isWeb3Enabled, chainId])

    return (
        <div className={styles.container}>
            <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm m-auto mt-16">
                <form onSubmit={submitContact}>
                    <div class="m-auto flex items-center justify-between">
                        <label class="form-label inline-block mb-2 text-gray-700">Token ID</label>
                        <input
                            type="number"
                            class="form-control
       
        
        px-1
        py-1
        text-base
        font-normal
        text-gray-800
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="tokenid"
                            placeholder="Token id you owned"
                        />
                    </div>
                    <div class="flex items-center justify-between mt-2">
                        <label for="saleprcie" class="form-label inline-block mb-2 text-gray-700">
                            Price in ETH
                        </label>
                        <input
                            type="float"
                            class="
        
        px-1
        py-1
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="prcie"
                            placeholder="Price in ETH"
                        />
                    </div>
                    <div className="flex justify-center mt-6">
                        <button
                            type="submit"
                            class="
                        flex justify-center px-6 py-2.5 bg-teal-500 text-white font-medium text-xs uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        >
                            Approve And SELL
                        </button>
                    </div>
                </form>
            </div>

            <div class="flex justify-center mt-7">


                <button
                    type="button"
                    className=" m-auto items-center inline-block px-6 py-2.5 bg-blue-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={() => {
                        runContractFunction({
                            params: {
                                abi: nftMarketplaceAbi,
                                contractAddress: marketplaceAddress,
                                functionName: "withdrawProceeds",
                                params: {},
                            },
                            onError: (error) => console.log(error),
                            onSuccess: () => handleWithdrawSuccess,
                        })
                    }}
                >
                    Claim {ethers.utils.formatUnits(proceeds, "ether")} Balance
                </button>
            </div>

            <div>
                <section class="overflow-hidden text-gray-700 ">
                    <div class="container px-1 py-2 mx-auto lg:pt-12 lg:px-12">
                        <div class="flex flex-wrap -m-1 md:-m-2">
                            <div class="flex flex-wrap w-1/3">
                                <div class="w-full p-1 md:p-20">
                                    <img
                                        alt="gallery"
                                        class="block object-cover object-center w-full h-full rounded-lg"
                                        src="https://nice.4everland.store/just-avatar-rawpic/avatar101.svg"
                                    />
                                </div>
                            </div>
                            <div class="flex flex-wrap w-1/3">
                                <div class="w-full p-1 md:p-20">
                                    <img
                                        alt="gallery"
                                        class="block object-cover object-center w-full h-full rounded-lg"
                                        src="https://nice.4everland.store/just-avatar-rawpic/avatar103.svg"
                                    />
                                </div>
                            </div>
                            <div class="flex flex-wrap w-1/3">
                                <div class="w-full p-1 md:p-20">
                                    <img
                                        alt="gallery"
                                        class="block object-cover object-center w-full h-full rounded-lg"
                                        src="https://nice.4everland.store/just-avatar-rawpic/avatar13.svg"
                                    />
                                </div>
                            </div>
                            <div class="flex flex-wrap w-1/3">
                                <div class="w-full p-1 md:p-20">
                                    <img
                                        alt="gallery"
                                        class="block object-cover object-center w-full h-full rounded-lg"
                                        src="https://nice.4everland.store/just-avatar-rawpic/avatar123.svg"
                                    />
                                </div>
                            </div>
                            <div class="flex flex-wrap w-1/3">
                                <div class="w-full p-1 md:p-20">
                                    <img
                                        alt="gallery"
                                        class="block object-cover object-center w-full h-full rounded-lg"
                                        src="https://nice.4everland.store/just-avatar-rawpic/avatar109.svg"
                                    />
                                </div>
                            </div>
                            <div class="flex flex-wrap w-1/3">
                                <div class="w-full p-1 md:p-20">
                                    <img
                                        alt="gallery"
                                        class="block object-cover object-center w-full h-full rounded-lg"
                                        src="https://nice.4everland.store/just-avatar-rawpic/avatar90.svg"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            
        </div>
    )
}
