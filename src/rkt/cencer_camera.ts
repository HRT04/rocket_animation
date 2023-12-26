export function handleMotion(event: any) {
  // 加速度データの取得
  const acceleration = event.accelerationIncludingGravity;
  // 加速度の強さを計算
  const accelerationStrength = Math.sqrt(
    acceleration.x * acceleration.x +
      acceleration.y * acceleration.y +
      acceleration.z * acceleration.z
  );
  return accelerationStrength;
}
