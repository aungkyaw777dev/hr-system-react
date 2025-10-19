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
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="items-center">
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
              <Check className="h-10 w-10 text-white" strokeWidth={3} />
            </div>
          </div>
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
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-10"
          >
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
