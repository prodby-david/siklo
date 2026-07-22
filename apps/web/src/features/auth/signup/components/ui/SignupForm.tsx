import Link from "next/link";
import Image from "next/image";
import SignupFormInputs from "@/features/auth/signup/components/SignupFormInputs";

export default function SignUpForm() {
  return (
    <div className="w-full md:w-7/12 p-6 sm:p-10 flex flex-col gap-6 justify-center">
      <div className="flex flex-col items-center text-center gap-2">
        <Link
          href="/"
          className="flex md:hidden items-center gap-2 text-lg font-bold text-foreground mb-2"
        >
<<<<<<< HEAD
          <Image src="/images/logo.svg" alt="Siklo" width={56} height={56} priority />
        </Link>

        <div className="flex flex-col gap-1.5 items-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
=======
          <Image
            src="/images/logo.svg"
            alt="Siklo"
            width={40}
            height={40}
            priority
          />
        </Link>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
>>>>>>> master
            Create your Account
          </h2>
          <p className="text-xs text-neutral-subtext max-w-sm">
            Start saving, contributing, and cycling funds securely with your group.
          </p>
        </div>
      </div>

      <SignupFormInputs />

      <div className="border-t border-neutral-border/80 pt-4 text-center">
        <p className="text-xs text-neutral-subtext font-medium">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-extrabold text-brand-accent hover:text-brand-accent-hover transition-colors hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
