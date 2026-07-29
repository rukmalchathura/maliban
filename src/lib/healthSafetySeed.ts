import {
  buildRiskAssessment,
  computeHealthSafetyKpiSummary,
  deriveTrainingStatus,
  type HealthSafetySectionData,
  type IncidentLog,
  type WorkerTraining,
} from '../../types/healthSafety';

const workerTrainings: WorkerTraining[] = [
  {
    id: 'tr-1',
    workerName: 'Sunil Perera',
    courseName: 'Fire Warden & Evacuation',
    issueDate: '2025-03-01',
    expiryDate: '2027-03-01',
    certUrl: '#',
    status: deriveTrainingStatus('2025-03-01', '2027-03-01'),
  },
  {
    id: 'tr-2',
    workerName: 'Nimali Fernando',
    courseName: 'LOTO — Weaving Machinery',
    issueDate: '2024-06-15',
    expiryDate: '2026-08-15',
    certUrl: '#',
    status: deriveTrainingStatus('2024-06-15', '2026-08-15'),
  },
  {
    id: 'tr-3',
    workerName: 'Kasun Jayawardena',
    courseName: 'Chemical Handling (EHS)',
    issueDate: '2023-01-10',
    expiryDate: '2026-01-10',
    certUrl: '#',
    status: deriveTrainingStatus('2023-01-10', '2026-01-10'),
  },
];

const incidentLogs: IncidentLog[] = [
  {
    id: 'inc-1',
    date: '2026-07-12',
    type: 'Near Miss',
    location: 'Weaving Shed B — Loom Row 4',
    description: 'Operator glove caught on rotating spindle guard edge; no injury.',
    rootCause: 'Guard misalignment after maintenance.',
    correctiveAction: 'Re-align guard; add post-maintenance guard check.',
    status: 'In Progress',
  },
  {
    id: 'inc-2',
    date: '2026-06-28',
    type: 'Minor Injury',
    location: 'Finishing — Exit Door #03',
    description: 'Small laceration from metal edge on obstructed exit route.',
    rootCause: 'Fabric rolls stored in escape path.',
    correctiveAction: 'Clear exit; daily aisle audit checklist.',
    status: 'Open',
  },
  {
    id: 'inc-3',
    date: '2025-11-03',
    type: 'LTI',
    location: 'Warehouse — Forklift aisle',
    description: 'Recorded lost-time case (finger fracture) — closed with CAPA.',
    rootCause: 'Inadequate pedestrian segregation marking.',
    correctiveAction: 'Repaint walkways; refresher training.',
    status: 'Closed',
  },
];

export const defaultHealthSafetySectionData = (): HealthSafetySectionData => {
  const riskAssessments = [
    buildRiskAssessment({
      id: 'ra-1',
      activity: 'High-speed loom operation',
      hazard: 'Entanglement / crush from rotating parts',
      severity: 5,
      likelihood: 3,
      mitigationControls: 'Fixed guards, interlocks, LOTO procedure RAMS-LOOM-02',
      residualRiskScore: 6,
    }),
    buildRiskAssessment({
      id: 'ra-2',
      activity: 'Boiler house inspection',
      hazard: 'Steam / pressure release',
      severity: 5,
      likelihood: 2,
      mitigationControls: 'Annual hydrostatic cert, permit-to-work, PPE',
      residualRiskScore: 4,
    }),
    buildRiskAssessment({
      id: 'ra-3',
      activity: 'Chemical dye mixing',
      hazard: 'Skin / inhalation exposure',
      severity: 4,
      likelihood: 3,
      mitigationControls: 'LEV, SDS, spill kits, chemical training',
      residualRiskScore: 8,
    }),
    buildRiskAssessment({
      id: 'ra-4',
      activity: 'Manual fabric handling',
      hazard: 'Musculoskeletal strain',
      severity: 3,
      likelihood: 4,
      mitigationControls: 'Mechanical lifts, job rotation, ergonomic training',
      residualRiskScore: 6,
    }),
  ];

  const workerTrainingsWithStatus = workerTrainings.map((t) => ({
    ...t,
    status: deriveTrainingStatus(t.issueDate, t.expiryDate),
  }));

  const base = {
    safetyPolicies: [
      {
        id: 'pol-1',
        title: 'Occupational Health & Safety Policy',
        version: '4.2',
        approvalDate: '2026-01-15',
        safetyOfficer: 'K. Bandara (EHS Officer)',
        documentUrl: '#',
      },
      {
        id: 'pol-2',
        title: 'Contractor Safety & Induction Standard',
        version: '2.0',
        approvalDate: '2025-09-01',
        safetyOfficer: 'GM — Operations',
        documentUrl: '#',
      },
    ],
    riskAssessments,
    incidentLogs,
    workerTrainings: workerTrainingsWithStatus,
    equipmentInspections: [
      {
        id: 'eq-1',
        assetTag: 'PPE-FA-12',
        equipmentType: 'First Aid Station — Loom Room 02',
        inspectionDate: '2026-07-20',
        result: 'Fail' as const,
        inspector: 'Nurse Samanthi',
      },
      {
        id: 'eq-2',
        assetTag: 'FIRE-EXT-B-08',
        equipmentType: 'CO₂ Fire Extinguisher — Weaving Shed B',
        inspectionDate: '2026-07-01',
        result: 'Pass' as const,
        inspector: 'Fire Safety Vendor',
      },
      {
        id: 'eq-3',
        assetTag: 'LOOM-GRD-044',
        equipmentType: 'Loom interlock guard — Row 4',
        inspectionDate: '2026-07-18',
        result: 'Pass' as const,
        inspector: 'Maintenance Lead',
      },
    ],
  };

  const kpiSummary = computeHealthSafetyKpiSummary(base, { totalSafeHours: 482_000 });

  return { ...base, kpiSummary };
};

export type HealthSafetyUiExtensions = {
  siteAudits: {
    id: string;
    date: string;
    area: string;
    finding: string;
    capaStatus: 'Open' | 'In Progress' | 'Closed';
  }[];
  emergencyPlan: {
    lastDrillDate: string;
    assemblyPoints: string[];
    wardenCount: number;
    documentUrl: string;
  };
  ramsDocumentUrl?: string;
};

export const defaultHealthSafetyUiExtensions = (): HealthSafetyUiExtensions => ({
  siteAudits: [
    {
      id: 'aud-1',
      date: '2026-07-22',
      area: 'Finishing Section',
      finding: 'Exit Door #03 obstructed; failed exit light battery test.',
      capaStatus: 'In Progress',
    },
    {
      id: 'aud-2',
      date: '2026-06-10',
      area: 'Boiler House',
      finding: 'All statutory certs current; housekeeping satisfactory.',
      capaStatus: 'Closed',
    },
  ],
  emergencyPlan: {
    lastDrillDate: '2026-05-18',
    assemblyPoints: ['North Car Park — Gate A', 'Admin Lawn — Flagpole'],
    wardenCount: 14,
    documentUrl: '#',
  },
  ramsDocumentUrl: '#',
});
