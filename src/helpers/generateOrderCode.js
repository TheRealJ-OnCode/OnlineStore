const generateOrderCode = () => {
    return 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 10000);
};

module.exports = generateOrderCode;