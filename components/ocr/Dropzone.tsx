"use client"
import { useCallback } from "react"
import {useDropzone} from 'react-dropzone'

const accept = {'image/*': [], 'application/pdf': [],};
export const Dropzone = ({ onFilesSelected }: { onFilesSelected: (files: File[]) => void }) => {
    const isDarkMode = false;
    const classes = isDarkMode ? 'text-white border-white' : 'border-slate-300 bg-slate-100 text-slate-400';
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onFilesSelected(acceptedFiles);
    }, [onFilesSelected]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept})

    return (
        <div className={`flex flex-row justify-center items-center w-full min-h-40 h-full border-2 border-dashed rounded-md p-4 ${classes}`} {...getRootProps()}>
            <input {...getInputProps()} />
            {
            isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drop your files here, or click to upload from your device.</p>
            }
        </div>
    )
}