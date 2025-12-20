// Generate 6-digit OTP
exports.generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Check if OTP is expired
exports.isOTPExpired = (createdAt) => {
    const now = new Date();
    const otpTime = new Date(createdAt);
    const diffMinutes = (now - otpTime) / (1000 * 60);
    return diffMinutes > 10; // OTP expires in 10 minutes
};