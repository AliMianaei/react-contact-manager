import { toast } from "react-toastify"

export const successMessage = msg => toast.success(msg);
export const errorMessage = msg => toast.error(msg);
export const infoMessage = msg => toast.info(msg);