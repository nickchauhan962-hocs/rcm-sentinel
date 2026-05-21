export interface Claim {
  id: string;
  patientName: string;
  patientId: string;
  date: string;
  payer: string;
  denialReason: string;
  cptCode: string;
  icdCode: string;
  chargeAmount: number;
  recoveryProbability: number; // 0 to 100
  status: 'Denied' | 'Under Review' | 'Appealing' | 'Recovered' | 'Unrecoverable';
  suggestedCorrections: {
    field: string;
    original: string;
    corrected: string;
    rationale: string;
  }[];
  appealLetterTemplate: string;
}

export const mockClaims: Claim[] = [
  {
    id: "CLM-9082",
    patientName: "Marcus Vance",
    patientId: "PT-7712",
    date: "2026-05-18",
    payer: "UnitedHealthcare",
    denialReason: "Lack of Prior Authorization (Code 197)",
    cptCode: "99214",
    icdCode: "M54.50",
    chargeAmount: 1845.00,
    recoveryProbability: 84,
    status: "Denied",
    suggestedCorrections: [
      {
        field: "Prior Authorization Indicator",
        original: "Null",
        corrected: "AUTH-UHC-88192A",
        rationale: "Retroactive auth reference located in clinical notes page 4."
      }
    ],
    appealLetterTemplate: `Dear Appeals Committee,

We are writing to formally appeal the denial of Claim ID: CLM-9082 for patient Marcus Vance (DOB: 11/12/1979, Member ID: UHC-992112) for services rendered on 2026-05-18. The denial reason was cited as Lack of Prior Authorization.

Upon review of the clinical files, we note that Prior Authorization had been obtained retroactively under authorization code AUTH-UHC-88192A. Medical records detailing the urgency of the lumbar evaluation are attached. We request a full reprocessing and reimbursement.

Sincerely,
Revenue Cycle Compliance Team
RCM Sentinel AI OS`
  },
  {
    id: "CLM-8841",
    patientName: "Sarah Jenkins",
    patientId: "PT-9022",
    date: "2026-05-16",
    payer: "Blue Cross Blue Shield",
    denialReason: "CPT/ICD-10 Code Mismatch (Code 11)",
    cptCode: "93000",
    icdCode: "J45.909",
    chargeAmount: 620.00,
    recoveryProbability: 95,
    status: "Denied",
    suggestedCorrections: [
      {
        field: "ICD-10 Code",
        original: "J45.909 (Unspecified asthma)",
        corrected: "R07.9 (Unspecified chest pain)",
        rationale: "CPT 93000 (Electrocardiogram) matches Chest Pain diagnosis rather than Asthma."
      }
    ],
    appealLetterTemplate: `Dear Appeals Committee,

We are writing to appeal the denial of Claim ID: CLM-8841 for patient Sarah Jenkins (DOB: 05/22/1986, Member ID: BCBS-88219) for services on 2026-05-16.

The claim was denied due to CPT/ICD-10 code mismatch. An administrative mapping error linked CPT 93000 (ECG) with J45.909. Clinical files confirm the primary symptom triggering the ECG was acute chest pain (R07.9). We have updated the claim file accordingly and request immediate reimbursement.

Sincerely,
Revenue Cycle Compliance Team`
  },
  {
    id: "CLM-8712",
    patientName: "Robert Chen",
    patientId: "PT-1249",
    date: "2026-05-14",
    payer: "Medicare",
    denialReason: "Medical Necessity Not Met (Code 50)",
    cptCode: "78815",
    icdCode: "C34.90",
    chargeAmount: 4890.00,
    recoveryProbability: 72,
    status: "Appealing",
    suggestedCorrections: [
      {
        field: "Clinical Documentation",
        original: "Single oncologist consult note",
        corrected: "Attach CT Scan results and biopsy report dated 04/28/2026",
        rationale: "Medicare Local Coverage Determination (LCD) requires pathology reports to justify PET scan CPT 78815."
      }
    ],
    appealLetterTemplate: `Dear Medicare Appeals Division,

This letter serves as an appeal for Claim ID: CLM-8712 for patient Robert Chen (Member ID: MED-882A) for services rendered on 2026-05-14 (CPT 78815 - PET Scan).

The claim was denied for Medical Necessity. We are attaching the diagnostic biopsy report dated 04/28/2026 confirming a diagnosis of malignant neoplasm of bronchus and lung (C34.90), alongside oncologist clinical notes stating the necessity of the PET scan for staging. Please re-evaluate.

Sincerely,
Revenue Cycle Compliance Team`
  },
  {
    id: "CLM-8552",
    patientName: "Elena Rostova",
    patientId: "PT-3329",
    date: "2026-05-10",
    payer: "Aetna",
    denialReason: "Duplicate Claim Submission (Code 18)",
    cptCode: "99285",
    icdCode: "S06.0X0A",
    chargeAmount: 1450.00,
    recoveryProbability: 98,
    status: "Recovered",
    suggestedCorrections: [
      {
        field: "Modifier Code",
        original: "99285",
        corrected: "99285-27",
        rationale: "Patient was readmitted to the ED on the same day for a distinct trauma evaluation. Modifier -27 is required."
      }
    ],
    appealLetterTemplate: `Dear Aetna Appeals Department,

We are appealing the denial of Claim ID: CLM-8552 for patient Elena Rostova (DOB: 02/14/1993) for emergency room services on 2026-05-10.

The claim was flagged as a duplicate. Clinical files indicate the patient was evaluated in the ED in the morning and returned at 21:00 following a separate traumatic event. We have appended Modifier -27 (Multiple Outpatient Hospital E/M encounters on the same date) to reflect the distinct visits.

Sincerely,
Revenue Cycle Compliance Team`
  },
  {
    id: "CLM-8419",
    patientName: "David Miller",
    patientId: "PT-4481",
    date: "2026-05-08",
    payer: "Cigna",
    denialReason: "Out of Network Benefit Limit Exceeded (Code 96)",
    cptCode: "27447",
    icdCode: "M17.11",
    chargeAmount: 18500.00,
    recoveryProbability: 40,
    status: "Unrecoverable",
    suggestedCorrections: [
      {
        field: "Payer Contract",
        original: "Out of Network Outpatient",
        corrected: "No correction",
        rationale: "Cigna exclusion clause for this specific employer group prohibits out-of-network knee arthroplasty."
      }
    ],
    appealLetterTemplate: `Dear Cigna Appeals,

We request re-evaluation of Claim ID: CLM-8419 for David Miller. We argue that emergent circumstances required the inpatient admission, and the patient could not be transferred to an in-network facility safely.

Sincerely,
Revenue Cycle Compliance Team`
  },
  {
    id: "CLM-8390",
    patientName: "Olivia Henderson",
    patientId: "PT-2991",
    date: "2026-05-07",
    payer: "UnitedHealthcare",
    denialReason: "Incorrect Modifier Application (Code 4)",
    cptCode: "19301",
    icdCode: "D05.11",
    chargeAmount: 3980.00,
    recoveryProbability: 90,
    status: "Denied",
    suggestedCorrections: [
      {
        field: "Modifier",
        original: "None",
        corrected: "19301-50",
        rationale: "Partial mastectomy was performed bilaterally. Append Modifier -50 (Bilateral Procedure) to avoid duplicate denial."
      }
    ],
    appealLetterTemplate: `Dear Appeals Board,

We are appealing the partial payment and denial of claim CLM-8390. The mastectomy (CPT 19301) was performed bilaterally. We have appended Modifier -50. Please adjust reimbursement to the bilateral fee schedule.

Sincerely,
Revenue Cycle Compliance Team`
  }
];

