/**
 * requestAnimationFrame을 사용한 고성능 애니메이션 유틸리티
 * @param duration - 애니메이션 지속 시간 (ms)
 * @param easing - 타이밍 함수 (0~1 사이의 진행률을 받아 변환된 진행률을 반환)
 * @param update - 각 프레임마다 호출될 함수 (변환된 진행률을 인자로 받음)
 * @param onComplete - 애니메이션 완료 시 호출될 콜백 함수
 */
export function animate({
  duration,
  easing,
  update,
  onComplete,
}: {
  duration: number;
  easing: (progress: number) => number;
  update: (easedProgress: number) => void;
  onComplete?: () => void;
}) {
  const startTime = performance.now();

  const tick = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    // 1. 진행률 계산 (0에서 1 사이)
    const rawProgress = Math.min(elapsedTime / duration, 1);
    // 2. 이징(easing) 함수를 적용하여 진행률 보정
    const easedProgress = easing(rawProgress);

    // 3. 보정된 진행률로 DOM 상태 업데이트
    update(easedProgress);

    if (rawProgress < 1) {
      // 애니메이션이 끝나지 않았으면 다음 프레임 요청
      requestAnimationFrame(tick);
    } else {
      // 애니메이션 완료 후 콜백 실행
      onComplete?.();
    }
  };

  // 첫 프레임 요청으로 애니메이션 시작
  requestAnimationFrame(tick);
}

/**
 * cubic-bezier 값을 기반으로 이징(easing) 함수를 생성합니다.
 * Material Design의 표준 곡선(Fast Out, Slow In)을 기본값으로 사용합니다.
 * (내부 알고리즘이 복잡하므로, 표준 구현체를 가져와 사용하는 것으로 생각하셔도 좋습니다.)
 */
export function createCubicBezier(x1 = 0.4, y1 = 0, x2 = 0.2, y2 = 1) {
  // 복잡한 수학적 계산을 포함하므로, 이 부분은 그대로 사용하시는 것을 권장합니다.
  // 이 코드는 `(x1, y1)`과 `(x2, y2)` 제어점을 기반으로 베지에 곡선을 계산하는
  // 뉴턴-랩슨 방법을 사용한 표준 구현체입니다.
  const A = (aA1: number, aA2: number) => 1.0 - 3.0 * aA2 + 3.0 * aA1;
  const B = (aA1: number, aA2: number) => 3.0 * aA2 - 6.0 * aA1;
  const C = (aA1: number) => 3.0 * aA1;

  const calcBezier = (aT: number, aA1: number, aA2: number) =>
    ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
  const getSlope = (aT: number, aA1: number, aA2: number) =>
    3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);

  const getTForX = (aX: number) => {
    let aGuessT = aX;
    for (let i = 0; i < 4; ++i) {
      const currentSlope = getSlope(aGuessT, x1, x2);
      if (currentSlope === 0.0) return aGuessT;
      const currentX = calcBezier(aGuessT, x1, x2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  };

  return (x: number) => calcBezier(getTForX(x), y1, y2);
}
