import ConfirmDialog from "@/components/ui/confirm-dialog";

export interface PayrollDeleteProps {
  open: boolean;
  employeeName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function PayrollDelete({
  open,
  onConfirm,
  onCancel,
}: PayrollDeleteProps) {
  return (
    <ConfirmDialog
      open={open}
      title="Are you sure you want to delete this record?"
      description={
         "This action cannot be undone."
      }
      confirmLabel="Delete"
      cancelLabel="Cancel"
      tone="danger"
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}
