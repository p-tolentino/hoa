"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Stack,
  Text,
  Box,
  Divider,
  Button,
  Avatar,
  HStack,
  Textarea,
  ButtonGroup,
} from "@chakra-ui/react";
import { PiThumbsUpFill, PiThumbsDownFill } from "react-icons/pi";
import { formatDistanceToNowStrict } from "date-fns";
import { useState } from "react";

function commentButton() {
  const datePosted = new Date(2024, 2, 1);
  const dateDistance = formatDistanceToNowStrict(datePosted);

  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikeCount(likeCount + 1);
      if (disliked) {
        setDislikeCount(dislikeCount - 1);
        setDisliked(false);
      }
    } else {
      setLikeCount(likeCount - 1);
    }
    setLiked(!liked);
  };

  const handleDislike = () => {
    if (!disliked) {
      setDislikeCount(dislikeCount + 1);
      if (liked) {
        setLikeCount(likeCount - 1);
        setLiked(false);
      }
    } else {
      setDislikeCount(dislikeCount - 1);
    }
    setDisliked(!disliked);
  };

  return (
    <Dialog /*open={open} onOpenChange={setOpen}*/>
      <DialogTrigger asChild>
        <Button size="xs" colorScheme="yellow" variant="outline">
          Comment
        </Button>
      </DialogTrigger>
      <DialogContent className="lg:min-w-[800px]">
        <DialogHeader>
          <DialogTitle>Discussion Post Comments</DialogTitle>
          <DialogDescription>
            Add a comment to the discussion post.
          </DialogDescription>
        </DialogHeader>

        {/* List of Comments */}
        <Box p="10px" maxH="400px" overflowY="auto">
          <Stack spacing="15px">
            <Box
              border="1px"
              borderColor="gray.200"
              borderRadius="10px"
              p="10px"
            >
              <HStack>
                <Avatar />
                <Stack spacing="0.5px">
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
                </Stack>
              </HStack>
              <Text
                id="description"
                ml="7%"
                fontSize="sm"
                p="5px"
                fontFamily="font.body"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis, ratione quia! Hic atque nostrum tempore consectetur
                dolores mollitia corporis aliquam labore eligendi, possimus
              </Text>

              {/* Date distance */}
              <Text ml="7.5%" fontFamily="font.body" color="grey" fontSize="xs">
                Posted {dateDistance} ago
              </Text>

              {/* Discussion Post Actions */}
              <ButtonGroup size="xs" mt="1rem" ml="7%">
                <Button
                  colorScheme="yellow"
                  variant={liked ? "solid" : "outline"}
                  gap="5px"
                  onClick={handleLike}
                >
                  <PiThumbsUpFill /> Like ({likeCount})
                </Button>
                <Button
                  colorScheme="yellow"
                  variant={disliked ? "solid" : "outline"}
                  gap="5px"
                  onClick={handleDislike}
                >
                  <PiThumbsDownFill />
                  Dislike ({dislikeCount})
                </Button>
              </ButtonGroup>
            </Box>
            <Box
              border="1px"
              borderColor="gray.200"
              borderRadius="10px"
              p="10px"
            >
              <HStack>
                <Avatar />
                <Stack spacing="0.5px">
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
                </Stack>
              </HStack>
              <Text
                id="description"
                ml="7%"
                fontSize="sm"
                p="5px"
                fontFamily="font.body"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis, ratione quia! Hic atque nostrum tempore consectetur
                dolores mollitia corporis aliquam labore eligendi, possimus
              </Text>

              {/* Date distance */}
              <Text ml="7.5%" fontFamily="font.body" color="grey" fontSize="xs">
                Posted {dateDistance} ago
              </Text>

              {/* Discussion Post Actions */}
              <ButtonGroup size="xs" mt="1rem" ml="7%">
                <Button
                  colorScheme="yellow"
                  variant={liked ? "solid" : "outline"}
                  gap="5px"
                  onClick={handleLike}
                >
                  <PiThumbsUpFill /> Like ({likeCount})
                </Button>
                <Button
                  colorScheme="yellow"
                  variant={disliked ? "solid" : "outline"}
                  gap="5px"
                  onClick={handleDislike}
                >
                  <PiThumbsDownFill />
                  Dislike ({dislikeCount})
                </Button>
              </ButtonGroup>
            </Box>
            <Box
              border="1px"
              borderColor="gray.200"
              borderRadius="10px"
              p="10px"
            >
              <HStack>
                <Avatar />
                <Stack spacing="0.5px">
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
                </Stack>
              </HStack>
              <Text
                id="description"
                ml="7%"
                fontSize="sm"
                p="5px"
                fontFamily="font.body"
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officiis, ratione quia! Hic atque nostrum tempore consectetur
                dolores mollitia corporis aliquam labore eligendi, possimus
              </Text>

              {/* Date distance */}
              <Text ml="7.5%" fontFamily="font.body" color="grey" fontSize="xs">
                Posted {dateDistance} ago
              </Text>

              {/* Discussion Post Actions */}
              <ButtonGroup size="xs" mt="1rem" ml="7%">
                <Button
                  colorScheme="yellow"
                  variant={liked ? "solid" : "outline"}
                  gap="5px"
                  onClick={handleLike}
                >
                  <PiThumbsUpFill /> Like ({likeCount})
                </Button>
                <Button
                  colorScheme="yellow"
                  variant={disliked ? "solid" : "outline"}
                  gap="5px"
                  onClick={handleDislike}
                >
                  <PiThumbsDownFill />
                  Dislike ({dislikeCount})
                </Button>
              </ButtonGroup>
            </Box>
          </Stack>
        </Box>
        <Divider />

        {/* Add a Comment */}
        <Box border="1px" borderColor="gray.200" borderRadius="10px" p="10px">
          <HStack>
            <Avatar />
            <Stack spacing="0.5px">
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
            </Stack>
          </HStack>
          <Textarea
            id="comment"
            w="90%"
            ml="7%"
            mt="2%"
            fontSize="sm"
            p="5px"
            size="sm"
            fontFamily="font.body"
            placeholder="Write something..."
          ></Textarea>
        </Box>

        <DialogFooter>
          <Button
            w="full"
            size="sm"
            colorScheme="yellow"
            type="submit"
            // onClick={() => onSubmit()}
          >
            Comment
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default commentButton;
