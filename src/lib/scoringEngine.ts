import { AuditSectionData, OverallRating } from '../types/audit';

export interface AuditScoreResult {
  earnedPoints: number;
  maxPoints: number;
  scorePercentage: number;
  criticalCount: number;
  majorCount: number;
  minorCount: number;
  rating: OverallRating;
  ratingLabel: string;
  ratingColor: string;
  ratingBg: string;
  updatedSections: AuditSectionData[];
}

export function calculateAuditScore(sections: AuditSectionData[]): AuditScoreResult {
  let earnedPoints = 0;
  let maxPoints = 0;
  let criticalCount = 0;
  let majorCount = 0;
  let minorCount = 0;
  let operatingLicenseValid = true;

  const updatedSections = sections.map((section) => {
    let answeredQuestionsCount = 0;

    section.questions.forEach((q) => {
      if (q.code === 'FP-04' || q.id === 'q-fp4') {
        if (q.answer === 'NO') {
          operatingLicenseValid = false;
        }
      }

      if (q.answer !== 'UNANSWERED') {
        answeredQuestionsCount++;
      }

      if (q.answer === 'NA') {
        // Exclude Not Applicable from max score pool
        q.earnedPoints = 0;
        q.deductedPoints = 0;
        return;
      }

      maxPoints += q.maxPoints;

      if (q.answer === 'YES') {
        q.earnedPoints = q.maxPoints;
        q.deductedPoints = 0;
      } else if (q.answer === 'PARTIAL') {
        q.earnedPoints = Math.round(q.maxPoints / 2);
        q.deductedPoints = q.maxPoints - q.earnedPoints;
      } else if (q.answer === 'NO') {
        q.earnedPoints = 0;
        q.deductedPoints = q.maxPoints;

        // Track finding categories for non-conforming answers
        if (q.ncCategory === 'CRITICAL' || q.ncCategory === 'STATUTORY') {
          criticalCount++;
        } else if (q.ncCategory === 'MAJOR') {
          majorCount++;
        } else if (q.ncCategory === 'MINOR') {
          minorCount++;
        }
      }

      earnedPoints += q.earnedPoints;
    });

    const completionPercentage =
      section.questions.length > 0
        ? Math.round((answeredQuestionsCount / section.questions.length) * 100)
        : 100;

    return {
      ...section,
      completionPercentage
    };
  });

  // Without a valid operating license (FP-04), entire score is forced to 0
  if (!operatingLicenseValid) {
    earnedPoints = 0;
  }

  const scorePercentage = !operatingLicenseValid ? 0 : (maxPoints > 0 ? Math.round((earnedPoints / maxPoints) * 1000) / 10 : 100);

  // Determine overall rating according to Sri Lankan Statutory & Brand Compliance Guidelines
  let rating: OverallRating = 'GREEN';
  let ratingLabel = 'COMPLIANT (GREEN)';
  let ratingColor = 'text-emerald-700';
  let ratingBg = 'bg-emerald-50 border-emerald-300';

  if (!operatingLicenseValid) {
    rating = 'RED';
    ratingLabel = 'RED (CRITICAL BREACH: NO OPERATING LICENSE - ALL MARKS ZERO)';
    ratingColor = 'text-red-700';
    ratingBg = 'bg-red-100 border-red-400';
  } else if (criticalCount > 0 || scorePercentage < 70) {
    rating = 'RED';
    ratingLabel = 'NON-COMPLIANT / CRITICAL BREACH (RED)';
    ratingColor = 'text-red-700';
    ratingBg = 'bg-red-50 border-red-300';
  } else if (majorCount > 2 || (scorePercentage >= 70 && scorePercentage < 85)) {
    rating = 'YELLOW';
    ratingLabel = 'NEEDS IMPROVEMENT (YELLOW)';
    ratingColor = 'text-amber-700';
    ratingBg = 'bg-amber-50 border-amber-300';
  }

  return {
    earnedPoints,
    maxPoints,
    scorePercentage,
    criticalCount,
    majorCount,
    minorCount,
    rating,
    ratingLabel,
    ratingColor,
    ratingBg,
    updatedSections
  };
}
