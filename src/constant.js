//icon heroicon
import Icon from './component/Icon';




export const linkHome = '/';
export const linkCart = '/cart';
export const linkHistory = '/history';
export const linkShowWallet = '/wallet'
export const linkTransaction = '/transaction';
export const linkDetailTransaction = '/detailTransaction';
export const linkSend = '/send';
export const linkTopup = '/topup';
export const linkWalletDetail = '/walletDetail';
export const linkWalletKey = '/walletKey';
export const linkBackup = '/backup';
export const linkReceive = '/reveive';
export const linkToken = "/token";


export const seedPharase = ["elephent", "sunshine", "telescope", "tranquility", "wanerlust","telescope", "tranquility", "wanerlust", "elephent", "sunshine", "telescope"]

export const topup = [
  {
    icon: <Icon name="iconTransak" />,
    text: "transak",
    detail: 'Buy with Visa/Master cards and more',
  },
  {
    icon: <Icon name="iconBinance" />,
    text: "Binance",
    detail: 'Transfer from your Binance wallet',

  },
  {
    icon: <Icon name="iconTron" />,
    text: "Tron",
    detail: 'Transfer from your Tron wallet',
  }
]

export const status = {
  success: <Icon name="iconSuccess" />,

  pending: <Icon name="iconWarning" />,

  denied: <Icon name="iconDanger" />

}
export const statusColor = {
  success: 'green',

  pending: "#F2994A",

  denied: "red"
}
export const listNav = [
  {
    name: "",
    icon: "iconScan1",
    link: "/"
  },
  {
    name: "Send",
    icon: "iconSend",
    link: linkSend
  },
  {
    name: "Receivess",
    icon: "iconReceive",
    link: linkReceive
  },
  {
    name: "Spend",
    icon: "iconSpend",
    link: '/'

  },
  {
    name: "history",
    icon: "iconHistory",
    link: linkHistory

  }

]
export const listNav2 = [
  {
    name: "top up",
    icon: "iconTopup" 

  },
  {
    name: "withdraw",
    icon: "iconWithdraw"


  },
]

export const listNavReport = [
  {name: 'montly'},
  {name: '90 days'},
  {name: 'quater'},
  {name: 'year'},
  {name: 'year to year'},

]
export const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const cartOption = [
  {text: "Set as my default wallet", detail: "Automatically selected when you send/receive"},
  {text: "Edit Name", detail: "Change your wallet display name"},
  {text: "Edit Background", detail: "Change your wallet style"},
  {text: "Backup Wallet", detail: "Backup seed phrase to recover your wallet", type: "backupOption"},
  {text: "Node", detail: "Connect to a node"},
  {text: "Remove Wallet", detail: "Remove your wallet from this app permanently"},

]

export const dataUser = {
  name: "christopher vitory",
  address: 'fc010f105y 08909fdb87',
  typeWallet: 4,
  transaction: [
    { name: 'mtd', detail: 'metadollar' },
    { name: 'usdt', detail: 'usd tether' },
    { name: 'mtd', detail: 'metadollar' },
    { name: 'usdt', detail: 'usd tether' },
  ],
  listToken: [
    { name: "cirus", detail: "CTH" },
    { name: "cirus", detail: "CTH" },
    { name: "cirus", detail: "CTH" },
  ]

}

export const itemWallet = [
  {amount : 100, address: "0xaddresswallet", icon: <Icon name={"iconChip"}/>},
  {amount : 100, address: "{Code}fdGFGHF7855", icon: <Icon name={"iconPresent"}/>},
  {amount : 100, address: "{Code}fdGFGHF7855", icon: <Icon name={"iconPresent"}/>},
]


export const SPEED_SETTINGS = {
  swipeThreshold: 20, // Increased for better touch control
  velocityThreshold: 12, // Adjusted to prevent accidental flicks
  dampingFactor: 0.15, // Slightly smoother touch behavior
  fastDuration: 0.2, // Faster animation for quick flicks
  slowDuration: 0.8, // Smooth expansion/collapse effect
};


