import { toast } from "react-toastify";

import RHT from 'react-hot-toast';

export const successMessage = msg => toast.success(msg);
export const errorMessage = msg => toast.error(msg);
export const infoMessage = msg => toast.info(msg);

export const errorRHTMessage = msg => RHT.error(msg);