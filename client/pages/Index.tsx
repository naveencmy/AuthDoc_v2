import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AuthDoc</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          {/* Project Name */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            AuthDoc
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-blue-600 font-semibold mb-6">
            Verification-first document intelligence
          </p>

          {/* Description */}
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            AuthDoc extracts and verifies academic documents using configurable
            rules.
          </p>

          {/* Key Points */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Upload</h3>
              <p className="text-sm text-gray-600">
                Upload your academic document in PDF or image format
              </p>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Extract</h3>
              <p className="text-sm text-gray-600">
                AI extracts data fields from your document
              </p>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg">
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Verify</h3>
              <p className="text-sm text-gray-600">
                Rules-based verification ensures data quality
              </p>
            </div>
          </div>
        </div>

        {/* Primary CTA */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/upload")}
            className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
          >
            Upload Academic Document
          </button>
        </div>

        {/* Features Section */}
        <div className="mt-16 p-8 bg-white border border-gray-200 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Why AuthDoc?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="text-blue-600 font-bold text-xl flex-shrink-0 w-6">
                ✓
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">
                  Verification-First Approach
                </p>
                <p className="text-sm text-gray-600">
                  Prioritizes data accuracy and consistency over raw extraction
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-blue-600 font-bold text-xl flex-shrink-0 w-6">
                ✓
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">
                  Configurable Rules
                </p>
                <p className="text-sm text-gray-600">
                  Organizations define verification rules that matter to them
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-blue-600 font-bold text-xl flex-shrink-0 w-6">
                ✓
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">
                  Full Explainability
                </p>
                <p className="text-sm text-gray-600">
                  See exactly why data is verified or flagged
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-blue-600 font-bold text-xl flex-shrink-0 w-6">
                ✓
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-1">
                  Clean & Simple UI
                </p>
                <p className="text-sm text-gray-600">
                  Understand the product in less than 15 seconds
                </p>
              </div>
            </div>
          </div>
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
