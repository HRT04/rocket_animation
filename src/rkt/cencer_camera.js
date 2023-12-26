export function handleMotion(event) {
    // 加速度データの取得
    var acceleration = event.accelerationIncludingGravity;
    // 加速度の強さを計算
    var accelerationStrength = Math.sqrt(acceleration.x * acceleration.x +
        acceleration.y * acceleration.y +
        acceleration.z * acceleration.z);
    return accelerationStrength;
}
