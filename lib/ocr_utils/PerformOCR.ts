import Tesseract from 'tesseract.js';

export const PDFJS_CDN_BASE = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174";

// pdf.js is loaded lazily by the OCR route, so it may not be on `window` yet when
// the user hits Extract. Poll briefly, then give up with an actionable message.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function waitForPdfJs(timeoutMs = 15000): Promise<any> {
  const start = Date.now();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  while (!(window as any).pdfjsLib) {
    if (Date.now() - start > timeoutMs) {
      throw new Error(
        "The PDF engine failed to load. Check your network connection or ad blocker and try again."
      );
    }
    await new Promise((r) => setTimeout(r, 100));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfjsLib = (window as any).pdfjsLib;
  if (pdfjsLib.GlobalWorkerOptions && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `${PDFJS_CDN_BASE}/pdf.worker.min.js`;
  }
  return pdfjsLib;
}

export interface IProcessedFile {
  name: string;
  type: string;
  data: ITesseractResult | ITesseractResult[];
}

export interface ITesseractResult {
  error?: string;
  img?: string;
  data?: Tesseract.Page;
  text?: string;
}

export class PerformOCR {
  files: File[] = [];
  language;
  constructor(files: File[], language = "eng") {
    this.files = files
    this.language = language
  }

  async processFiles(): Promise<IProcessedFile[]> {
    const promises = this.files.map(file => {
      if (file.type === "application/pdf") {
        return this.processPDF(file);
      }
      return this.processImage(file);
    });
    const data = await Promise.all(promises);
    return data;
  }

  async processPDF(file: File): Promise<IProcessedFile> {
    const pdfjsLib = await waitForPdfJs();

    const existingPdfBytes = await file.arrayBuffer();
    const fileArray = new Uint8Array(existingPdfBytes);
    const doc = await pdfjsLib.getDocument({
      data: fileArray,
      useSystemFonts: true,
    }).promise
    const base64PDFImagesData = [];
    const numPages = doc.numPages;
    for (let i = 1; i < numPages + 1; i++) {
      const page = await doc.getPage(i)
      const viewport = page.getViewport({scale: 1.5})
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = viewport.width
      canvas.height = viewport.height
      await page.render({canvasContext: ctx, viewport: viewport}).promise
      const base64Image = canvas.toDataURL('image/png');
      const imageData = await this.performTesseractOp(base64Image);
      base64PDFImagesData.push(imageData);
    }
    return {
      name: file.name,
      type: file.type,
      data: base64PDFImagesData
    };
  }

  processImage(file: File): Promise<IProcessedFile> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => {
        reject(new Error(`Could not read "${file.name}". The file may be corrupt or unreadable.`));
      };
      reader.readAsDataURL(file);
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const base64Image = (event.target as FileReader).result as string;
        try {
          this.performTesseractOp(base64Image).then((res) => {
            resolve({
              name: file.name,
              type: file.type,
              data: res
            })
          }).catch((res) => {
            resolve({
              name: file.name,
              type: file.type,
              data: res
            })
          })
        } catch (e) {
          console.error(e);
          resolve({
            name: file.name,
            type: file.type,
            data: {
              error: (e as Error).message,
              img: base64Image
            }
          });
        }
      };
    });
  }

  async performTesseractOp(base64Image: string): Promise<ITesseractResult> {
    try {
      const res = await Tesseract
        .recognize(base64Image, this.language, {
          errorHandler: (e) => {
            throw e;
          }
      });
      return {
        data: res.data,
        img: base64Image
      };
    } catch (e_2: unknown) {
      return {
        error: (e_2 + ""),
        img: base64Image
      };
    }
  }
}