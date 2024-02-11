import { Box, Heading, Text } from "@chakra-ui/react";

interface HeaderProps {
  title?: string;
  instructions?: string;
}

const Header: React.FC<HeaderProps> = ({ title, instructions }) => {
  return (
    <Box
      h={"max-content"}
      p={"20px"}
      pos={"sticky"}
      top={"0"}
      bgColor={"#5B8060"}
      color={"white"}
      zIndex={2}
    >
      <Heading size={"lg"} fontFamily="font.heading" mb="2px">
        Header Title {title}
      </Heading>
      <Text
        fontSize={{ sm: "12px", md: "sm" }}
        fontFamily={"font.body"}
        color={"white"}
        lineHeight={1.2}
      >
        {instructions}
        Page instructions or description here... Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Distinctio, harum ab quis quos nesciunt
        beatae, eos dolore quas cumque magni illum porro reprehenderit quia
        vitae nihil doloribus. Tempora saepe neque reiciendis commodi quia
        sapiente repellat nihil ut harum dolores! Saepe ex natus nam facere eos
        amet distinctio.
      </Text>
    </Box>
  );
};
export default Header;
