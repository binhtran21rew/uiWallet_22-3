export function generateWallets(number) {
    const result = [];

    const wallets = [];
    for (let i = 0; i < number; i++) {
        const randomName = Math.random().toString(36).substr(2, 12).toUpperCase();
        const randomAddress = `${randomName.slice(0, 6)}...${randomName.slice(-4)}`;

        var totalWallet = 0;
         const subWallets = [];

        for (let i = 0; i < number; i++) {
            const subName = Math.random().toString(36).substr(2, 12).toUpperCase();
            const subAddress = `${subName.slice(0, 6)}...${subName.slice(-4)}`;
            const subBalance = (Math.random() * 1000).toFixed(2); // Số thực từ 0 đến 1000
            totalWallet += parseInt(subBalance);
            subWallets.push({
                address: subAddress,
                balance: subBalance
            });
        }
        wallets.push({
            name: randomName,
            address: randomAddress,
            data: subWallets,
            totalWallet: totalWallet.toFixed(2)
        })
    }


    return wallets;
}


export function generateAssets(assetList) {
    return assetList.map(asset => ({
        name: asset.name,
        detail: asset.detail,
        quantity: (Math.random() * (10000 - 0.1) + 0.1).toFixed(3) // Số thực từ 0.1 đến 10,000, làm tròn 3 số
    }));
}


