import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  IconButton,
  Badge,
  Card,
  CardHeader,
  CardBody,
  Stack,
  Text,
  PopoverFooter,
} from "@chakra-ui/react";

import { useState } from "react";
import { PiBellFill, PiBellRingingFill } from "react-icons/pi";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import { Notification } from "@prisma/client";
import { format } from "date-fns";
import {
  archiveNotification,
  updateIsRead,
} from "@/server/actions/notification";
import { Button } from "../ui/button";

interface NotificationCenter {
  isRead: boolean;
  title: string;
  description: string;
  date: string;
  onClick: () => void;
}

export default function NotificationCenter({
  initialData,
}: {
  initialData: Notification[];
}) {
  const title = "Notification Center";

  const [notifications, setNotifications] = useState(initialData);
  const [unreadCount, setUnreadCount] = useState(
    initialData.filter((item) => !item.isRead).length
  );

  // Function to handle closing the popover and updating isRead value
  const handlePopoverClose = async (clickedIndex: number) => {
    const updatedNotifications = notifications.map((notification, index) => ({
      ...notification,
      isRead: index === clickedIndex ? true : notification.isRead,
    }));

    await updateIsRead(
      updatedNotifications[clickedIndex].id,
      updatedNotifications[clickedIndex].isRead
    );

    setNotifications(updatedNotifications);
    setUnreadCount(
      updatedNotifications.filter((notification) => !notification.isRead).length
    );
  };

  const clearNotifications = async () => {
    notifications.map(async (notification) => {
      if (notification.isRead) {
        await archiveNotification(notification.id, true).then((data) => {
          if (data.success) {
            console.log(data.success);
            setNotifications(
              notifications.filter((item) => item.id !== notification.id)
            );
          }
        });
      }
    });
  };

  return (
    <div>
      <Popover placement="right">
        <PopoverTrigger>
          {/* Notification Center Icon */}
          <IconButton
            icon={
              <>
                {unreadCount > 0 ? (
                  <PiBellRingingFill color="white" size={20} />
                ) : (
                  <PiBellFill color="white" size={20} />
                )}

                {unreadCount > 0 && (
                  <Badge
                    as="span"
                    position="absolute"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="50%"
                    top="-3px"
                    right="-3px"
                    height="25px"
                    boxSize={5}
                    bg="red"
                    color="white"
                    textAlign="center"
                    fontSize="10px"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </>
            }
            aria-label={"Notifications"}
            background="none"
            _hover={{ background: "none", transform: "scale(1.2)" }}
          />
        </PopoverTrigger>
        <PopoverContent my="10px" bg="#FBFBFD" borderColor="grey">
          <PopoverArrow />
          <PopoverCloseButton className="mb-10 text-black" />
          <PopoverHeader
            color="black"
            fontFamily="font.heading"
            fontWeight="bold"
            p="15px 15px 5px 15px"
          >
            {title}
          </PopoverHeader>

          <PopoverBody h="330px" p="20px">
            <ScrollArea className="h-[300px]">
              <Stack spacing="3" alignItems="center" pb="15px">
                {notifications.map((notification, index) => {
                  return (
                    <Card
                      key={index}
                      variant="elevated"
                      _hover={{ transform: "scale(1.02)" }}
                      as={Link}
                      href={notification.linkToView}
                      onClick={() => {
                        handlePopoverClose(index);
                      }}
                      size="sm"
                      textAlign="left"
                    >
                      <CardHeader p="15px 15px 0px 15px">
                        <Text
                          as="span"
                          fontSize="sm"
                          fontWeight="bold"
                          display="flex"
                          alignItems="top"
                        >
                          {notification.isRead === false && (
                            <span
                              className="flex w-2 h-2 mr-1 translate-y-1 bg-red-500 rounded-full"
                              style={{ minWidth: "8px" }}
                            />
                          )}
                          {notification.title}
                        </Text>
                      </CardHeader>
                      <CardBody
                        p="5px 15px 20px 15px"
                        fontSize="xs"
                        textAlign="left"
                      >
                        <Stack spacing={2}>
                          <Text>{notification.description}</Text>
                          <Text color="grey">
                            {notification.createdAt
                              ? format(
                                  new Date(notification.createdAt)
                                    ?.toISOString()
                                    .split("T")[0],
                                  "MMMM dd, yyyy"
                                )
                              : ""}
                          </Text>
                        </Stack>
                      </CardBody>
                    </Card>
                  );
                })}
              </Stack>
            </ScrollArea>
          </PopoverBody>
          <PopoverFooter>
            {notifications && (
              <Button
                variant="outline"
                className="w-full text-sm text-gray-900"
                onClick={() => clearNotifications()}
              >
                Clear read notifications
              </Button>
            )}
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </div>
  );
}
