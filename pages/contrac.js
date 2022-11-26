

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


const submitContact = async (event) => {
    event.preventDefault();
    alert(`So your name is ${event.target.name.value}?`);
  };
export default function Home() {
    return (
        <div className="max-w-xs my-2 overflow-hidden rounded shadow-lg">
            <div className="px-6 py-4">
                <div className="mb-2 text-xl font-bold">Contact us</div>
                <form className="flex flex-col" onSubmit={submitContact}>
                    <label htmlFor="name" className="mb-2 italic">
                        Name
                    </label>
                    <input
                        className="mb-4 border-b-2"
                        id="name"
                        name="name"
                        type="text"
                        autocomplete="name"
                        required
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}
