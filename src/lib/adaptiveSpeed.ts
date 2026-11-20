/**
 * Adaptive Speed Engine (Cognitive Auto-Throttle)
 * Recommends or automatically tunes the user's WPM based on comprehension test accuracy.
 * Follows empirical reading pedagogy (Rayner et al.):
 * - Comprehension >= 85%: User is in the "flow zone", capable of increasing speed (+25 WPM)
 * - Comprehension 70% - 84%: Optimal retention zone, maintain current speed (+0 WPM)
 * - Comprehension < 70%: Cognitive overload, reduce speed (-25 WPM) to consolidate comprehension
 */

export interface AdaptiveRecommendation {
  previousWpm: number;
  newWpm: number;
  delta: number;
  action: "increase" | "maintain" | "decrease";
  feedbackMessage: string;
  rationale: string;
}

const MIN_WPM = 150;
const MAX_WPM = 1000;
const STEP = 25;

export function calculateAdaptiveWpm(
  currentWpm: number,
  comprehensionScore: number
): AdaptiveRecommendation {
  const boundedWpm = Math.max(MIN_WPM, Math.min(MAX_WPM, currentWpm));

  if (comprehensionScore >= 85) {
    const nextWpm = Math.min(MAX_WPM, boundedWpm + STEP);
    const delta = nextWpm - boundedWpm;
    return {
      previousWpm: boundedWpm,
      newWpm: nextWpm,
      delta,
      action: delta > 0 ? "increase" : "maintain",
      feedbackMessage:
        delta > 0
          ? `Mükemmel kavrama (%${comprehensionScore})! Hızınız +${delta} WPM artırıldı.`
          : `Maksimum hıza (%${comprehensionScore} kavrama ile) ulaştınız!`,
      rationale:
        "Bilişsel kapasiteniz metni rahatça özümseyebiliyor. Bir sonraki seans için hız seviyeniz yükseltildi.",
    };
  }

  if (comprehensionScore < 70) {
    const nextWpm = Math.max(MIN_WPM, boundedWpm - STEP);
    const delta = nextWpm - boundedWpm;
    return {
      previousWpm: boundedWpm,
      newWpm: nextWpm,
      delta,
      action: delta < 0 ? "decrease" : "maintain",
      feedbackMessage:
        delta < 0
          ? `Kavramayı pekiştirmek için hızınız ${delta} WPM ayarlandı.`
          : `Kavramayı korumak için taban hız seviyesindesiniz.`,
      rationale:
        "Anlama oranınızın %70 altına düşmesi bilişsel aşırı yüklenme olduğunu gösterir. Hız hafifçe düşürülerek kavrama pekiştirilir.",
    };
  }

  return {
    previousWpm: boundedWpm,
    newWpm: boundedWpm,
    delta: 0,
    action: "maintain",
    feedbackMessage: `Dengeli okuma performansı (%${comprehensionScore})! Mevcut hızınız korundu.`,
    rationale:
      "Optimum kavrama-hız dengesindesiniz (Goldilocks bölgesi). Bu tempoyu korumak nöral fiksasyonu güçlendirir.",
  };
}
