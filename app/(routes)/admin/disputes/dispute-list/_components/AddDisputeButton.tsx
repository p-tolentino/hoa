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
  Button,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
  FormHelperText
} from '@chakra-ui/react'

import { AddIcon } from '@chakra-ui/icons'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField } from '@/components/ui/form'
import { useRouter } from 'next/navigation'
import { getDisputeTypeByName } from '@/server/data/dispute-type'
import { createDisputeType } from '@/server/actions/dispute-type'

export const DisputeTypeFormSchema = z.object({
  name: z.string(),
  title: z.string(),
  description: z.string(),
});

export type DisputeTypeFormValues = z.infer<typeof DisputeTypeFormSchema>;

export default function AddDispute () {
  const router = useRouter();

  const form = useForm<DisputeTypeFormValues>({
    resolver: zodResolver(DisputeTypeFormSchema),
    defaultValues: {
      name: "",
      title: "",
      description: "",
    },
  });

  const toast = useToast()

  const onSubmit = async (values: DisputeTypeFormValues) => {
    const existingDisputeType = await getDisputeTypeByName(values.name);

    if (existingDisputeType) {
      console.log("Existing dispute name, try a different one");
      toast({
        title: `Dispute Type with identifier "${form.watch(
          "name"
        )}" already exists.`,
        description: `Existing dispute name (identifier), try a different one`,
        status: "warning",
        position: "bottom-right",
        isClosable: true,
      });
    } else {
      await createDisputeType(values)
        .then((data) => {
          if (data.success) {
            toast({
              title: `Successfully added a dispute type to the list of HOA disputes.`,
              description: `${form.watch("title")}`,
              status: 'success',
              position: 'bottom-right',
              isClosable: true
            })
          }
        })
        .then(() => {
          form.reset();
          router.refresh();
        });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size='sm' colorScheme='yellow'>
          <AddIcon boxSize={3} mr='10px' />
          Add Dispute Type
        </Button>
      </DialogTrigger>
      <DialogContent className='lg:min-w-[800px]'>
        <Form {...form}>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add a Dispute Type</DialogTitle>
            <DialogDescription>
              Fill up the following fields to add a dispute in the list of
              disputes.
            </DialogDescription>
          </DialogHeader>

          {/* Form Content */}
          <Stack spacing='15px' my='2rem'>
            {/* Dispute Title */}
            <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
            <FormControl isRequired>
              <FormLabel fontSize='sm' fontWeight='semibold'>
                Dispute Title:
              </FormLabel>
              <Input
                size='md'
                fontWeight='semibold'
                type='string'
                placeholder='Enter a Title'
                {...field}
              />
            </FormControl>)} />

            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormControl isRequired>
                    <FormLabel fontSize="sm" fontWeight="semibold">
                      Database Name (Identifier):
                    </FormLabel>
                    <Input
                      size="md"
                      fontWeight="semibold"
                      type="string"
                      placeholder="ex. neighbor"
                      {...field}
                    />
                    <FormHelperText>
                      A simpler version of the title for easier identification
                      in the system's database
                    </FormHelperText>
                  </FormControl>
                )}
              />

            {/* Dispute Description */}
            <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
            <FormControl isRequired>
              <FormLabel fontSize='sm' fontWeight='semibold'>
                Description:
              </FormLabel>
              <Textarea
                fontFamily='font.body'
                placeholder='Write something...'
                fontSize='sm'
                resize='none'
                {...field}
              />
            </FormControl>)} />
          </Stack>

          <DialogFooter className='text-right'>
            <FormControl>
              <Button
                size='sm'
                colorScheme='yellow'
                type='submit'
              >
                Add Dispute Type
              </Button>
            </FormControl>
          </DialogFooter>
        </form>
        </Form>

      </DialogContent>
    </Dialog>
  )
}
