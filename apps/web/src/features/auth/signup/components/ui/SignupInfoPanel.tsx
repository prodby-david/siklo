import { Users, TrendingUp, Sparkles } from "lucide-react";
import AuthInfoPanel, { FeatureHighlight } from "@/features/auth/shared/components/AuthInfoPanel";

const signupHighlights: FeatureHighlight[] = [
  {
    icon: <Users className="h-4 w-4" />,
    title: "Build Trust",
    description: "Share contributions and coordinate payouts with full visibility.",
  },
  {
    icon: <TrendingUp className="h-4 w-4" />,
    title: "Reach Goals Faster",
    description: "Leverage group saving power to hit milestones efficiently.",
  },
  {
    icon: <Sparkles className="h-4 w-4" />,
    title: "Simplify Finance",
    description: "Eliminate manual spreadsheets with automated group logs.",
  },
];

export default function SignupInfoPanel() {
  return (
    <AuthInfoPanel
      title="Start your savings cycle today."
      subtitle="Create an account to join or build a transparent, secure, and collaborative Paluwagan group with people you trust."
      highlights={signupHighlights}
    />
  );
}