export const mockPayerMetrics = [
  { name: "Blue Cross Blue Shield", denialRate: 8.4, appealWinRate: 74, recoveryDays: 18, totalVolume: 12450000 },
  { name: "UnitedHealthcare", denialRate: 14.2, appealWinRate: 61, recoveryDays: 28, totalVolume: 9800000 },
  { name: "Medicare", denialRate: 6.1, appealWinRate: 82, recoveryDays: 14, totalVolume: 18500000 },
  { name: "Aetna", denialRate: 11.8, appealWinRate: 68, recoveryDays: 22, totalVolume: 6100000 },
  { name: "Cigna", denialRate: 13.5, appealWinRate: 59, recoveryDays: 31, totalVolume: 5300000 }
];

export const mockRecoveryHistory = [
  { name: "Dec", Denied: 840000, Recovered: 520000, Leakage: 320000 },
  { name: "Jan", Denied: 910000, Recovered: 610000, Leakage: 300000 },
  { name: "Feb", Denied: 790000, Recovered: 590000, Leakage: 200000 },
  { name: "Mar", Denied: 1050000, Recovered: 780000, Leakage: 270000 },
  { name: "Apr", Denied: 950000, Recovered: 820000, Leakage: 130000 },
  { name: "May (YTD)", Denied: 1120000, Recovered: 940000, Leakage: 180000 }
];

export const mockForecastingData = [
  { name: "Week 21", PredictedRecovery: 245000, ActualRecovery: 231000 },
  { name: "Week 22", PredictedRecovery: 260000, ActualRecovery: 258000 },
  { name: "Week 23 (F)", PredictedRecovery: 285000 },
  { name: "Week 24 (F)", PredictedRecovery: 310000 },
  { name: "Week 25 (F)", PredictedRecovery: 345000 },
  { name: "Week 26 (F)", PredictedRecovery: 390000 }
];

export const mockPayerHeatmap = [
  { category: "Coding Error", BCBS: 12, UHC: 28, Aetna: 19, Cigna: 25, Medicare: 8 },
  { category: "Prior Auth", BCBS: 32, UHC: 41, Aetna: 35, Cigna: 39, Medicare: 14 },
  { category: "Medical Necessity", BCBS: 22, UHC: 18, Aetna: 24, Cigna: 28, Medicare: 35 },
  { category: "Duplicate", BCBS: 8, UHC: 12, Aetna: 9, Cigna: 10, Medicare: 5 },
  { category: "Eligibility", BCBS: 15, UHC: 26, Aetna: 21, Cigna: 24, Medicare: 6 }
];

export const systemSummaryStats = {
  totalRecovered: 4260000,
  denialRate: 9.8,
  claimsAtRisk: 148,
  leakageSaved: 1450000,
  averageDaysToRecover: 18.5,
  aiConfidenceScore: 92.4,
  claimsForecast: 382000
};
