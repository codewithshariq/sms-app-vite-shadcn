import { SelectProps } from "@radix-ui/react-select";
import { Modal } from "./modal";
import { RiInformationFill } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { TypographyH3 } from "./typography";

type ConfirmActionModalProps = {
  open: boolean;
  title?: string;
  titleDescription?: ReactNode;
  description?: ReactNode;
  loading?: boolean;
  onOpenChange: SelectProps["onOpenChange"];
  actionCallback: () => void;
};

const ConfirmActionModal = ({
  open,
  loading = false,
  title = "Confirm Action",
  titleDescription,
  description = "Are you sure you want to perform this action?",
  actionCallback,
  ...rest
}: ConfirmActionModalProps) => {
  const handleCancel = () => {
    rest.onOpenChange && rest.onOpenChange(false);
  };

  return (
    <Modal
      {...rest}
      open={open}
      header={true}
      title={
        <div className="flex items-center gap-3">
          <RiInformationFill className="text-primary" size={20} />
          <TypographyH3>{title}</TypographyH3>
        </div>
      }
      titleDescription={titleDescription}
      childrenFooter={
        <div className="flex gap-4 w-full py-4 px-7">
          <Button disabled={loading} onClick={actionCallback} className="flex-1 justify-center">
            {!loading ? "Confirm" : "Performing the action..."}
          </Button>
          {!loading && (
            <Button variant="secondary" onClick={handleCancel} className="flex-1 justify-center">
              Cancel
            </Button>
          )}
        </div>
      }
    >
      <div className="flex flex-col space-y-4 min-w-[342px] px-7">{description}</div>
    </Modal>
  );
};

export default ConfirmActionModal;
