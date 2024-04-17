"use client"
import {closeSnackbar} from "notistack";
export const closeButton = (snackbarId: any) => (
    <button onClick={() => { closeSnackbar(snackbarId) }}>
        ╳
    </button>
);