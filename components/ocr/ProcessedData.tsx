import * as Accordion from '@radix-ui/react-accordion';
import { ChevronRight, Copy } from 'lucide-react';
import { IProcessedFile } from '@/lib/ocr_utils/PerformOCR';
import { copyTextToClipboard } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export const ProcessedData = ({ files }: { files: IProcessedFile[] }) => {
  const {toast} = useToast();
  const getData = (fileData: Tesseract.Page) => {
    return fileData.lines
      .map(line =>
        line.words
          .filter(word => word.confidence > 60)
          .map(word => word.text)
          .join(' ')
      )
      .join('\n');
  };

  return (
    <div className="p-2 flex flex-col gap-2 w-full">
      {files.map(file => {
        const arrayedData = Array.isArray(file.data) ? file.data : [file.data];

        return (
          <Accordion.Root
            key={file.name}
            type="single"
            collapsible
            className="border rounded border-slate-300 w-full"
          >
            <Accordion.Item value={file.name} className="w-full">
              <Accordion.Header className="w-full">
                <div className="flex items-center justify-between w-full bg-slate-200 px-4 py-2 hover:bg-slate-300">
                  {/* Left side: Accordion title */}
                  <Accordion.Trigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer text-slate-600 w-full">
                      <ChevronRight className="transition-transform data-[state=open]:rotate-90 text-slate-500" size={16} />
                      <span className="font-medium">{file.name}</span>
                    </div>
                  </Accordion.Trigger>

                  {/* Right side: Copy button */}
                  <div className="shrink-0 pl-4">
                    <Copy
                      size={16}
                      className="text-slate-500 hover:text-slate-700 cursor-pointer"
                      onClick={e => {
                        e.stopPropagation(); // Prevent accordion toggle
                        const data = arrayedData
                          .map(v => getData(v.data as Tesseract.Page))
                          .join('\n');
                        copyTextToClipboard(data);
                        toast({
                          duration: 2000,
                          description: 'The text has been copied to your clipboard.',
                        });
                      }}
                    />
                  </div>
                </div>
              </Accordion.Header>

              <Accordion.Content className="px-4 py-2 border-t border-slate-200 space-y-4">
                {arrayedData.map(({ data, img, error }, i) => (
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start"
                    key={i}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- client-generated blob:/data: URL, not optimisable by next/image */}
                    <img
                      src={img}
                      alt="base64 context"
                      className="max-w-full h-auto border rounded"
                      height="400"
                      width="600"
                    />
                    {data && <pre className="whitespace-pre-wrap text-left bg-slate-50 p-2 rounded border border-slate-200">
                      {getData(data as Tesseract.Page)}
                    </pre>}
                    {error && <pre className="whitespace-pre-wrap text-left bg-slate-50 p-2 rounded border border-slate-200 text-red-500">
                      <span className="font-bold">Error Occurred while extracting the image:</span> 
                      <br />
                      {error}
                    </pre>}
                  </div>
                ))}
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
        );
      })}
    </div>
  );
};
