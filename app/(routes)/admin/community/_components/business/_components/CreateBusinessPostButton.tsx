'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import {
  Input,
  Stack,
  Text,
  Box,
  HStack,
  Divider,
  CheckboxGroup,
  Checkbox,
  Radio,
  RadioGroup,
  Button,
  Textarea,
  FormControl,
  FormLabel,
  FormHelperText
} from '@chakra-ui/react'

import {
  Form,
  FormControl as ShadControl,
  FormDescription,
  FormField,
  FormItem,
  // FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { AddIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { NewPostSchema } from '@/server/schemas'
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPost } from "@/server/actions/post";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type PostFormValues = z.infer<typeof NewPostSchema>;

function CreateBusinessPostButton () {
  const router = useRouter();
  const { update } = useSession();
  const [isOpen, setIsOpen] = useState(false); // Step 1: Dialog open state

  const form = useForm<PostFormValues>({
    resolver: zodResolver(NewPostSchema),
    defaultValues: {
      type: "BUSINESS" || undefined,
      title: '' || undefined,
      category: '' || undefined,
      description: '' || undefined
    },
  });

  const onSubmit = async (values: PostFormValues) => {
    try {
      await createPost(values); // Assume createPost is an async operation
      form.reset(); // Reset form upon success
      setIsOpen(false); // Close dialog upon success
      router.refresh(); // Refresh the page or navigate as needed
    } catch (error) {
      console.error("Failed to create post:", error);
      // Handle error state here, if needed
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size='sm' colorScheme='yellow'>
          <AddIcon mr='10px' />
          Create Business Post
        </Button>
      </DialogTrigger>
      <DialogContent className='lg:min-w-[800px]'>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create Business Post</DialogTitle>
            <DialogDescription>
              Fill up the following fields to create a business post.
            </DialogDescription>
          </DialogHeader>
          {/* Form Content */}
          <Stack spacing='15px' my='2rem'>
          <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormControl isRequired>
              <FormLabel fontSize='sm' fontWeight='semibold'>
                Business Title:
              </FormLabel>
              <Input
                size='md'
                fontWeight='semibold'
                type='string' {...field}
                placeholder='Enter a Business Title'
              />
            </FormControl>
          )}
        />

            {/* Select Nature */}
            <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormControl isRequired>
            <FormLabel fontSize="sm" fontWeight="semibold">
              Category:
            </FormLabel>
            <RadioGroup 
            defaultValue='' size="sm"
            value={field.value || ""}
            onChange={field.onChange}>
              <Stack spacing={5} direction="row" fontFamily="font.body">
                <Radio value="FOOODANDDRINK">Food & Drink</Radio>
                <Radio value="CLOTHING">Clothing</Radio>
                <Radio value="HOUSEHOLDITEMS">Household Items</Radio>
                <Radio value="HOMESERVICES">Home Services</Radio>
                <Radio value="OTHER">Other</Radio>
              </Stack>
            </RadioGroup>
            <FormHelperText fontSize="xs" m="1">
              Select the category that applies to your post for members to easily find it.
            </FormHelperText>
          </FormControl>
          )}
          />

            <Divider />
            <Box py='10px'>
              <Stack spacing='15px'>
                {/* Post Content */}
                <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
                <FormControl isRequired>
                  <FormLabel fontSize='sm' fontWeight='semibold'>
                    Your Post
                  </FormLabel>
                  <Textarea
                    placeholder='Write something...'
                    id='discussionPost'
                    fontSize='xs'
                    maxH='300px'
                    {...field}
                  />
                </FormControl>
                                          )}
                                          />

              </Stack>
            </Box>
          </Stack>
          <DialogFooter>
            <Button
              size='sm'
              colorScheme='yellow'
              type='submit'
              // onClick={() => onSubmit()}
            >
              Submit Post for Approval
            </Button>
          </DialogFooter>
        </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
export default CreateBusinessPostButton
