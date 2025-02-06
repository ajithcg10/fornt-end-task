import { AlertTriangle } from "lucide-react";

interface ErrorHandlerProps {
  error: string;
}

export default function ErrorHandler({ error }: ErrorHandlerProps) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-red-50 px-4">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg border border-red-300 max-w-lg text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="text-red-600 w-12 h-12" />
        </div>
        <h2 className="text-lg font-semibold text-red-700 mb-2">
          Something went wrong!
        </h2>
        <p className="text-gray-700 mb-4">{error}</p>
      </div>
    </div>
  );
}
