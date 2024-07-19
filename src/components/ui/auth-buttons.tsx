import { Button } from "./button";
import { Icons } from "./icons";
import { baseURL } from "@/api";

export function DiscordAuthButton() {
  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() => window.location.assign(`${baseURL}/auth/discord`)}
    >
      <Icons.discord className="mr-2 h-5 w-5" />
      Discord
    </Button>
  );
}

export function GoogleAuthBtn() {
  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={async () => {
        window.location.assign(`${baseURL}/auth/google`);
      }}
    >
      <Icons.google className="mr-2 h-5 w-5" />
      Google
    </Button>
  );
}

export function SlackAuthBtn() {
  return (
    <Button
      className="w-full"
      variant="outline"
      type="button"
      onClick={() => window.location.assign(`${baseURL}/auth/slack`)}
    >
      <Icons.slack className="mr-2 h-5 w-5" />
      Slack
    </Button>
  );
}
