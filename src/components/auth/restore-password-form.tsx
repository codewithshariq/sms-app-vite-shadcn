import { useState } from "react";
import { RiCheckboxCircleLine, RiErrorWarningLine, RiLoader5Fill } from "react-icons/ri";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TypographyH4, TypographyMuted, TypographyP, TypographyTitleAuth } from "../ui/typography";

export type RestorePasswordModalState = "idle" | "pending" | "success" | "error";

export interface RestorePasswordFormData {
  email: string;
}

interface RestorePasswordFormProps {
  state: RestorePasswordModalState;
  onSubmit: (credentials: RestorePasswordFormData) => void;
}

const RestorePasswordForm = ({ state, onSubmit }: RestorePasswordFormProps) => {
  const [email, setEmail] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ email });
      }}
    >
      {state === "idle" && (
        <>
          <div className="pb-8 flex flex-col space-y-4">
            <TypographyTitleAuth className="text-center">Reset password</TypographyTitleAuth>
            <label className="flex flex-col space-y-2" htmlFor="email">
              <TypographyMuted>Email</TypographyMuted>
              <Input
                name="email"
                required
                placeholder="Enter email..."
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>
          <Button disabled={!email} type="submit" className="w-full justify-center">
            Send reset link
          </Button>
        </>
      )}
      {state === "pending" && (
        <div className="flex items-center gap-4">
          <RiLoader5Fill className="animate-spin" size={25} />
          <div className="flex flex-col">
            <span className="text-lg font-semibold">Sending...</span>
            <span className="text-sm font-medium">Please wait</span>
          </div>
        </div>
      )}
      {state == "success" && (
        <div className="flex items-center gap-4">
          <RiCheckboxCircleLine className="text-green-500" size={35} />
          <div className="flex flex-col">
            <span className="text-xl font-semibold">Sent!</span>
            <p className="text-sm font-extralight">
              Reset password link has been successfully sent to your email
            </p>
          </div>
        </div>
      )}

      {state == "error" && (
        <div className="flex items-center gap-4 text-destructive/60">
          <RiErrorWarningLine size={25} />
          <div className="flex flex-col">
            <TypographyH4>Restoring Failed</TypographyH4>
            <TypographyP>Somethin went wrong</TypographyP>
          </div>
        </div>
      )}
    </form>
  );
};

export default RestorePasswordForm;
