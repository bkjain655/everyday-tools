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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { gaCustomEvent } from "@/lib/gtag_utils"

export const OcrToolLayout = () => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [processedFiles, setProcessedFiles] = useState<IProcessedFile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const processFiles = async () => {
    setIsProcessing(true);
    setError(null);
    try {
      const ocr = new PerformOCR(selectedFiles);
      const data = await ocr.processFiles();
      setProcessedFiles(data);
      gaCustomEvent({
        action: "btn_click",
        category: "click",
        label: "ocr_extract",
        value: { tool: "ocr", fileCount: selectedFiles.length },
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Text extraction failed. Please try again.");
      setProcessedFiles([]);
    } finally {
      setIsProcessing(false);
    }
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
                setError(null);
            }}>Reset</Button>
        </div>
        {error && (
          <Alert variant="destructive" className="w-full">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {processedFiles.length > 0 && <ProcessedData files={processedFiles} />}
      </div>
    </ToolLayout>
  )
}