export const unit = [
  { text: "wei", unit: "1", icon: <Icon name="iconUnit1" /> },
  { text: "kwei", unit: "1e3", icon: <Icon name="iconUnit2" /> },
  { text: "mwei", unit: "1e6", icon: <Icon name="iconUnit2" /> },
  { text: "gwei", unit: "1e9", icon: <Icon name="iconUnit1" /> },
  { text: "micrometa", unit: "1e12", icon: <Icon name="iconUnit1" /> },
  { text: "millimeta", unit: "1e15", icon: <Icon name="iconUnit2" /> },
  { text: "metadollar", unit: "1e18", icon: <Icon name="iconUnit2" /> },
  { text: "metanium", unit: "1e21", icon: <Icon name="iconUnit2" /> },

];

export const timeToken = [
  {label: "1H", text: "one hour"},
  {label: "24H", text: "24 hour"},
  {label: "1w", text: "one week"},
  {label: "1m", text: "one month"},
  {label: "3m", text: "three month"},
  {label: "1y", text: "one year"},

]



export const imageCirus = `
  data:image/jpeg;base64,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
`;
export const imageNFT1 = "https://s3-alpha-sig.figma.com/img/1227/9881/7c4f8936a4246f91674d47fe40c14d63?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=bqqa~6iY69tZMZuD-unfKUgB-xoSUXWW9q0EvNX5gvDOxMP-EDTKmdHLFv-2TEzDpTEwvtH0An7l5jW5lIiqNyY2qgyWzVE~eUQ4jgOayrQdbW7apLS-iGQ-CNbS7t7b6CQ2sLhn7lzdgRUQH11MMfTsC7Eav-X5RzDWmi8ArZlcADlB2xPED2ESNz2YqcpO9M-7nXsUVkc01uwZQe9FIWh-xnzVBCZJSX3UgNVsblrfJxWRyOgi2JumJ7GWgWL13SwkkV-MEyqLeoMh4AETZIOvjk-kAqPhOzqvSVGQxZ~BMKOX0LA0fe2mTDN9pcB9QoWYX4F1BupgP005TRm2Eg__";
export const imageNFT2 = "https://s3-alpha-sig.figma.com/img/d756/14fe/4d406230c11ff54b3819921db2ceebbc?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UB2ojXHvi1h0z4LZxfD3Cw61aEaQ9srUwvpemZQJp-P2znjfkOklsQXQ6W5gkpyMRyU5SRXfD0T6yMD1te4hFRhyT7o9tZgg0N-n2xv3YxgAn5gKI0BFBiUUlsTmuOLsKVlvDYUma4BCM5owOnOYMycoVwlJkzDC9Vwjx9zIKC4SJK7aLSt8NM9hqo~JeHypWEoXdrYz~cebiOwwqLVuEtc4KFU48mJacKyTTt9kAe1xZTE0C5q5n6SCNUVwd5FOLFBP3Ac~mPw-VPcW8ev4rIGG3WB~mxc89qc6LEpLlauKvgvsJ3Zlm17Tl7g35AeyecVHClS88R-ldolU5MGXww__";
export const bgMain = "https://s3-alpha-sig.figma.com/img/a25d/3a57/1bbfd40b5d4176ad6c79d0c2b3afae50?Expires=1743379200&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=idWOAZ4hxzxA7QWoLKshmHNX2-fMSfhDKOYnRdphuz31-OZnwfBCzv-xGO78RyVOuIWC8qCiqHYeqLSKh7omacrcCRjnsdecInJrbbzO6mw3yhz4pDoJ2ASuz8JO3vcL9I-OZxK6ha~LzcH5w35mfYRJ29Lzp5n776hLG~JPscsBzF6cjUHemAB6ZVctKj0OH2bOfA5i4OKN0ROK0CEJA9fXYKiWXUJ3ngb~n-MOk7z6RFBeGj-ogB~vyf~x56yi6hcB2~MmHAaPHfgQD-v81YtoxiEeTGtq3Qr2iWIObw9zAlteRU5QC7XIPd0b6y0U5pSlAbrnLiUrJo65cuxOHw__";

