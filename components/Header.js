import { ConnectButton } from "web3uikit"
import Link from "next/link"

export default function Header() {
    return (
        <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
            <div class="flex items-center flex-shrink-0 text-white mr-6">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="fill-current h-8 w-8 mr-2"
                    width="54"
                    height="34"
                    enableBackground="new 0 0 54 54"
                    version="1.1"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                >
                    <path d="M303.106 284.714c-1.253 0-2.437.102-3.676.125L197.851 90.916a9.47 9.47 0 00-10.654-4.805 9.477 9.477 0 00-7.205 9.198v208.668c-63.589 3.28-104.173 39.542-104.173 94.38C75.82 461.019 126.797 512 189.463 512c26.783 0 52.466-9.484 72.909-26.617 12.665 4.887 26.365 7.676 40.734 7.676 62.666 0 113.643-50.981 113.643-113.643 0-57.528-44.605-94.702-113.643-94.702zM198.933 133.801l79.921 152.576c-21.555 3.045-39.846 10.305-54.232 20.957a159.359 159.359 0 00-25.689-3.417V133.801zm-9.47 359.258c-52.216 0-94.702-42.482-94.702-94.702 0-55.811 49.088-75.845 94.39-75.826.109.005.201.064.312.064.12 0 .217-.064.338-.068a152.14 152.14 0 0117.858 1.129c-11.745 15.049-18.196 33.929-18.196 55.76 0 40.801 21.683 76.544 54.063 96.59-15.796 11.014-34.582 17.053-54.063 17.053zm113.643-18.94c-52.216 0-94.702-42.482-94.702-94.702 0-55.86 48.924-75.762 94.702-75.762s94.702 19.902 94.702 75.762c0 52.22-42.486 94.702-94.702 94.702zM435.652 9.222a9.468 9.468 0 00-8.703-8.587C299.046-9.229 238.571 99.152 237.97 100.243a9.478 9.478 0 00.435 9.789c1.942 2.918 18.746 25.091 79.406 25.091 9.997 0 21.188-.601 33.692-1.993 74.716-8.3 87.71-84.682 84.149-123.908zm-24.415 51.369c-9.785 32.175-30.593 50.246-61.825 53.719-56.858 6.303-81.82-4.92-90.948-11.204 13.9-20.906 65.95-87.096 158.599-84.053.009 9.248-.851 25.201-5.826 41.538z"></path>
                </svg>


                <Link href="/">
                    <a className="font-semibold text-xl tracking-tight">Cherry Market</a>
                </Link>
            </div>
            <div class="block lg:hidden">
                <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
                    <svg
                        class="fill-current h-3 w-3"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                </button>
            </div>
            <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div class="text-sm lg:flex-grow">

                <Link href="/mint-avatar">
                    <a
                        href="/mint-avatar"
                        class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
                    >
                        MintAvatar
                    </a>
                    </Link>
                    <a
                        href="https://github.com/psyljz/cherry-market-contract"
                        class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
                    >
                        Github
                    </a>
                </div>
                <div>
                    <Link href="/sell-nft">
                        <a
                            href="/sell-nft"
                            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                        >
                            Sell NFT
                        </a>
                    </Link>
                </div>
            </div>
            <ConnectButton moralisAuth={false} />
            
        </nav>


        
        
    )
}
