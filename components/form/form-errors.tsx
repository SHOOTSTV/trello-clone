import { XCircle } from "lucide-react";

type FormErrorsProps = {
  id: string;
  errors?: Record<string, string[] | undefined>;
};

export const FormErrors = ({ id, errors }: FormErrorsProps) => {
  if (!errors) return null;

  return (
    <div
      id={`${id}-error`}
      aria-live="polite"
      className="mt-2 text-xs text-rose-500"
    >
      {errors?.[id]?.map((error: string) => (
        <div
          key={error}
          className="flex items-center rounded-sm border border-rose-500 bg-rose-100/10 p-2 font-medium"
        >
          <XCircle className="mr-2 size-4" />
          {error}
        </div>
      ))}
    </div>
  );
};
