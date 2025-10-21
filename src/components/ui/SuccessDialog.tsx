import {
  AlertDialog,
  AlertDialogContent,
} from "../../components/ui/alert-dialog";
import { Check } from "lucide-react";

interface SuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
}

export function SuccessDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Success!",
  description = "New Data has been added successfully.",
}: SuccessDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-sm bg-white border-0 shadow-lg">
        <div className="flex flex-col items-center p-8 space-y-6">
          {/* Success Icon */}
          <div className="relative">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <Check className="h-8 w-8 text-emerald-500" strokeWidth={3} />
              </div>
            </div>
          </div>
          
          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            {title}
          </h2>
          
          {/* Description */}
          <p className="text-base text-gray-700 text-center leading-relaxed">
            {description}
          </p>
          
          {/* OK Button */}
          <button
            onClick={onConfirm}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            OK
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
