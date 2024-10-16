import { FileUpload, FileUploadProps } from "primereact/fileupload";
import { ChangeEvent, useEffect, useRef } from "react";

export type UploadFieldProps = Partial<FileUploadProps> & {
  name: string;
  value: { file: File | null; previewUrl: string } | null;
  label?: string;
  errorMessage?: string;
  rootClassName?: string;
  onChange?: (value: { file: File | null; previewUrl: string }) => void;
};

export function UploadField({
  name,
  value,
  label,
  errorMessage,
  rootClassName,
  onChange,
  ...rest
}: UploadFieldProps) {
  const fileUploadRef = useRef<FileUpload>(null);
  const previewUrl = value?.["previewUrl"] || "";
  const inputId = `photo-field-${name}`;

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    onChange?.({
      file,
      previewUrl: url,
    });

    // clear input file value to allow select duplicate file
    e.target.value = "";
  };

  const handleUpload = () => {};

  const handleSelect = (e: any) => {
    console.log("🚀 ~ handleSelect ~ e:", e);
  };

  const itemTemplate = (inFile: object) => {
    const file = inFile as File;
    console.log("🚀 ~ itemTemplate ~ file:", file);
    return (
      <div className="flex align-items-center flex-wrap">
        <div className="flex align-items-center" style={{ width: "40%" }}>
          // @ts-ignore
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
          />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex align-items-center flex-column">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-5"
        >
          Drag and Drop Image Here
        </span>
      </div>
    );
  };

  return (
    <div className={rootClassName}>
      {label && (
        <label className="mb-[10px] block w-fit text-[14px] leading-4 font-medium text-[#1F1F1F]">
          {label}
        </label>
      )}

      <FileUpload
        ref={fileUploadRef}
        name={name}
        url="/api/upload"
        accept="image/*"
        maxFileSize={1000000}
        onUpload={handleUpload}
        onSelect={handleSelect}
        headerTemplate={<div className="hidden"></div>}
        itemTemplate={itemTemplate}
        emptyTemplate={emptyTemplate}
        contentClassName="rounded-lg border-dashed"
        {...rest}
      />

      {errorMessage && (
        <p className="my-2 text-start text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
