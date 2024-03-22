import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Input,
  Stack,
  Text,
  Textarea
} from '@chakra-ui/react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

type KeyActivities = {
  title: string
  dueDate: string
  datePerformed: string
}[]

export default function ProgressReportForm ({
  keyActivities
}: {
  keyActivities: KeyActivities
}) {
  return (
    <form>
      <Stack spacing='15px'>
        <Box>
          <Text fontWeight='semibold' fontFamily='font.heading' lineHeight={1}>
            Write a progress report
          </Text>
          <Text fontFamily='font.body' fontSize='sm'>
            Write a progress report for an activity to demonstrate that it is
            being completed by the due date.
          </Text>
        </Box>
        <Flex justifyContent='space-between' gap={5}>
          <Input
            type='string'
            fontSize='md'
            fontFamily='font.body'
            fontWeight='semibold'
            placeholder='Enter a progress title'
          />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Select activity' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {keyActivities.map((activity, index) => (
                  <SelectItem
                    key={'activity' + index}
                    value={'activity' + index}
                  >
                    {activity.title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Flex>
        <Textarea
          fontSize='sm'
          fontFamily='font.body'
          placeholder='Write something...'
          height='30vh'
          resize='none'
        ></Textarea>
        <ButtonGroup>
          <Button type='submit' colorScheme='yellow' size='sm' w='min-content'>
            Submit as Sub-Activity
          </Button>
          <Button type='submit' colorScheme='green' size='sm' w='min-content'>
            Submit & Mark Activity as Done
          </Button>
        </ButtonGroup>
      </Stack>
    </form>
  )
}
