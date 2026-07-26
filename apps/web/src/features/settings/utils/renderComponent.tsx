import ProfileSettings from "../components/ProfileSettings";
import SecuritySettings from "../components/SecuritySettings";
import NotificationSettings from "../components/NotificationSettings";

export const SETTINGS_COMPONENTS: Record<string, React.ComponentType> = {
  profile: ProfileSettings,
  security: SecuritySettings,
  notifications: NotificationSettings,
};
