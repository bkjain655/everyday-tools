"use client";

import { Toaster } from "./ui/toaster";
import { Toaster as SonnerToaster } from "./ui/sonner";

export const ToasterWrapper = () => {
    return (
        <>
            <Toaster />
            <SonnerToaster />
        </>
    );
}
