import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import UploadComponent from "@/components/UploadComponent";

export default function Upload() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (files: File[]) => {
    setIsLoading(true);

    // Simulate upload and processing delay for multiple files
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to batch results page
      navigate("/batch-results");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">AuthDoc</span>
            </div>
            <div className="text-sm text-gray-600">Batch Upload</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Batch Upload Academic Documents
          </h1>
          <p className="text-gray-600">
            Upload one or more semester grade sheets for extraction and verification
          </p>
        </div>

        {/* Upload Component */}
        <div className="mb-8">
          <UploadComponent onUpload={handleUpload} isLoading={isLoading} />
        </div>

        {/* Info Box */}
        <div className="p-6 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-3">
            What happens next?
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold flex-shrink-0">1.</span>
              <span>
                All documents will be processed by our AI extraction system
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold flex-shrink-0">2.</span>
              <span>
                Extracted data will be verified against configured rules
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold flex-shrink-0">3.</span>
              <span>
                You'll see a batch summary table with all results
              </span>
            </li>
            <li className="flex gap-3">
              <span className="text-blue-600 font-bold flex-shrink-0">4.</span>
              <span>
                Click any candidate to see detailed verification report
              </span>
            </li>
          </ul>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 mt-16">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 text-center text-sm text-gray-600">
          <p>AuthDoc — Automated Document Extraction & Verification System</p>
        </div>
      </footer>
    </div>
  );
}
