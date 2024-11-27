"use client";

import React, { useState, useActionState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send, Upload } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";
import Image from "next/image";

// Define form field configuration
const formFields = [
  {
    id: 'title',
    label: 'Title',
    type: 'input',
    placeholder: 'Project Title',
  },
  {
    id: 'description',
    label: 'Description',
    type: 'textarea',
    placeholder: 'Project Description',
  },
  {
    id: 'category',
    label: 'Category',
    type: 'input',
    placeholder: 'Project Category (Tech, Health, Education...)',
  },
  {
    id: 'link',
    label: 'Image URL',
    type: 'input',
    placeholder: 'Project Image URL',
  },
] as const;

// Add these styles at the top of your file
const formStyles = {
  wrapper: "max-w-4xl mx-auto p-8 bg-gradient-to-br from-[#1e1e1e] via-[#2d3e50] to-[#4c5c68] rounded-2xl shadow-xl space-y-8",
  formGroup: "mb-8",
  label: "block text-sm font-semibold text-white mb-3",
  input: "w-full px-5 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-400 text-black",
  textarea: "w-full px-5 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all min-h-[120px] placeholder:text-slate-400 text-black",
  error: "mt-2 text-sm text-rose-500 font-medium",
  button: "w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-3 font-medium text-lg",
  editorWrapper: "mt-8 overflow-hidden rounded-xl border-2 border-slate-200",
};

// Form field component
const FormField = ({ 
  field, 
  error 
}: { 
  field: typeof formFields[number],
  error?: string 
}) => (
  <div className={formStyles.formGroup}>
    <label htmlFor={field.id} className={formStyles.label}>
      {field.label}
    </label>
    {field.type === 'input' ? (
      <Input
        id={field.id}
        name={field.id}
        className={formStyles.input}
        required
        placeholder={field.placeholder}
      />
    ) : (
      <Textarea
        id={field.id}
        name={field.id}
        className={formStyles.textarea}
        required
        placeholder={field.placeholder}
      />
    )}
    {error && <p className={formStyles.error}>{error}</p>}
  </div>
);

const ProjectForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const { toast } = useToast();
  const router = useRouter();

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  }, []);

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        category: formData.get("category") as string,
        link: formData.get("link") ,
        pitch,
      };

      await formSchema.parseAsync(formValues);

      const result = await createPitch(prevState, formData, pitch);

      if (result.status == "SUCCESS") {
        toast({
          title: "Success",
          description: "Your project pitch has been created successfully",
        });

        router.push(`/projects/${result._id}`);
      }

      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;

        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast({
          title: "Error",
          description: "Please check your inputs and try again",
          variant: "destructive",
        });

        return { ...prevState, error: "Validation failed", status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
        variant: "destructive",
      });

      return {
        ...prevState,
        error: "An unexpected error has occurred",
        status: "ERROR",
      };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form action={formAction} className={formStyles.wrapper}>
      <div className="space-y-8">
        {formFields.map((field) => (
          <FormField 
            key={field.id} 
            field={field} 
            error={errors[field.id]} 
          />
        ))}

        {/* Image Upload Field */}
        <div className="space-y-2">
          <label htmlFor="image" className={formStyles.label}>
            Project Image
          </label>
          <div className="flex flex-col items-center p-4 border-2 border-dashed rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            
            {imagePreview ? (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview("");
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ) : (
              <label
                htmlFor="image"
                className="flex flex-col items-center gap-2 cursor-pointer p-4"
              >
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="text-sm text-gray-500">
                  Click to upload or drag and drop
                </span>
                <span className="text-xs text-gray-400">
                  PNG, JPG, WEBP up to 5MB
                </span>
              </label>
            )}
          </div>
          {errors.image && <p className={formStyles.error}>{errors.image}</p>}
        </div>

        <div className={formStyles.editorWrapper} data-color-mode="light">
          <label htmlFor="pitch" className={formStyles.label}>
            Pitch
          </label>
          <MDEditor
            value={pitch}
            onChange={(value) => setPitch(value as string)}
            id="pitch"
            preview="edit"
            height={400}
            textareaProps={{
              placeholder: "Briefly describe your idea and what problem it solves",
            }}
            previewOptions={{
              disallowedElements: ["style"],
            }}
          />
          {errors.pitch && <p className={formStyles.error}>{errors.pitch}</p>}
        </div>
      </div>

      <div className="mt-10">
        <Button
          type="submit"
          className={formStyles.button}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <span className="animate-pulse">Submitting...</span>
              <div className="w-6 h-6 border-t-2 border-white rounded-full animate-spin" />
            </>
          ) : (
            <>
              Submit Your Project
              <Send className="w-6 h-6" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;