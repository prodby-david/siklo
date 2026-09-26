import { useState, useMemo, FormEvent } from "react";
import { toast } from "sonner";
import { useGetCurrentName } from "@/features/users/hooks/useGetCurrentName";
import {
  SupportSection,
  ConcernCategory,
  SupportInquiryFormState,
} from "../types/support.types";
import { CONCERN_ITEMS } from "../constants/support.constants";

export function useSupportAssistance() {
  const { data: user } = useGetCurrentName();
  const [activeSection, setActiveSection] = useState<SupportSection>("concerns");
  const [activeCategory, setActiveCategory] = useState<ConcernCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedConcernId, setExpandedConcernId] = useState<string | null>(
    CONCERN_ITEMS[0]?.id ?? null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [fullNameInput, setFullNameInput] = useState<string | null>(null);
  const [emailInput, setEmailInput] = useState<string | null>(null);
  const [category, setCategory] = useState<ConcernCategory>("contributions");
  const [groupName, setGroupName] = useState("");
  const [details, setDetails] = useState("");

  const formState: SupportInquiryFormState = {
    fullName: fullNameInput ?? (user?.name || ""),
    email: emailInput ?? (user?.email || ""),
    category,
    groupName,
    details,
  };

  const filteredConcerns = useMemo(() => {
    return CONCERN_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedConcernId((current) => (current === id ? null : id));
  };

  const handleFormFieldChange = (
    field: keyof SupportInquiryFormState,
    value: string,
  ) => {
    if (field === "fullName") setFullNameInput(value);
    else if (field === "email") setEmailInput(value);
    else if (field === "category") setCategory(value as ConcernCategory);
    else if (field === "groupName") setGroupName(value);
    else if (field === "details") setDetails(value);
  };

  const handleSubmitInquiry = (e: FormEvent) => {
    e.preventDefault();
    if (!formState.details.trim()) {
      toast.error("Please provide the details of your concern.");
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success(
        "Your inquiry has been received. Our support team will follow up with you via email shortly.",
      );
      setGroupName("");
      setDetails("");
      setActiveSection("concerns");
    }, 600);
  };

  return {
    activeSection,
    setActiveSection,
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    expandedConcernId,
    toggleExpand,
    filteredConcerns,
    formState,
    handleFormFieldChange,
    handleSubmitInquiry,
    isSubmitting,
  };
}
