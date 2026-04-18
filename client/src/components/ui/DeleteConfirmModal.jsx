import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "./alert-dialog";
import { Trash2 } from "lucide-react";

export function DeleteConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you absolutely sure?",
    description = "This action cannot be undone. This will permanently delete this item and remove it from our servers."
}) {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <Trash2 className="h-5 w-5 text-red-500" />
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={!isOpen} onClick={() => onClose(false)}>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                        onClick={(e) => {
                            e.preventDefault();
                            onConfirm();
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
