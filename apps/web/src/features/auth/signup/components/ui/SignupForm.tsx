import Link from "next/link";
import SignupFormInputs from "@/features/auth/signup/components/SignupFormInputs";

export default function SignUpForm() {
  return (
    <div className="w-full md:w-7/12 p-6 sm:p-8 flex flex-col gap-6 justify-center">
      <div className="flex flex-col items-center text-center gap-2">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            Create your Account
          </h2>
          <p className="text-xs text-neutral-subtext">
            Start saving, contributing, and cycling funds securely with your
            group.
          </p>
        </div>
      </div>

      <SignupFormInputs />

      <div className="border-t border-neutral-border pt-4 text-center">
        <p className="text-xs text-neutral-subtext">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-semibold text-brand-accent hover:text-brand-accent-hover"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
