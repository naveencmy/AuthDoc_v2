import { Check, AlertCircle, HelpCircle } from "lucide-react";

export interface ExtractionResult {
  field: string;
  value: string;
  status: "VERIFIED" | "FLAGGED" | "MISSING";
  reason: string;
}

interface ResultsTableProps {
  results: ExtractionResult[];
}

const StatusBadge = ({
  status,
}: {
  status: "VERIFIED" | "FLAGGED" | "MISSING";
}) => {
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

export default function ResultsTable({ results }: ResultsTableProps) {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Field
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Extracted Value
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
              Reason
            </th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr
              key={index}
              className={`border-b border-gray-100 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50 transition-colors`}
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {result.field}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {result.value || "—"}
              </td>
              <td className="px-6 py-4 text-sm">
                <StatusBadge status={result.status} />
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {result.reason}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
