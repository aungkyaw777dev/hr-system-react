import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
      <AlertDialogContent className="max-w-md max-h-xs flex flex-col gap-6 border-none">
        <div className="relative flex flex-col items-center text-center">
          <div className="mb-4 absolute -top-20 bg-white rounded-full p-4">
            <div className="mx-auto w-18 h-18 bg-primary-500 rounded-full flex items-center justify-center">
              <Check className="h-10 w-10 text-white" strokeWidth={3} />
            </div>
          </div>
        </div>
        <AlertDialogHeader className="items-center mt-2">
          <AlertDialogTitle className="text-xl text-center">
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-primary-500 hover:bg-emerald-600 text-white px-10"
          >
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
