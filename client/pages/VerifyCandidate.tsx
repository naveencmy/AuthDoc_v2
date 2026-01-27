import { useParams, useNavigate } from "react-router-dom";
import { CheckCircle, ChevronLeft } from "lucide-react";
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

// Mock candidate data mapping
const candidateDataMap: Record<
  string,
  { name: string; results: ExtractionResult[]; explanations: string[] }
> = {
  "1": {
    name: "Naveen Kumar M E",
    results: [
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
    ],
    explanations: [
      "CGPA flagged because deviation from GPA exceeds configured threshold of 1.0",
      "Result status flagged due to failed subject detected in transcript",
    ],
  },
  "2": {
    name: "Priya Sharma",
    results: [
      {
        field: "Student Name",
        value: "Priya Sharma",
        status: "VERIFIED",
        reason: "Clear text match with confidence 99%",
      },
      {
        field: "GPA",
        value: "8.42",
        status: "VERIFIED",
        reason: "Within allowed range (0-10)",
      },
      {
        field: "CGPA",
        value: "8.15",
        status: "VERIFIED",
        reason: "Deviation from GPA within threshold (0.27 ≤ 1.0)",
      },
      {
        field: "Result",
        value: "PASS",
        status: "VERIFIED",
        reason: "All subject grades consistent and passing",
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
    ],
    explanations: [],
  },
  "3": {
    name: "Rajesh Patel",
    results: [
      {
        field: "Student Name",
        value: "Rajesh Patel",
        status: "VERIFIED",
        reason: "Clear text match with confidence 97%",
      },
      {
        field: "GPA",
        value: "7.20",
        status: "VERIFIED",
        reason: "Within allowed range (0-10)",
      },
      {
        field: "CGPA",
        value: "7.05",
        status: "VERIFIED",
        reason: "Deviation from GPA within threshold (0.15 ≤ 1.0)",
      },
      {
        field: "Result",
        value: "CONDITIONAL PASS",
        status: "FLAGGED",
        reason: "One failed subject requires retake",
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
    ],
    explanations: [
      "Result status flagged - candidate has a failed subject that requires retake or additional coursework",
    ],
  },
  "4": {
    name: "Anjali Gupta",
    results: [
      {
        field: "Student Name",
        value: "Anjali Gupta",
        status: "VERIFIED",
        reason: "Clear text match with confidence 99%",
      },
      {
        field: "GPA",
        value: "8.95",
        status: "VERIFIED",
        reason: "Within allowed range (0-10)",
      },
      {
        field: "CGPA",
        value: "8.88",
        status: "VERIFIED",
        reason: "Deviation from GPA within threshold (0.07 ≤ 1.0)",
      },
      {
        field: "Result",
        value: "PASS",
        status: "VERIFIED",
        reason: "All subject grades consistent and excellent",
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
    ],
    explanations: [],
  },
  "5": {
    name: "Arjun Singh",
    results: [
      {
        field: "Student Name",
        value: "Arjun Singh",
        status: "VERIFIED",
        reason: "Clear text match with confidence 96%",
      },
      {
        field: "GPA",
        value: "5.10",
        status: "FLAGGED",
        reason: "GPA below minimum acceptable threshold (5.0)",
      },
      {
        field: "CGPA",
        value: "5.35",
        status: "VERIFIED",
        reason: "Deviation from GPA within threshold (0.25 ≤ 1.0)",
      },
      {
        field: "Result",
        value: "PASS",
        status: "VERIFIED",
        reason: "All subject grades consistent and passing",
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
    ],
    explanations: [
      "GPA flagged - score (5.10) falls below the minimum acceptable threshold of 5.0",
    ],
  },
  "6": {
    name: "Meera Nair",
    results: [
      {
        field: "Student Name",
        value: "Meera Nair",
        status: "VERIFIED",
        reason: "Clear text match with confidence 98%",
      },
      {
        field: "GPA",
        value: "8.65",
        status: "VERIFIED",
        reason: "Within allowed range (0-10)",
      },
      {
        field: "CGPA",
        value: "8.52",
        status: "VERIFIED",
        reason: "Deviation from GPA within threshold (0.13 ≤ 1.0)",
      },
      {
        field: "Result",
        value: "PASS",
        status: "VERIFIED",
        reason: "All subject grades consistent and excellent",
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
    ],
    explanations: [],
  },
};

export default function VerifyCandidate() {
  const { candidateId } = useParams<{ candidateId: string }>();
  const navigate = useNavigate();

  if (!candidateId || !candidateDataMap[candidateId]) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Candidate Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The candidate you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/batch-results")}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Batch Results
          </button>
        </div>
      </div>
    );
  }

  const candidateData = candidateDataMap[candidateId];
  const mockResults = candidateData.results;
  const explanations = candidateData.explanations;

  const flaggedCount = mockResults.filter((r) => r.status === "FLAGGED").length;
  const verifiedCount = mockResults.filter(
    (r) => r.status === "VERIFIED",
  ).length;
  const overallStatus = flaggedCount === 0 ? "All Clear" : "Review Required";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/batch-results")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => navigate("/")}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">AuthDoc</span>
              </div>
            </div>
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
                {candidateData.name}
              </h1>
              <p className="text-gray-600">Verification Results</p>
            </div>
            <div
              className={`px-4 py-2 rounded-lg font-semibold ${
                flaggedCount === 0
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
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
              <p className="text-2xl font-bold text-green-600">
                {verifiedCount}
              </p>
            </div>
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Flagged</p>
              <p className="text-2xl font-bold text-amber-600">
                {flaggedCount}
              </p>
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

        {/* Rule Preview */}
        <div className="mb-8">
          <RulePreview
            requiredFields={strictPolicy.requiredFields}
            rules={strictPolicy.rules}
          />
        </div>

        {/* Action Button */}
        <div className="flex gap-4 justify-start">
          <button
            onClick={() => navigate("/batch-results")}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Batch Results
          </button>
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
