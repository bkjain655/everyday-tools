import React from 'react';
import {
  FileText,
  FileType,
  File,
  Trash2,
  X
} from 'lucide-react'; // You can replace with your preferred icons

const getPreviewIcon = (file: File) => {
  const { type } = file;

  switch (type) {
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return <FileType className="" size={20} />;
    case 'application/pdf':
      return <FileText className="" size={20} />;
    default:
      return <File className="" size={20} />;
  }
};

export const PreviewList = ({
  fileObjects,
  handleRemove,
  useChipsForPreview
}: {
  fileObjects: File[];
  handleRemove: (i: number) => void;
  useChipsForPreview: boolean;
}) => {
  if (useChipsForPreview) {
    return (
      <ul className="space-y-2">
        {fileObjects.map((file, i) => (
          <li
            key={i}
            className="inline-flex items-center text-slate-500 bg-slate-100 border border-slate-300 rounded-full px-3 py-1 text-sm"
          >
            <span className="mr-2">{file.name}</span>
            <button
              onClick={() => handleRemove(i)}
              className="hover:text-red-500 focus:outline-none"
            >
              <X size={16} />
            </button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2">
      {fileObjects.map((file, i) => (
        <li
          key={i}
          className="flex items-center justify-between p-2 rounded-md transition-colors gap-4"
        >
          <div className="flex items-center gap-2">
            {getPreviewIcon(file)}
            <span>{file.name}</span>
          </div>
          <button onClick={() => handleRemove(i)} className="hover:text-red-500">
            <Trash2 size={18} />
          </button>
        </li>
      ))}
    </ul>
  );
};
