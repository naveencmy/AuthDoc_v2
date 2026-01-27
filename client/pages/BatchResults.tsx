import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Check, AlertCircle, HelpCircle } from "lucide-react";

// Status types
type Status = "VERIFIED" | "FLAGGED" | "MISSING";
type OverallStatus = "VERIFIED" | "FLAGGED" | "MISSING";

// Candidate data structure
interface CandidateResult {
  id: string;
  name: string;
  overall_status: OverallStatus;
  fields: {
    gpa: Status;
    cgpa: Status;
    result_status: Status;
  };
}

// Mock batch data
const mockBatchData: CandidateResult[] = [
  {
    id: "1",
    name: "Naveen Kumar M E",
    overall_status: "FLAGGED",
    fields: {
      gpa: "VERIFIED",
      cgpa: "FLAGGED",
      result_status: "VERIFIED",
    },
  },
  {
    id: "2",
    name: "Priya Sharma",
    overall_status: "VERIFIED",
    fields: {
      gpa: "VERIFIED",
      cgpa: "VERIFIED",
      result_status: "VERIFIED",
    },
  },
  {
    id: "3",
    name: "Rajesh Patel",
    overall_status: "FLAGGED",
    fields: {
      gpa: "VERIFIED",
      cgpa: "VERIFIED",
      result_status: "FLAGGED",
    },
  },
  {
    id: "4",
    name: "Anjali Gupta",
    overall_status: "VERIFIED",
    fields: {
      gpa: "VERIFIED",
      cgpa: "VERIFIED",
      result_status: "VERIFIED",
    },
  },
  {
    id: "5",
    name: "Arjun Singh",
    overall_status: "FLAGGED",
    fields: {
      gpa: "FLAGGED",
      cgpa: "VERIFIED",
      result_status: "VERIFIED",
    },
  },
  {
    id: "6",
    name: "Meera Nair",
    overall_status: "VERIFIED",
    fields: {
      gpa: "VERIFIED",
      cgpa: "VERIFIED",
      result_status: "VERIFIED",
    },
  },
];

// Status Badge Component (reused from Results)
const StatusBadge = ({ status }: { status: Status }) => {
  switch (status) {
    case "VERIFIED":
      return (
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
          <Check className="h-4 w-4" />
          <span>Verified</span>
        </div>
      );
    case "FLAGGED":
      return (
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-sm font-medium">
          <AlertCircle className="h-4 w-4" />
          <span>Flagged</span>
        </div>
      );
    case "MISSING":
      return (
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm font-medium">
          <HelpCircle className="h-4 w-4" />
          <span>Missing</span>
        </div>
      );
  }
};

export default function BatchResults() {
  const navigate = useNavigate();

  // Calculate summary stats
  const totalCandidates = mockBatchData.length;
  const verifiedCount = mockBatchData.filter(
    (c) => c.overall_status === "VERIFIED",
  ).length;
  const flaggedCount = mockBatchData.filter(
    (c) => c.overall_status === "FLAGGED",
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
              onClick={() => navigate("/")}
            >
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AuthDoc</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Batch Verification Results
          </h1>
          <p className="text-gray-600">
            Overview of document verification outcomes. Click a row to view
            details.
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-white border border-gray-200 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Candidates</p>
            <p className="text-2xl font-bold text-gray-900">
              {totalCandidates}
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
        </div>

        {/* Results Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Candidate Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    GPA
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    CGPA
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Result
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Overall Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockBatchData.map((candidate, index) => (
                  <tr
                    key={candidate.id}
                    onClick={() => navigate(`/verify/${candidate.id}`)}
                    className={`border-b border-gray-100 cursor-pointer transition-colors ${
                      index % 2 === 0
                        ? "bg-white hover:bg-blue-50"
                        : "bg-gray-50 hover:bg-blue-50"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {candidate.name}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge status={candidate.fields.gpa} />
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge status={candidate.fields.cgpa} />
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge status={candidate.fields.result_status} />
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <StatusBadge status={candidate.overall_status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Information Card */}
        <div className="mt-12 p-8 bg-white border border-gray-200 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Batch Verification Workflow
          </h3>
          <p className="text-gray-600 mb-4">
            AuthDoc verifies documents at scale and allows humans to review only
            flagged cases. Organizations can:
          </p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>
                Review all candidates in a single table for quick overview
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>
                Click any row to see detailed extraction and verification
                results
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <span>
                Focus review efforts on flagged candidates while approving
                verified ones
              </span>
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 text-center text-sm text-gray-600">
          <p>AuthDoc — Automated Document Extraction & Verification System</p>
        </div>
      </footer>
    </div>
  );
}
