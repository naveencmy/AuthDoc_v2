import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, DownloadCloud, RefreshCw } from "lucide-react";
import ResultsTable, { ExtractionResult } from "@/components/ResultsTable";
import RulePreview from "@/components/RulePreview";
import ExplanationPanel from "@/components/ExplanationPanel";

type OrganizationPolicy = "strict" | "lenient";

// Mock configuration for University A (Strict)
const strictPolicy = {
  name: "University A (Strict)",
  requiredFields: ["gpa", "cgpa", "result_status"],
  rules: [
    "GPA must be between 0 and 10",
    "Result depends on subject grades",
    "CGPA deviation ≤ 1.0",
  ],
};

// Mock configuration for University B (Lenient)
const lenientPolicy = {
  name: "University B (Lenient)",
  requiredFields: ["gpa", "result_status"],
  rules: [
    "GPA must be between 5 and 10",
    "CGPA deviation ≤ 2.0",
  ],
};

// Mock results for Strict policy
const strictResults: ExtractionResult[] = [
  {
    field: "Student Name",
    value: "Naveen Kumar M E",
    status: "VERIFIED",
    reason: "Clear text match with confidence 98%",
  },
  {
    field: "GPA",
    value: "7.85",
    status: "VERIFIED",
    reason: "Within allowed range (0-10)",
  },
  {
    field: "CGPA",
    value: "6.10",
    status: "FLAGGED",
    reason: "Deviation from GPA exceeds threshold (1.0 > 1.0)",
  },
  {
    field: "Result",
    value: "PASS",
    status: "FLAGGED",
    reason: "Subject grade inconsistency detected",
  },
  {
    field: "Semester",
    value: "Fall 2024",
    status: "VERIFIED",
    reason: "Date format valid and parseable",
  },
  {
    field: "Institution",
    value: "XYZ University",
    status: "VERIFIED",
    reason: "Institution recognized in database",
  },
];

// Mock results for Lenient policy (CGPA becomes verified, but Result remains flagged)
const lenientResults: ExtractionResult[] = [
  {
    field: "Student Name",
    value: "Naveen Kumar M E",
    status: "VERIFIED",
    reason: "Clear text match with confidence 98%",
  },
  {
    field: "GPA",
    value: "7.85",
    status: "VERIFIED",
    reason: "Within allowed range (5-10)",
  },
  {
    field: "CGPA",
    value: "6.10",
    status: "VERIFIED",
    reason: "Deviation from GPA within threshold (1.75 ≤ 2.0)",
  },
  {
    field: "Result",
    value: "PASS",
    status: "FLAGGED",
    reason: "Subject grade inconsistency detected",
  },
  {
    field: "Semester",
    value: "Fall 2024",
    status: "VERIFIED",
    reason: "Date format valid and parseable",
  },
  {
    field: "Institution",
    value: "XYZ University",
    status: "VERIFIED",
    reason: "Institution recognized in database",
  },
];

export default function Results() {
  const navigate = useNavigate();
  const [selectedPolicy, setSelectedPolicy] = useState<OrganizationPolicy>("strict");

  // Select results based on policy
  const mockResults = selectedPolicy === "strict" ? strictResults : lenientResults;
  const currentPolicy = selectedPolicy === "strict" ? strictPolicy : lenientPolicy;

  const flaggedCount = mockResults.filter(
    (r) => r.status === "FLAGGED"
  ).length;
  const verifiedCount = mockResults.filter(
    (r) => r.status === "VERIFIED"
  ).length;

  // Dynamic explanations based on policy
  const explanations =
    selectedPolicy === "strict"
      ? [
          "CGPA flagged because deviation from GPA exceeds configured threshold of 1.0",
          "Result status flagged due to failed subject detected in transcript",
        ]
      : [
          "Result status flagged due to failed subject detected in transcript",
        ];

  const overallStatus = flaggedCount === 0 ? "All Clear" : "Review Required";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AuthDoc</span>
            </div>
            <div className="text-sm text-gray-600">Step 2 of 2</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Verification Results
              </h1>
              <p className="text-gray-600">
                Document: semester_grades_fall2024.pdf
              </p>
            </div>
            <div className={`px-4 py-2 rounded-lg font-semibold ${
              flaggedCount === 0
                ? "bg-green-100 text-green-700"
                : "bg-amber-100 text-amber-700"
            }`}>
              {overallStatus}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Fields</p>
              <p className="text-2xl font-bold text-gray-900">
                {mockResults.length}
              </p>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Verified</p>
              <p className="text-2xl font-bold text-green-600">{verifiedCount}</p>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Flagged</p>
              <p className="text-2xl font-bold text-amber-600">{flaggedCount}</p>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Accuracy</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round((verifiedCount / mockResults.length) * 100)}%
              </p>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Extraction & Verification Details
          </h2>
          <ResultsTable results={mockResults} />
        </div>

        {/* Explanation Panel - only show if there are flagged items */}
        {flaggedCount > 0 && (
          <div className="mb-8">
            <ExplanationPanel explanations={explanations} />
          </div>
        )}

        {/* Organization Policy Selector */}
        <div className="mb-8">
          <div className="border border-gray-200 rounded-lg bg-white p-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">
              Organization Policy
            </h3>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <button
                onClick={() => setSelectedPolicy("strict")}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                  selectedPolicy === "strict"
                    ? "bg-blue-600 text-white border border-blue-600"
                    : "bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300"
                }`}
              >
                University A (Strict)
              </button>
              <button
                onClick={() => setSelectedPolicy("lenient")}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                  selectedPolicy === "lenient"
                    ? "bg-blue-600 text-white border border-blue-600"
                    : "bg-gray-50 text-gray-700 border border-gray-200 hover:border-gray-300"
                }`}
              >
                University B (Lenient)
              </button>
            </div>

            <p className="text-sm text-gray-600">
              Organizations configure what they trust. AuthDoc enforces the selected policy.
            </p>
          </div>
        </div>

        {/* Rule Preview */}
        <div className="mb-8">
          <RulePreview
            requiredFields={currentPolicy.requiredFields}
            rules={currentPolicy.rules}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <button
            onClick={() => navigate("/upload")}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Upload Another Document
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <DownloadCloud className="w-4 h-4" />
            Download Report
          </button>
        </div>

        {/* Information Card */}
        <div className="mt-12 p-8 bg-white border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Understanding the Results
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-3">
                <span className="text-lg">✓</span>
                <span>Verified</span>
              </div>
              <p className="text-sm text-gray-600">
                Data has been extracted successfully and passes all verification
                rules
              </p>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium mb-3">
                <span className="text-lg">⚠</span>
                <span>Flagged</span>
              </div>
              <p className="text-sm text-gray-600">
                Data extracted but failed one or more verification rules. See
                explanation above.
              </p>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-medium mb-3">
                <span className="text-lg">?</span>
                <span>Missing</span>
              </div>
              <p className="text-sm text-gray-600">
                Required field could not be found or extracted from the
                document
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-8 text-center text-sm text-gray-600">
          <p>AuthDoc — Automated Document Extraction & Verification System</p>
        </div>
      </footer>
    </div>
  );
}