export const imageAvatar1 = 'https://s3-alpha-sig.figma.com/img/9113/13b2/d79c0afb936279fe8427b823bc6218b6?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=CwSGrTLpUYdXblpCocSw6T~HZ16t6BTJdEZae9jSB2mrNxDvoE5KKmo0n9UnqbOZWiieqCbyHCkRi-v6LTtujDRQ7kGIGlulR1vOeafoZ~g4tIGrB1CqdZcU6qT9N9tDxCpRiZVJXAIdE1Ho-b1fC-MTC-x5Fr9GoxT-Ky~cyDhUoaXJPe0h8kLxqADrWIJQvnOx-3EpkLWJNmtG8NUSGobUSx4jfLzgRyGqOfYF-atkRO9KO1Ly7moRM0GotLyuNwbie90rJQOqOwy~fX890y9QlN-AK4EaXnOKgBd5a3U~3Ur-fqgzJYQO-8abilryng6d5UQID21Sdu4Vokx0OA__';

export const imageCountDown = "https://s3-alpha-sig.figma.com/img/7f6c/a72e/918bac74d242c2a0a5c5b328346e5912?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=S5gCGTGzwTy5Lw2j2flBlCn661G144ejKx1nQHBBDM~h3ixIihNo~RNhWVwzwJhCcN3873H0nfmtqkH8uJsbn3eETG2NPKy8XNd1khpT0zPmeZe8XMKn0ykmLUVVDaVTTsT8lafTLnnL2FaaLdmU~2QuqMwNBGRU0HcojlPNihyGL~1KC-0WT2xORNAGxCPaoWyXXsSie89hbNSVleTdqB-5oTSz2-Kc92fItz8zSOq1Bf5a5uTopnGPmrBTJGi3FEJS-vTf~lxUGQPV4acKhQgiMuw82bgVe5hh3IgqKhR68YZYGkCKdbTmN2feaTJ~MudOb~8Bq54MCSaHZoddNA__"

