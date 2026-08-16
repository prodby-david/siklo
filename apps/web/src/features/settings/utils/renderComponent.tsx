import ProfileSettings from "../components/ProfileSettings";
import SecuritySettings from "../components/SecuritySettings";
import NotificationSettings from "../components/NotificationSettings";
import PaymentSettings from "../components/PaymentSettings";

export const SETTINGS_COMPONENTS: Record<string, React.ComponentType> = {
  profile: ProfileSettings,
  security: SecuritySettings,
  notifications: NotificationSettings,
  payments: PaymentSettings,
};
