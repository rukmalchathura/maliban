import { AuditSectionData, FacilityProfileData } from '../types/audit';

export const INITIAL_FACILITY_PROFILE: FacilityProfileData = {
  companyName: 'Maliban Wovens (Pvt) Ltd',
  unitName: 'Balangoda Weaving Plant Unit 01',
  location: 'Pahala Kottegoda Road, Balangoda, Sabaragamuwa Province, Sri Lanka',
  auditorName: 'Chathura Wickramasinghe (Lead EHS Auditor)',
  auditDate: new Date().toISOString().split('T')[0],
  employeeCount: 650,
  boilerRegistrationNo: 'SL-BOILER-2024-8891',
  eplNumber: 'CEA/EPL/SAB/2024/0412',
  cocNumber: 'BPS/UDA/COC/2023/1109',
  siteCoverPhotos: [
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?w=500&auto=format&fit=crop&q=60',
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60'
  ]
};

export const INITIAL_SECTIONS: AuditSectionData[] = [
  {
    key: 'facility',
    title: '1. Facility Profile & Statutory Licences',
    iconName: 'Building2',
    completionPercentage: 0,
    questions: [
      {
        id: 'q-fp1',
        sectionKey: 'facility',
        code: 'FP-01',
        questionText: '1. Basic Information\n• Facility Name (as per business license)\n• Facility FULL Street Address (official address, if applicable):',
        legalReference: 'Companies Act No. 07 of 2007 / Business Name Registration',
        ncCategory: 'STATUTORY',
        maxPoints: 10,
        earnedPoints: 10,
        deductedPoints: 0,
        answer: 'YES',
        auditorNotes: 'Facility Name: Maliban Wovens (Pvt) Ltd. Address: Pahala Kottegoda Road, Balangoda, Sabaragamuwa Province, Sri Lanka.',
        capaText: '',
        attachments: []
      },
      {
        id: 'q-fp2',
        sectionKey: 'facility',
        code: 'FP-02',
        questionText: '2. Hours of Operation\n• Normal Hours of Operation per day:\n• Number of Shifts and Hours of Operation for each (Normal Operations):',
        legalReference: 'Factories Ordinance Sec. 67 / Shop & Office Employees Act',
        ncCategory: 'STATUTORY',
        maxPoints: 10,
        earnedPoints: 10,
        deductedPoints: 0,
        answer: 'YES',
        auditorNotes: 'Normal Hours: 8 hours/day. Shifts: 2 Shifts (Shift A: 07:00 - 15:30, Shift B: 15:30 - 00:00).',
        capaText: '',
        attachments: []
      },
      {
        id: 'q-fp3',
        sectionKey: 'facility',
        code: 'FP-03',
        questionText: '3. Worker Demographics\n\n3.1 Total number of workers:\n- What percentage of the normal workforce does the Total number of workers reflect? (100%)\n- Number of male workers (280) | Number of full-time workers (580) | Number of male full-time workers (250)\n- Number of part-time workers (0) | Number of permanent workers (580) | Number of male permanent workers (250)\n- Number of temporary workers (30) | Number of agency/contract workers (0)\n- Number of contract workers/ workers employed by third party non-production (40)\n- Organizations providing contract workers & services (Security: Sentinel Guard Ltd, Catering: Balangoda Caterers)\n- Number of workers under probation (40) | Male under probation (15) | Casual workers (30)\n- Workers under age 18 (0) | Trainees/apprentices/interns (0)\n- Pregnant/breastfeeding (8) | On maternity leave (4) | Returned from maternity leave (12)\n- Workers with disclosed disabilities (0)\n\n3.2 Supervisors\n- Number of supervisors: 35 | Number of male supervisors: 20\n\n3.3 Managers\n- Number of managers: 12 | Number of male managers: 8\n\n3.4 Worker Turnover\n- What is the annual worker turnover in percent? (2.4%)',
        legalReference: 'Department of Labour Sri Lanka / Higg FSLM Demographics',
        ncCategory: 'STATUTORY',
        maxPoints: 20,
        earnedPoints: 20,
        deductedPoints: 0,
        answer: 'YES',
        auditorNotes: 'Worker Demographics complete for 3.1, 3.2, 3.3, and 3.4. Total Workers: 650. Supervisors: 35 (20 male). Managers: 12 (8 male). Annual Turnover: 2.4%.',
        capaText: '',
        attachments: []
      },
      {
        id: 'q-fp4',
        sectionKey: 'facility',
        code: 'FP-04',
        questionText: '4. Operating Licenses\n• Operating license/registration is available and up to date:\n• Operating License/Registration #:',
        legalReference: 'UDA Act No. 41 / Pradeshiya Sabha Act Sec. 148 / CEA EPL',
        ncCategory: 'CRITICAL',
        maxPoints: 15,
        earnedPoints: 15,
        deductedPoints: 0,
        answer: 'YES',
        auditorNotes: 'Balangoda Pradeshiya Sabha Trade License #: BPS/TL/2026/0882. UDA COC #: BPS/UDA/COC/2023/1109. CEA EPL #: CEA/EPL/SAB/2024/0412.',
        capaText: '',
        attachments: []
      },
      {
        id: 'q-fp5',
        sectionKey: 'facility',
        code: 'FP-05',
        questionText: '5. Labor Inspection Book\n• Does the facility maintain a valid Labor Inspection Visit Book / Record in line with legal requirements?',
        legalReference: 'Factories Ordinance Sec. 101 & Department of Labour Statutory Guidelines',
        ncCategory: 'CRITICAL',
        maxPoints: 10,
        earnedPoints: 10,
        deductedPoints: 0,
        answer: 'YES',
        auditorNotes: 'Official Labour Inspection Visit Book maintained at HR Office. Last visit by District Labour Inspector recorded.',
        capaText: '',
        attachments: []
      },
      {
        id: 'q-fp6',
        sectionKey: 'facility',
        code: 'FP-06',
        questionText: '6. Volume\n• Facility\'s monthly volume (unit of measurement):',
        legalReference: 'Higg FEM / Facility Operations Data Record',
        ncCategory: 'STATUTORY',
        maxPoints: 10,
        earnedPoints: 10,
        deductedPoints: 0,
        answer: 'YES',
        auditorNotes: 'Monthly Volume: 1,250,000 Meters of Woven Fabric.',
        capaText: '',
        attachments: []
      },
      {
        id: 'q-fp7',
        sectionKey: 'facility',
        code: 'FP-07',
        questionText: '7. Subcontractors Used for Production / Operation\n• Are subcontractors utilized by the facility to complete all or part of the production process?\n• If yes, how many subcontractors? Need to add subcontractors like follows,\nSubcontractor #1 (Name, Address):',
        legalReference: 'NEXT COP Subcontractor Audit Standard & Higg FSLM Verification',
        ncCategory: 'MAJOR',
        maxPoints: 10,
        earnedPoints: 10,
        deductedPoints: 0,
        answer: 'YES',
        auditorNotes: 'Subcontractors utilized: Yes (1 Subcontractor). Subcontractor #1 Name: Lanka Processing Wovens (Pvt) Ltd, Address: No. 45 Industrial Zone, Ratnapura.',
        capaText: '',
        attachments: []
      }
    ]
  },
  {
    key: 'health_safety',
    title: '2. Health & Safety',
    iconName: 'ShieldAlert',
    completionPercentage: 0,
    questions: [
      {
        id: 'q-hs1',
        sectionKey: 'health_safety',
        code: 'HS-01',
        questionText: 'Are all industrial steam boilers duly tested and certified annually by a Licensed Mechanical Engineer registered under the Factories Ordinance?',
        legalReference: 'Factories Ordinance No. 45 of 1942 Sec. 39',
        ncCategory: 'CRITICAL',
        maxPoints: 15,
        earnedPoints: 15,
        deductedPoints: 0,
        answer: 'YES',
        auditorNotes: 'Boiler No. B-02 hydrostatic inspection report verified (Cert # SL-BOILER-2024-8891). Valid through November 2026.',
        capaText: '',
        attachments: []
      },
      {
        id: 'q-hs2',
        sectionKey: 'health_safety',
        code: 'HS-02',
        questionText: 'Are all high-speed textile weaving looms, spinning frames, and transmission drives equipped with interlocking safety guards?',
        legalReference: 'Factories Ordinance No. 45 of 1942 Sec. 17-21 (Guarding of Machinery)',
        ncCategory: 'MAJOR',
        maxPoints: 10,
        earnedPoints: 10,
        deductedPoints: 0,
        answer: 'YES',
        auditorNotes: 'Interlock switches on Weaving Shed B inspected. All drives fully enclosed.',
        capaText: '',
        attachments: []
      },
      {
        id: 'q-hs3',
        sectionKey: 'health_safety',
        code: 'HS-03',
        questionText: 'Are emergency fire escape exits unobstructed, equipped with panic bars, opening outwards, and illuminated by secondary battery-backed exit lights?',
        legalReference: 'Factories Ordinance Sec. 42 & Fire Service Dept Guidelines',
        ncCategory: 'CRITICAL',
        maxPoints: 15,
        earnedPoints: 0,
        deductedPoints: 15,
        answer: 'NO',
        auditorNotes: 'Exit Door #03 in Finishing Section was obstructed by fabric rolls. Secondary battery exit light failed battery test.',
        capaText: '1. Clear all fabric rolls from Exit Door #03 immediately.\n2. Replace battery pack on Exit Light #03.\n3. Establish daily aisle clearance checks by Safety Officer.',
        capaDeadline: '2026-08-05',
        responsiblePerson: 'K. Bandara (EHS Officer)',
        attachments: []
      },
      {
        id: 'q-hs4',
        sectionKey: 'health_safety',
        code: 'HS-04',
        questionText: 'Are adequate numbers of certified First Aid boxes maintained with prescribed medical supplies and managed by trained First Aiders per shift?',
        legalReference: 'Factories Ordinance Sec. 50 Welfare Provisions',
        ncCategory: 'MINOR',
        maxPoints: 10,
        earnedPoints: 5,
        deductedPoints: 5,
        answer: 'PARTIAL',
        auditorNotes: 'First Aid boxes stocked, but 2 boxes in Loom Room 02 lacked antiseptic solution replenishment logs.',
        capaText: 'Replenish antiseptic solutions and update log sheets for Loom Room 02 first aid stations.',
        capaDeadline: '2026-08-10',
        responsiblePerson: 'Nurse Samanthi',
        attachments: []
      }
    ]
  },
  {
    key: 'ems_environment',
    title: '3. EMS & Environmental Protection',
    iconName: 'Leaf',
    completionPercentage: 0,
    questions: [
      {
        id: 'q-env1',
        sectionKey: 'ems_environment',
        code: 'ENV-01',
        questionText: 'Does the facility maintain a valid Environmental Protection License (EPL) issued by the Central Environmental Authority (CEA) for textile processing & discharge?',
        legalReference: 'National Environmental Act No. 47 of 1980 / CEA EPL Regulations',
        ncCategory: 'CRITICAL',
        maxPoints: 15,
        earnedPoints: 15,
        deductedPoints: 0,
        answer: 'YES',
        auditorNotes: 'EPL # CEA/EPL/SAB/2024/0412 active. Effluent discharge parameters compliant with CEA standards.',
        capaText: '',
        attachments: []
      },
      {
        id: 'q-env2',
        sectionKey: 'ems_environment',
        code: 'ENV-02',
        questionText: 'Is textile sludge and scheduled hazardous chemical waste stored in secondary containment bunds and handed over to CEA-licensed waste management operators?',
        legalReference: 'National Environmental (Protection & Quality) Reg. Hazardous Waste Rules',
        ncCategory: 'MAJOR',
        maxPoints: 10,
        earnedPoints: 10,
        deductedPoints: 0,
        answer: 'YES',
        auditorNotes: 'Hazardous waste store has secondary bunding (110% capacity). Hazardous waste manifests verified for 2026 Q2.',
        capaText: '',
        attachments: []
      },
      {
        id: 'q-env3',
        sectionKey: 'ems_environment',
        code: 'ENV-03',
        questionText: 'Are monthly Effluent Treatment Plant (ETP) treated water testing reports submitted to CEA and within tolerance limits (BOD < 30 mg/L, COD < 250 mg/L)?',
        legalReference: 'CEA General Standards for Discharge of Effluents into Inland Surface Waters',
        ncCategory: 'MAJOR',
        maxPoints: 10,
        earnedPoints: 10,
        deductedPoints: 0,
        answer: 'YES',
        auditorNotes: 'Third-party accredited lab report from ITI (Industrial Technology Institute) dated July 2026 shows BOD at 18 mg/L.',
        capaText: '',
        attachments: []
      }
    ]
  },
  {
    key: 'working_hours',
    title: '4. Working Hours & Compensation',
    iconName: 'Clock',
    completionPercentage: 0,
    questions: [
      {
        id: 'q-wh1',
        sectionKey: 'working_hours',
        code: 'WH-01',
        questionText: 'Are regular working hours maintained within 45 hours per week (or 48h under Shop & Office / Factories Ordinance limits) with voluntary overtime capped at 12h/week?',
        legalReference: 'Shop & Office Employees Act / Factories Ordinance Sec. 67',
        ncCategory: 'MAJOR',
        maxPoints: 10,
        earnedPoints: 10,
        deductedPoints: 0,
        answer: 'YES',
        auditorNotes: 'Biometric time records audited for 50 sample workers in Weaving Shed. Average weekly OT was 8.5 hours.',
        capaText: '',
        attachments: []
      },
      {
        id: 'q-wh2',
        sectionKey: 'working_hours',
        code: 'WH-02',
        questionText: 'Is overtime premium compensation accurately calculated and paid at 1.5x normal hourly wage per Sri Lankan labor legislation?',
        legalReference: 'Wages Boards Ordinance (Textile Manufacturing Trade) Sec. 21',
        ncCategory: 'MAJOR',
        maxPoints: 10,
        earnedPoints: 10,
        deductedPoints: 0,
        answer: 'YES',
        auditorNotes: 'Payroll audit verified 1.5x rate applied correctly on EPF/ETF slip summaries.',
        capaText: '',
        attachments: []
      }
    ]
  },
  {
    key: 'worker_treatment',
    title: '5. Worker Treatment & Ethical Social Standards',
    iconName: 'Users',
    completionPercentage: 0,
    questions: [
      {
        id: 'q-wt1',
        sectionKey: 'worker_treatment',
        code: 'WT-01',
        questionText: 'Is a functional Joint Consultative Committee (JCC) / Worker Council elected without management interference and meeting monthly to resolve grievances?',
        legalReference: 'NEXT COP Section 4.2 & Worldly Higg FSLM Benchmark Social standard',
        ncCategory: 'MAJOR',
        maxPoints: 10,
        earnedPoints: 10,
        deductedPoints: 0,
        answer: 'YES',
        auditorNotes: 'JCC meeting minutes from June & July 2026 verified. 12 worker representatives present.',
        capaText: '',
        attachments: []
      },
      {
        id: 'q-wt2',
        sectionKey: 'worker_treatment',
        code: 'WT-02',
        questionText: 'Does the facility enforce a strict anti-harassment policy with anonymous grievance channels, anti-retaliation protections, and gender committee oversight?',
        legalReference: 'Sri Lanka Penal Code Sec. 345 & Brand Ethical Code of Conduct',
        ncCategory: 'MAJOR',
        maxPoints: 10,
        earnedPoints: 10,
        deductedPoints: 0,
        answer: 'YES',
        auditorNotes: 'Suggestion boxes and hotline verified. Harassment committee poster displayed in Sinhala and Tamil.',
        capaText: '',
        attachments: []
      }
    ]
  },
  {
    key: 'management_systems',
    title: '6. Management Systems & Brand Audits',
    iconName: 'FileCheck',
    completionPercentage: 0,
    questions: [
      {
        id: 'q-ms1',
        sectionKey: 'management_systems',
        code: 'MS-01',
        questionText: 'Are internal compliance self-audits conducted on a monthly frequency with tracked Corrective Action Plans (CAPA) signed off by General Manager?',
        legalReference: 'NEXT COP Management System Standard 1.1 & ISO 14001 / ISO 45001',
        ncCategory: 'MINOR',
        maxPoints: 10,
        earnedPoints: 10,
        deductedPoints: 0,
        answer: 'YES',
        auditorNotes: 'Monthly compliance tracker signed by GM for Q1/Q2 2026.',
        capaText: '',
        attachments: []
      }
    ]
  },
  {
    key: 'capa_summary',
    title: '7. CAPA Summary & Sign-off',
    iconName: 'ClipboardList',
    completionPercentage: 0,
    questions: [
      {
        id: 'q-capa1',
        sectionKey: 'capa_summary',
        code: 'CAPA-01',
        questionText: 'Have all non-conformities identified during the previous monthly internal compliance audit been formally verified and closed out?',
        legalReference: 'Factory Management System & Internal Verification SOP',
        ncCategory: 'MAJOR',
        maxPoints: 10,
        earnedPoints: 10,
        deductedPoints: 0,
        answer: 'YES',
        auditorNotes: 'Previous audit findings from June 2026 (Chemical spill kit training) fully verified and closed out.',
        capaText: '',
        attachments: []
      }
    ]
  }
];
