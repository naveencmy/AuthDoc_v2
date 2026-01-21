import { AlertCircle } from "lucide-react";

interface ExplanationPanelProps {
  title?: string;
  explanations: string[];
}

export default function ExplanationPanel({
  title = "Why was this flagged?",
  explanations,
}: ExplanationPanelProps) {
  if (!explanations || explanations.length === 0) {
    return null;
  }

  return (
    <div className="border border-amber-200 rounded-lg bg-amber-50 p-6">
      <div className="flex items-start gap-3 mb-4">
        <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <h3 className="text-sm font-semibold text-amber-900">{title}</h3>
      </div>

      <ul className="space-y-2">
        {explanations.map((explanation, index) => (
          <li key={index} className="text-sm text-amber-800 flex gap-3">
            <span className="text-amber-600 font-semibold flex-shrink-0">•</span>
            <span>{explanation}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
