export interface AIAgent {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'active' | 'success' | 'warning' | 'error';
  systemUsage: number; // Percentage
  activeTasks: string[];
  prediction: string;
  decisionExplanation: string;
  logs: string[];
}

export const mockAIAgents: AIAgent[] = [
  {
    id: "AGT-RECOVERY",
    name: "Claim Recovery Agent",
    role: "Automated Appeal & Denials Recovery",
    status: "active",
    systemUsage: 78,
    activeTasks: [
      "Analyzing Claim ID: CLM-9082 denial code 197",
      "Validating outpatient clinical documentation index",
      "Streaming appeal letter auto-draft to UnitedHealthcare"
    ],
    prediction: "84% success probability for retro-authorization appeal.",
    decisionExplanation: "Appealed based on retroactive authorization token 'AUTH-UHC-88192A' discovered in secondary EMR logs.",
    logs: [
      "[INFO] Claim Recovery Agent initialized.",
      "[QUERY] Fetching clinical attachments for Marcus Vance...",
      "[OCR] Scanning document: lumbar_evaluation_notes.pdf (Success)",
      "[NLP] Parsed token 'AUTH-UHC-88192A' from section: 'Pre-Auth Reference'.",
      "[AGENT] Compiling appeal draft utilizing template 'PreAuth_Denial_V3'.",
      "[HTTP] Posting appeal payload to UHC Provider Portal Gateway..."
    ]
  },
  {
    id: "AGT-COMPLIANCE",
    name: "Coding Compliance Agent",
    role: "CPT/ICD-10 Code Validation & NCCI Edits",
    status: "active",
    systemUsage: 54,
    activeTasks: [
      "Auditing claim batch 2026-05-21-B for modifier mismatches",
      "Cross-referencing CPT 93000 with ICD-10 J45.909"
    ],
    prediction: "Underpayment risk detected on CPT 99285 (ED Readmission) due to missing modifier -27.",
    decisionExplanation: "Flagged mismatch on Sarah Jenkins' claim: ECG billing code requires an active cardiac primary symptom index.",
    logs: [
      "[INFO] Coding Compliance Agent checking batch 2026-05-21-B.",
      "[NCCI] Validating CPT codes against National Correct Coding Initiative guidelines.",
      "[ALERT] Mismatch on CLM-8841: ECG CPT 93000 mapped to Asthma J45.909.",
      "[SUGGESTION] Remapping diagnosis code from Asthma to Chest Pain R07.9 based on nurse check-in reports.",
      "[INFO] Sent modification flag to billing desk."
    ]
  },
  {
    id: "AGT-PRIORAUTH",
    name: "Prior Authorization Agent",
    role: "Pre-Service Authorization & Verification",
    status: "active",
    systemUsage: 42,
    activeTasks: [
      "Checking scheduler for upcoming surgical procedures (24hr window)",
      "Verifying auth requirement on inpatient total knee replacement"
    ],
    prediction: "Prior Auth required for scheduled outpatient CT on Patient: David Miller. Aetna approval latency is 4.8 days.",
    decisionExplanation: "Automated submission triggered to prevent denial code 197 on high-risk CPT 27447.",
    logs: [
      "[INFO] Prior Auth Agent scanning hospital scheduling system...",
      "[FOUND] Inpatient surgery: CPT 27447 (Knee Replacement) scheduled for 2026-05-24.",
      "[PORTAL] Simulating secure login to Cigna Provider Portal...",
      "[STATUS] Prior authorization required. Submitting medical documentation package...",
      "[SUCCESS] Claim auth submitted. Reference ID: AUTH-SIG-88127. Waiting on payer gateway..."
    ]
  },
  {
    id: "AGT-FORECAST",
    name: "CFO Forecast Agent",
    role: "Predictive Analytics & Financial Modeling",
    status: "idle",
    systemUsage: 12,
    activeTasks: [
      "Recalculating monthly cash flow projection index",
      "Updating denial probability vectors based on new Payer rules"
    ],
    prediction: "Recovered revenue forecasted to exceed $940,000 for Q2, reducing Days Sales Outstanding (DSO) by 1.8 days.",
    decisionExplanation: "Denial rate modeling updated to reflect Cigna's tightened out-of-network rules.",
    logs: [
      "[INFO] CFO Forecast Agent activated on daily scheduler.",
      "[DB] Querying historical denial metrics (180 days)...",
      "[RUN] Executing linear regression model on recovery cycle times.",
      "[UPDATE] Predicted recovery rate for UnitedHealthcare adjusted downward by 2.1%.",
      "[STATS] Next month forecasted recovery pool: $382,000. Under review."
    ]
  },
  {
    id: "AGT-PAYER",
    name: "Payer Intelligence Agent",
    role: "Payer Ruleset & Policy Compliance Mining",
    status: "active",
    systemUsage: 89,
    activeTasks: [
      "Scraping Medicare LCD bulletins for updated cardiac criteria",
      "Monitoring UHC portal response latencies"
    ],
    prediction: "UnitedHealthcare response time expected to spike to 32 days due to API gateway maintenance.",
    decisionExplanation: "Flagging increased processing delays for claims submitted between May 15th and May 25th.",
    logs: [
      "[INFO] Payer Intelligence Agent scraping rulesets...",
      "[SCRAPE] Checked Medicare Local Coverage Determination (LCD) L34032.",
      "[UPDATE] No changes detected in oncology PET scans rules.",
      "[MONITOR] UHC API response latency rose from 180ms to 2400ms.",
      "[INFO] Registered service alert: UHC Portal Gateway Congestion."
    ]
  }
];
