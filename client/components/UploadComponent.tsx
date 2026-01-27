import { useState } from "react";
import { Cloud, Loader2 } from "lucide-react";

interface UploadComponentProps {
  onUpload: (files: File[]) => void;
  isLoading?: boolean;
}

export default function UploadComponent({
  onUpload,
  isLoading = false,
}: UploadComponentProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onUpload(Array.from(files));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      onUpload(Array.from(files));
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-lg p-8 md:p-12 text-center transition-all duration-200 ${
        isDragOver
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 bg-gray-50 hover:border-gray-400"
      } ${isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <input
        type="file"
        onChange={handleFileSelect}
        accept=".pdf,.png,.jpg,.jpeg"
        className="hidden"
        id="file-input"
        disabled={isLoading}
        multiple
      />

      <label htmlFor="file-input" className="cursor-pointer block">
        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
            <p className="text-lg font-medium text-gray-700">
              Extracting and verifying documents...
            </p>
            <p className="text-sm text-gray-500">Please wait</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <Cloud className="h-10 w-10 text-blue-500" />
            <p className="text-lg font-medium text-gray-700">
              Upload semester grade sheets
            </p>
            <p className="text-sm text-gray-500">
              Drag and drop one or more files, or click to browse
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Supported formats: PDF, PNG, JPG, JPEG
            </p>
          </div>
        )}
      </label>
    </div>
  );
}
