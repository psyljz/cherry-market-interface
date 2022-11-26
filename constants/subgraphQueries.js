import { gql } from "@apollo/client"

const GET_ACTIVE_ITEMS = gql`
    {
        activeItems(first: 100, where: { buyer: "0x000000000000000000000000000000000000dead" }) {
            id
            buyer
            seller
            nftAddress
            tokenId
            prcie
        }
    }
`
export default GET_ACTIVE_ITEMS