export const imageToken = <svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clipPath="url(#clip0_355_1421)">
    <g filter="url(#filter0_d_355_1421)">
      <path d="M0 20C0 31.0457 8.95431 40 20 40C31.0457 40 40 31.0457 40 20C40 8.95431 31.0457 0 20 0C8.95431 0 0 8.95431 0 20Z" fill="url(#paint0_linear_355_1421)" />
    </g>
    <path d="M30 12.1861V18.0287C30 18.0532 29.9952 18.0775 29.986 18.1001C29.9768 18.1227 29.9633 18.1433 29.9463 18.1606L25.9993 22.1896L24.1841 24.0429L23.1171 25.1323L21.9986 26.2742L20.3641 27.9453C20.3472 27.9627 20.3272 27.9764 20.3051 27.9858C20.283 27.9952 20.2594 28 20.2355 28C20.2116 28 20.1879 27.9952 20.1658 27.9858C20.1438 27.9764 20.1237 27.9627 20.1069 27.9453L14.6202 22.3437L13.7115 21.4153L10.0537 17.6757C10.0367 17.6585 10.0231 17.6381 10.0139 17.6155C10.0047 17.593 9.99996 17.5688 10 17.5444V12.1872C9.99986 12.1504 10.0105 12.1143 10.0305 12.0837C10.0504 12.053 10.0789 12.0291 10.1123 12.015C10.1456 12.0009 10.1823 11.9973 10.2177 12.0046C10.2531 12.0119 10.2855 12.0298 10.3109 12.0559L17.9979 19.9064L19.8691 21.8185C19.9034 21.8533 19.9497 21.8728 19.998 21.8728C20.0463 21.8728 20.0926 21.8533 20.1269 21.8185L22.5484 19.3462L25.9993 15.8219L29.6885 12.0548C29.714 12.0287 29.7465 12.0109 29.7818 12.0036C29.8172 11.9964 29.8539 12 29.8873 12.0141C29.9206 12.0281 29.9491 12.052 29.9692 12.0826C29.9893 12.1132 30 12.1492 30 12.1861Z" fill="white" />
    <path d="M15 23.1318L10.3797 18.3866V18.39L10 18V27.8229C10.0001 27.858 10.0103 27.8922 10.0294 27.9213C10.0484 27.9504 10.0754 27.9731 10.1069 27.9865C10.1384 27.9999 10.1731 28.0034 10.2066 27.9966C10.2401 27.9898 10.2709 27.973 10.2951 27.9483L10.3813 27.8597V27.8786L15 23.1318Z" fill="white" />
    <path style={{ mixBlendMode: "multiply" }} d="M15 23.1318L10.3797 18.3866V18.39L10 18V27.8229C10.0001 27.858 10.0103 27.8922 10.0294 27.9213C10.0484 27.9504 10.0754 27.9731 10.1069 27.9865C10.1384 27.9999 10.1731 28.0034 10.2066 27.9966C10.2401 27.9898 10.2709 27.973 10.2951 27.9483L10.3813 27.8597V27.8786L15 23.1318Z" fill="url(#paint1_linear_355_1421)" fillOpacity="0.2" />
    <path d="M27.3596 23.4991C27.3597 23.4272 27.3903 23.3584 27.4446 23.3076C27.4989 23.2568 27.5724 23.2283 27.6491 23.2283H29.8013C29.8274 23.2284 29.8532 23.2237 29.8773 23.2144C29.9014 23.2051 29.9233 23.1914 29.9418 23.1742C29.9602 23.1569 29.9749 23.1364 29.9849 23.1139C29.9949 23.0913 30 23.0671 30 23.0427V19.1855C29.9999 19.1488 29.9881 19.1129 29.9663 19.0824C29.9445 19.0519 29.9135 19.0282 29.8773 19.0141C29.8411 19.0001 29.8012 18.9964 29.7628 19.0035C29.7243 19.0107 29.689 19.0283 29.6612 19.0542L27.0457 21.5054L25.0579 23.3684C25.0208 23.4034 25 23.4507 25 23.5C25 23.5493 25.0208 23.5966 25.0579 23.6316L27.0457 25.4946L29.6612 27.9458C29.689 27.9717 29.7243 27.9893 29.7628 27.9965C29.8012 28.0036 29.8411 27.9999 29.8773 27.9859C29.9135 27.9718 29.9445 27.9481 29.9663 27.9176C29.9881 27.8871 29.9999 27.8512 30 27.8145V23.9567C30 23.9323 29.9949 23.9081 29.9849 23.8855C29.9749 23.863 29.9602 23.8425 29.9418 23.8252C29.9233 23.808 29.9014 23.7943 29.8773 23.7851C29.8532 23.7758 29.8274 23.771 29.8013 23.7711H27.6491C27.6111 23.7711 27.5733 23.7641 27.5382 23.7504C27.503 23.7367 27.471 23.7167 27.4442 23.6914C27.4173 23.6661 27.3959 23.6362 27.3814 23.6032C27.3669 23.5702 27.3595 23.5348 27.3596 23.4991Z" fill="white" />
    <g style={{ mixBlendMode: "multiply" }}>
      <path d="M20.1784 21.6851L20.1206 21.7429C20.142 21.7259 20.1614 21.7065 20.1784 21.6851Z" fill="url(#paint2_linear_355_1421)" fillOpacity="0.2" />
      <path d="M19.8699 21.7358L17.9758 19.8399L14.3228 16.1864L13.8021 16.3235L13.9757 21.6762C17.0119 24.7095 20.0007 21.8642 20.0007 21.8642L20.1199 21.745C20.0845 21.7748 20.0393 21.7903 19.9931 21.7886C19.9469 21.7869 19.903 21.7681 19.8699 21.7358Z" fill="url(#paint3_linear_355_1421)" fillOpacity="0.2" />
    </g>
  </g>
  <defs>
    <filter id="filter0_d_355_1421" x="-126.25" y="-122.5" width="290" height="290" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
      <feFlood floodOpacity="0" result="BackgroundImageFix" />
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
      <feOffset dx="-1.25" dy="2.5" />
      <feGaussianBlur stdDeviation="62.5" />
      <feComposite in2="hardAlpha" operator="out" />
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0.301961 0 0 0 0 1 0 0 0 0.05 0" />
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_355_1421" />
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_355_1421" result="shape" />
    </filter>
    <linearGradient id="paint0_linear_355_1421" x1="-3.1251" y1="37.2784" x2="45.5801" y2="-0.885993" gradientUnits="userSpaceOnUse">
      <stop stopColor="#00BCFC" />
      <stop offset="0.53" stopColor="#7627FF" />
      <stop offset="1" stopColor="#CE9FFB" />
    </linearGradient>
    <linearGradient id="paint1_linear_355_1421" x1="12.4995" y1="27.5967" x2="12.4995" y2="15.004" gradientUnits="userSpaceOnUse">
      <stop stopColor="white" stopOpacity="0" />
      <stop offset="1" stopColor="#231F20" />
    </linearGradient>
    <linearGradient id="paint2_linear_355_1421" x1="20.1495" y1="21.7158" x2="20.1507" y2="21.7169" gradientUnits="userSpaceOnUse">
      <stop stopColor="white" stopOpacity="0" />
      <stop offset="1" stopColor="#231F20" />
    </linearGradient>
    <linearGradient id="paint3_linear_355_1421" x1="14.8701" y1="19.5321" x2="19.6588" y2="24.3207" gradientUnits="userSpaceOnUse">
      <stop stopColor="white" stopOpacity="0" />
      <stop offset="1" stopColor="#231F20" />
    </linearGradient>
    <clipPath id="clip0_355_1421">
      <rect width="40" height="40" fill="white" />
    </clipPath>
  </defs>
