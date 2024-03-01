"use client";

import {
  Flex,
  Box,
  Text,
  Heading,
  Avatar,
  HStack,
  ButtonGroup,
  Button,
} from "@chakra-ui/react";
import { PiThumbsUpFill } from "react-icons/pi";
import { formatDistanceToNowStrict } from "date-fns";
import { useState } from "react";
import CommentButton from "./_comment/CommentButton";

function BusinessPost() {
  const postNature = [
    { nature: "Food and Drink", color: "purple.200" },
    { nature: "Clothing ", color: "pink.200" },
    { nature: "Household Items", color: "blue.200" },
    { nature: "Home Services", color: "orange.200" },
    { nature: "Other", color: "teal.200" },
  ];

  const datePosted = new Date(2024, 2, 1);
  const dateDistance = formatDistanceToNowStrict(datePosted);

  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }
    setLiked(!liked);
  };

  return (
    <>
      {postNature.map((postNature, index) => (
        <Flex key={index} p="10px">
          <Box
            w="100%"
            h="100%"
            p="20px"
            border="1px"
            borderColor="gray.200"
            borderRadius="10px"
            mb="1%"
          >
            <Heading size="md" fontFamily="font.heading" mb="1%">
              Business Title
            </Heading>
            {/* Post Nature of Business */}
            <HStack mb="2%">
              <Box
                bg={postNature.color}
                fontFamily="font.heading"
                fontSize="xs"
                fontWeight="semibold"
                w="wrap"
                p="3px"
                pr="8px"
                pl="8px"
                textAlign="center"
                rounded="md"
              >
                {postNature.nature}
              </Box>
            </HStack>

            {/* Business Post Details */}
            <Flex gap="0.5rem">
              <Avatar /> {/*default size is medium*/}
              <Box>
                <Text
                  id="name"
                  fontSize="sm"
                  fontWeight="bold"
                  fontFamily="font.body"
                >
                  Name
                </Text>
                <Text
                  id="position"
                  fontSize="sm"
                  fontWeight="bold"
                  fontFamily="font.body"
                >
                  Position (Homeowner or Officer)
                </Text>
                <Text
                  id="description"
                  fontSize="sm"
                  py="10px"
                  fontFamily="font.body"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officiis, ratione quia! Hic atque nostrum tempore consectetur
                  dolores mollitia corporis aliquam labore eligendi, possimus
                  sequi quidem fuga commodi dolorum nemo non magni earum
                  consequuntur quod aliquid repellendus ad? Reprehenderit beatae
                  praesentium eaque, quis fugit dignissimos, inventore omnis
                  eveniet alias nemo quasi.
                </Text>
                {/* Date distance */}
                <Text fontFamily="font.body" color="grey" fontSize="xs">
                  Posted {dateDistance} ago
                </Text>
                {/* Business Post Actions */}
                <ButtonGroup size="xs" mt="1.5rem">
                  <Button
                    colorScheme="yellow"
                    variant={liked ? "solid" : "outline"}
                    gap="5px"
                    onClick={handleLike}
                  >
                    <PiThumbsUpFill /> Like ({likeCount})
                  </Button>
                  <CommentButton />
                </ButtonGroup>
              </Box>
            </Flex>
          </Box>
        </Flex>
      ))}
    </>
  );
}
export default BusinessPost;
