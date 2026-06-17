import { Eye, Calculator, Globe, HandCoins, Smartphone } from "lucide-react";

export default function getIcon(
  id: string,
  brandAccentColor: string = "text-brand-accent",
) {
  const className = `h-5 w-5 ${brandAccentColor}`;
  switch (id) {
    case "visibility":
      return <Eye className={className} />;
    case "math":
      return <Calculator className={className} />;
    case "philippine":
      return <Globe className={className} />;
    case "no-fees":
      return <HandCoins className={className} />;
    case "responsive":
      return <Smartphone className={className} />;
    default:
      return null;
  }
}
