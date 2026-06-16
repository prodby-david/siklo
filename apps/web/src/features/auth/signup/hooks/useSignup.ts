import { useState } from "react";
import { SignupFormData, SignupErrors, signupSchema } from "../types/signup.type";

const initialData: SignupFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  contactNumber: "",
};

export function useSignup(onSuccess?: () => void) {
  const [formData, setFormData] = useState<SignupFormData>(initialData);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const result = signupSchema.safeParse(formData);
    if (result.success) {
      setErrors({});
      return true;
    }

    const newErrors: SignupErrors = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path[0] as keyof SignupFormData;
      if (path && !newErrors[path]) {
        newErrors[path] = issue.message;
      }
    });

    setErrors(newErrors);
    return false;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof SignupFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitError) {
      setSubmitError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");
    
    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (formData.email === "error@siklo.com") {
            reject(new Error("This email is already registered"));
          } else {
            resolve(true);
          }
        }, 1500);
      });
      setIsSuccess(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    errors,
    isLoading,
    submitError,
    isSuccess,
    handleChange,
    handleSubmit,
  };
}
