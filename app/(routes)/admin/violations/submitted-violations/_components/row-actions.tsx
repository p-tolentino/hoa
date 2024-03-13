import { Button, Wrap, WrapItem, useToast } from "@chakra-ui/react";
import { useState } from "react";

import { SubmittedViolationsColumn } from "./columns";

interface RowActionProps {
  data: SubmittedViolationsColumn;
}

export const RowActions: React.FC<RowActionProps> = ({ data }) => {
  const toast = useToast();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    if (!isButtonClicked) {
      toast({
        title: `Successfully followed up the violation submitted on ${data.createdAt}.`,
        description:
          "The HOA officers will get back to you as soon as possible.",
        status: "success",
        position: "bottom-right",
        isClosable: true,
      });

      setIsButtonClicked(true);
    }
  };

  return (
    <Wrap>
      <WrapItem>
        {(data.status === "Pending" || data.status === "Under Review") && (
          <Button
            size="sm"
            onClick={handleButtonClick}
            isDisabled={isButtonClicked}
          >
            Follow up
          </Button>
        )}
      </WrapItem>
    </Wrap>
  );
};
