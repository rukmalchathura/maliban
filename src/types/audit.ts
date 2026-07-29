// TypeScript Interfaces for Maliban Wovens Compliance Audit Application

export type AnswerType = 'YES' | 'NO' | 'PARTIAL' | 'NA' | 'UNANSWERED';

export type NCCategory = 'CRITICAL' | 'MAJOR' | 'MINOR' | 'OBSERVATION' | 'STATUTORY';

export type OverallRating = 'GREEN' | 'YELLOW' | 'RED' | 'PENDING';

export interface AttachmentItem {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  fileUrl: string;
  uploadedAt: string;
}

export interface QuestionCardData {
  id: string;
  sectionKey: string;
  code: string;
  questionText: string;
  legalReference: string; // e.g. "Factories Ordinance Sec. 39", "CEA EPL Guidelines"
  ncCategory: NCCategory;
  maxPoints: number;
  earnedPoints: number;
  deductedPoints: number;
  answer: AnswerType;
  auditorNotes: string;
  capaText: string;
  capaDeadline?: string;
  responsiblePerson?: string;
  attachments: AttachmentItem[];
}

export interface AuditSectionData {
  key: string;
  title: string;
  iconName: string;
  completionPercentage: number;
  questions: QuestionCardData[];
}

export interface FacilityProfileData {
  companyName: string;
  unitName: string;
  location: string; // Balangoda, Sri Lanka
  auditorName: string;
  auditDate: string;
  employeeCount: number;
  boilerRegistrationNo: string;
  eplNumber: string;
  cocNumber: string;
  siteCoverPhotos: string[];
}

export interface AuditState {
  id: string;
  facility: FacilityProfileData;
  sections: AuditSectionData[];
  overallScore: number;
  earnedPoints: number;
  maxPoints: number;
  criticalCount: number;
  majorCount: number;
  rating: OverallRating;
  isSupabaseSynced: boolean;
}
