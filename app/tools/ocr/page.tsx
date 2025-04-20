"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import ToolLayout from "@/components/tool-layout"
import { BackdropLoader } from "@/components/ui/BackdropLoader"
import { Dropzone } from "@/components/ocr/Dropzone"
import { PreviewList } from "@/components/ocr/PreviewList"
import { ProcessedData } from "@/components/ocr/ProcessedData"
import { IProcessedFile, PerformOCR } from "@/lib/ocr_utils/PerformOCR"

export default function OcrTool() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [processedFiles, setProcessedFiles] = useState<IProcessedFile[]>([]);
  const processFiles = () => {
    setIsProcessing(true);
      const ocr = new PerformOCR(selectedFiles);
      ocr.processFiles().then((data: IProcessedFile[]) => {
          console.log("In content the final callback", data)
          setIsProcessing(false);
          setProcessedFiles(data);
      });
  }

  return (
    <ToolLayout title="OCR Tool" description="Extract text from images">
      <div className="flex flex-col justify-top items-center w-full gap-4" style={{ minHeight: "calc(85vh - 200px)"}}>
        <p className="mb-4">
        Our web application allows users to extract text from images and PDFs quickly and easily. Simply upload your document, and our tool will convert it into editable text, which you can copy and use as needed.
        </p>
        <p className="mb-4">
        This application is ideal for students, professionals, and anyone needing to digitize written content. Utilizing advanced OCR (Optical Character Recognition) technology, it ensures accurate text extraction from various document types.
        </p>
        <p className="mb-4">
        Start using our tool today to simplify your workflow and enhance productivity.
        </p>
        <BackdropLoader loading={isProcessing} />
        <Dropzone onFilesSelected={(files) => setSelectedFiles(files)}/> 
        <PreviewList fileObjects={selectedFiles} useChipsForPreview={false} handleRemove={(i) => setSelectedFiles(selectedFiles.filter((v, idx) => idx !== i))} />
        <div className="flex flex-row gap-2">
            <Button onClick={processFiles} disabled={selectedFiles.length === 0}>Extract</Button>
            <Button color="secondary"  disabled={selectedFiles.length === 0}
            onClick={() => {
                setSelectedFiles([]);
                setProcessedFiles([]);
            }}>Reset</Button>
        </div>    
        {processedFiles.length > 0 && <ProcessedData files={processedFiles} />}
      </div>
    </ToolLayout>
  )
}
