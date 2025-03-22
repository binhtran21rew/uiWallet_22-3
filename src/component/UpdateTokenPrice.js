export default function UpdateTokenPrice(list) { 

    if(list){
        return list.map((token) => {
            const price = (Math.random() * (500 - 1) + 1).toFixed(2); // Giá từ $1 đến $500
            const quantity = (Math.random() * (10 - 0.1) + 0.1).toFixed(4); // Số lượng từ 0.1 đến 10
            const percentChange = (Math.random() * (5 - (-5)) - 5).toFixed(2); // -5% đến +5%
            const valueChange = (price * (percentChange / 100)).toFixed(2); // Giá trị thay đổi
            const pairValue = (Math.random() * (0.1 - 0.001) + 0.001).toFixed(4); // Giá trị cặp giao dịch
        
            
            return {
                name: token,
                price,
                quantity,
                percentChange: parseFloat(percentChange),
                valueChange,
                pairValue,
            };
        })
    }
 
}