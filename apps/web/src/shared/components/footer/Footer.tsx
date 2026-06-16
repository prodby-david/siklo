export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-neutral-border py-4 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs text-neutral-subtext">
          &copy; {currentYear} Siklo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
