import { QuestionCardData } from '../types/audit';

export function generateAICAPARecommendation(question: QuestionCardData): {
  recommendedCAPA: string;
  suggestedDeadlineDays: number;
  recommendedOfficer: string;
} {
  const code = question.code;
  const legalRef = question.legalReference;

  if (code.startsWith('HS-01') || question.questionText.includes('boiler')) {
    return {
      recommendedCAPA: `[AI CAPA Recommendation - Factories Ordinance Sec. 39]\n1. Immediately schedule hydrostatic pressure testing and safety valve calibration with a Licensed Mechanical Engineer registered under the Factories Advisory Board.\n2. Obtain signed Form 6 Boiler Certificate and file copy with the District Factory Inspecting Engineer (DFIE).\n3. Update preventive maintenance logbook at Balangoda boiler house.`,
      suggestedDeadlineDays: 7,
      recommendedOfficer: 'Chief Mechanical Engineer / EHS Lead'
    };
  }

  if (code.startsWith('HS-03') || question.questionText.includes('fire escape') || question.questionText.includes('exit')) {
    return {
      recommendedCAPA: `[AI CAPA Recommendation - Factories Ordinance Sec. 42 / Fire Safety Code]\n1. Remove all obstructions (fabric rolls/trolleys) from fire escape exit corridors immediately and paint yellow clearance floor markings.\n2. Install dual-battery emergency illumination units with auto-cutover above exit door.\n3. Conduct shift-wise aisle inspection by EHS officer and log in Fire Safety Register.`,
      suggestedDeadlineDays: 3,
      recommendedOfficer: 'Safety Officer / Facility Manager'
    };
  }

  if (code.startsWith('ENV-01') || question.questionText.includes('EPL') || question.questionText.includes('CEA')) {
    return {
      recommendedCAPA: `[AI CAPA Recommendation - National Environmental Act No. 47 of 1980]\n1. Submit EPL renewal application along with recent certified ITI lab effluent analysis reports to CEA Provincial Office (Ratnapura/Sabaragamuwa).\n2. Inspect Effluent Treatment Plant (ETP) dosing pumps and pH equalization tanks to maintain BOD < 30 mg/L and COD < 250 mg/L.\n3. Maintain daily log of flowmeter discharge volume.`,
      suggestedDeadlineDays: 14,
      recommendedOfficer: 'Environmental Manager / EHS Manager'
    };
  }

  if (code.startsWith('STAT-01') || question.questionText.includes('COC') || question.questionText.includes('Building')) {
    return {
      recommendedCAPA: `[AI CAPA Recommendation - UDA / Balangoda Pradeshiya Sabha statutory rules]\n1. Retrieve structural stability certificate signed by a Chartered Structural Engineer for unapproved building extension.\n2. Formally apply for Certificate of Conformity (COC) regularization at Balangoda Pradeshiya Sabha office.\n3. Ensure fire safety clearance endorsement is attached to submission file.`,
      suggestedDeadlineDays: 30,
      recommendedOfficer: 'General Manager / Head of Legal & Admin'
    };
  }

  // Generic Sri Lanka Textile Factory Audit CAPA
  return {
    recommendedCAPA: `[AI CAPA Recommendation - ${legalRef}]\n1. Conduct root-cause analysis (5-Why method) for Non-Conformity (${question.code}).\n2. Implement immediate containment action and revise Standard Operating Procedure (SOP).\n3. Provide refresher training to shopfloor supervisors and log training records.`,
    suggestedDeadlineDays: 10,
    recommendedOfficer: 'EHS Officer / Section Supervisor'
  };
}
