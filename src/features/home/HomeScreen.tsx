import { HomeDashboardScreen } from "@/features/home/HomeDashboardScreen";
import { WelcomeScreen } from "@/features/home/WelcomeScreen";

/** Root customer entry screen; mobile starts at welcome, larger screens start at dashboard. */
export function HomeScreen() {
  return (
    <div id="home" className="overflow-hidden">
      <WelcomeScreen />
      <div className="hidden md:block">
        <HomeDashboardScreen />
      </div>
    </div>
  );
}
