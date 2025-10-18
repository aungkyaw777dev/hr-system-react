import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {Trash2Icon } from "lucide-react";

export interface ConfirmDialogProps {
	open: boolean;
	title?: string;
	description?: string;
	confirmLabel?: string;
	cancelLabel?: string;
	tone?: "danger" | "default";
	onConfirm: () => void;
	onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
	open,
	title = "Are you sure you want to delete this record?",
	description = "This action cannot be undone",
	confirmLabel = "Delete",
	cancelLabel = "Cancel",
	onConfirm,
	onCancel,
}) => {
	if (!open) return null;

	return (
		<div
			role="dialog"
			aria-modal="true"
			className="fixed inset-0 z-50 flex items-center justify-center"
		>
			{/* Backdrop */}
			<div
				className="absolute inset-0 bg-black/40"
				onClick={onCancel}
				aria-hidden="true"
			/>

			{/* Panel */}
			<div
				className={cn(
					"relative w-[90%] max-w-md rounded-lg border bg-white p-6 shadow-lg",
					"animate-in fade-in zoom-in-95"
				)}
			>
				<div className="flex items-start justify-between">
					<h3 className="text-base font-semibold leading-6 text-foreground">
                        <Trash2Icon></Trash2Icon>
						{title}
					</h3>
					<button
						onClick={onCancel}
						aria-label="Close"
						className="rounded p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
					>
						<svg
							className="h-4 w-4"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>

				<p className="mt-2 text-sm text-muted-foreground">{description}</p>

				<div className="mt-6 flex justify-end gap-2">
					<Button variant="outline" onClick={onCancel}>
						{cancelLabel}
					</Button>
					<Button
						variant="outline"
						onClick={onConfirm}
					>
						{confirmLabel}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDialog;

