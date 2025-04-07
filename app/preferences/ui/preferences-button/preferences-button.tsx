import { Button } from "@/components/ui/button";
import { Save, Utensils } from "lucide-react";

interface PreferencesButtonProps {
  isPushingRoute: boolean;
}

export default function PreferencesButton({
  isPushingRoute,
}: PreferencesButtonProps) {
  return (
    <Button type="submit" className="w-full cursor-pointer">
      {isPushingRoute ? (
        <>
          <Utensils className="w-4 h-4 mr-2 animate-spin" />
          Redirecting to meals page...
        </>
      ) : (
        <>
          <Save className="w-4 h-4 mr-2" />
          Save Preferences
        </>
      )}
    </Button>
  );
}
