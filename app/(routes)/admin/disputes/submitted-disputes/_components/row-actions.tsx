import { Button, Wrap, WrapItem, useToast } from "@chakra-ui/react";
import { useState } from "react";

import { SubmittedDisputesColumn } from "./columns";

interface RowActionProps {
  data: SubmittedDisputesColumn;
}

export const RowActions: React.FC<RowActionProps> = ({ data }) => {
  const toast = useToast();
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    if (!isButtonClicked) {
      toast({
        title: `Successfully followed up the dispute submitted on ${data.createdAt}.`,
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
        <Button
          size="sm"
          fontFamily="font.body"
          onClick={handleButtonClick}
          isDisabled={isButtonClicked}
        >
          Follow up
        </Button>
      </WrapItem>
    </Wrap>
  );
};
