import { useState } from "react";
import { SigninFormData, SigninErrors, signinSchema } from "../types/signin.type";

const initialData: SigninFormData = {
  email: "",
  password: "",
};

export function useSignin(onSuccess?: () => void) {
  const [formData, setFormData] = useState<SigninFormData>(initialData);
  const [errors, setErrors] = useState<SigninErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const result = signinSchema.safeParse(formData);
    if (result.success) {
      setErrors({});
      return true;
    }

    const newErrors: SigninErrors = {};
    result.error.issues.forEach((issue) => {
      const path = issue.path[0] as keyof SigninFormData;
      if (path && !newErrors[path]) {
        newErrors[path] = issue.message;
      }
    });

    setErrors(newErrors);
    return false;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof SigninFormData]) {
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
          if (formData.email === "error@siklo.com" || formData.password === "wrongpass") {
            reject(new Error("Invalid email or password"));
          } else {
            resolve(true);
          }
        }, 1200);
      });
      setIsSuccess(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
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