</svg>


export const imageWallet = "https://s3-alpha-sig.figma.com/img/d0e2/fcdb/a9a2199638ead95340917356452ac967?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=LsZ7MkPMZzQ7nkPYqW5r3U3ZCev7koI-LqGzvCthIIp292Jagv-zCd7M4MsTFqsLgGePfxclH4KSSqHohvzkaey6iQVM0RvYRuWWmhOiNwpnazM96LA9q6NbL5LWpJ7pvz5FhH~YBSr-ujMaQCCPVwVlyPCvxVPppY6xGEamoK-ZVXHTbbG8~1yXzDVZlOQB0pB~qNeoNLaHvJSHzb1LrRyHr4i9Hs2q0G0lnzBPHCGlR9iU7BtFHrrlLqEvp5pFoMkrC08wrxbiFV~V1bUf9CvlJbSisSNXrWFLAIzFDRtd4paGdX7UCckxLSv4eYXfq9a4LR-c7F-dKuw9gpQMUg__";

export const imageBlock = "https://s3-alpha-sig.figma.com/img/be78/3fd4/03fdcb8a02c4c94df8c958d585d9e64f?Expires=1744588800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=fyivwtGIq2~JWw3zl2uQnGVeaAzVPonNNfQ2UVxZJSwYsTMRY-dX959Oinkp2S38NxR2F7D-evjLQ38hOQiN9jEU~jU1HB6Ex6rEAxxARYC-IqNxXc6Foc9dpRncMm885DO9W3-C2MqCQUQ~Ia6xIIaIE2tNyz7yzMM3YPP2RZ6BiAEiVrwFdrS9-NomojZ5uYB86aXfnmejSzn0wcZFUa5yIlCj9RSg01HeDmThgJ9dp5sjxVHrINCFCxc05MRHW2u00cxYZd8DEpIsyFqStM7~Qg~38~K2TT37pJgYMaUhTqKufK2iNiHnAANaSz8tbzEEfNIzPGpc2y~Ye2CaXQ__";

export const listToken= [
  { icon: imageToken, text: "MTD" },
  { icon: imageToken, text: "USDT" },
  { icon: imageToken, text: "MTD" },
]






