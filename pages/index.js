import styles from "../styles/Home.module.css"
import { useMoralisQuery, useMoralis } from "react-moralis"
import NFTBox from "../components/NFTBox"
import networkMapping from "../constants/networkMapping.json"
import GET_ACTIVE_ITEMS from "../constants/subgraphQueries"
import { useQuery } from "@apollo/client"

export default function Home() {
    const { isWeb3Enabled, chainId } = useMoralis()
    const chainString = chainId ? parseInt(chainId).toString() : "31337"
    const marketplaceAddress = networkMapping[chainString].NftMarketplace[0]
    // const marketplaceAddress= "0x9fDf925635E796dD75adC13e0B0cCb7246b3b4dF"

    const { loading, error, data: listedNfts } = useQuery(GET_ACTIVE_ITEMS)

    return (
        <div className="container mx-auto px-4">
            
            <div class="flex py-4 px-4 font-bold text-2xl text-bla ck">
                <h1 className="m-auto">Listed Avatar</h1>
            </div>
            <div className="grid grid-cols-5 gap-5">
                {isWeb3Enabled ? (
                    loading || !listedNfts ? (
                        <div>Loading...</div>
                    ) : (
                        listedNfts.activeItems.map((nft) => {
                            console.log(nft)
                            const { prcie, nftAddress, tokenId, seller } = nft
                            return (
                                <NFTBox
                                    price={prcie}
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    marketplaceAddress={marketplaceAddress}
                                    seller={seller}
                                    key={`${nftAddress}${tokenId}`}
                                />
                            )
                        })
                    )
                ) : (
                    <div>Please connect to your Wallet.</div>
                )}
            </div>
        </div>
    )
}
