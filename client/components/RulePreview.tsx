export default function RulePreview() {
  const rules = {
    required_fields: ["gpa", "cgpa", "result_status"],
    rules: [
      "GPA must be between 0 and 10",
      "Result depends on subject grades",
      "CGPA should not deviate too much from GPA",
    ],
  };

  return (
    <div className="border border-gray-200 rounded-lg bg-gray-50 p-6">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Verification Rules Configuration
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Organizations configure what they trust. The system enforces it.
        </p>
      </div>

      <div className="bg-white rounded border border-gray-200 p-4 font-mono text-sm overflow-x-auto">
        <div className="text-gray-400">
          <div className="text-gray-700">{`{`}</div>
          <div className="ml-4 text-gray-700">
            <div>
              <span className="text-blue-600">"required_fields"</span>
              <span className="text-gray-700">: [</span>
            </div>
            <div className="ml-4">
              {rules.required_fields.map((field, idx) => (
                <div key={idx}>
                  <span className="text-green-600">"{field}"</span>
                  {idx < rules.required_fields.length - 1 ? "," : ""}
                </div>
              ))}
            </div>
            <div className="text-gray-700">],</div>
          </div>
          <div className="ml-4 text-gray-700">
            <div>
              <span className="text-blue-600">"rules"</span>
              <span className="text-gray-700">: [</span>
            </div>
            <div className="ml-4">
              {rules.rules.map((rule, idx) => (
                <div key={idx}>
                  <span className="text-green-600">"{rule}"</span>
                  {idx < rules.rules.length - 1 ? "," : ""}
                </div>
              ))}
            </div>
            <div className="text-gray-700">]</div>
          </div>
          <div className="text-gray-700">{`}`}</div>
        </div>
      </div>
    </div>
  );
}
