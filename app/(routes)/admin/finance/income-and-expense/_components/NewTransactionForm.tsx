'use client'

import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea
} from '@chakra-ui/react'

export default function NewTransactionForm () {
  return (
    <form>
      {/* Date issued */}
      <FormControl isRequired fontFamily={'font.body'}>
        <FormLabel>Date issued:</FormLabel>
        <Input type='date' />
      </FormControl>

      {/* Transaction Type */}
      <FormControl isRequired fontFamily={'font.body'} mt='25px'>
        <FormLabel>Transaction Type:</FormLabel>
        <RadioGroup colorScheme='yellow'>
          <Stack direction={'row'} spacing={5}>
            <Radio value='Income'>Income</Radio>
            <Radio value='Expense'>Expense</Radio>
          </Stack>
        </RadioGroup>
      </FormControl>

      {/* Transaction Title */}
      <FormControl isRequired fontFamily={'font.body'} mt='25px'>
        <FormLabel>Transaction Title:</FormLabel>
        <Input type='text' />
      </FormControl>

      {/* Amount */}
      <FormControl isRequired fontFamily={'font.body'} mt='25px'>
        <FormLabel>Amount:</FormLabel>
        <Input type='number' />
      </FormControl>

      {/* Description */}
      <FormControl fontFamily={'font.body'} mt='25px'>
        <FormLabel>Description:</FormLabel>
        <Textarea
          placeholder='Enter description here'
          maxLength={50}
          rows={3}
          resize={'none'}
        ></Textarea>
        <FormHelperText>Maximum of 50 characters only.</FormHelperText>
      </FormControl>

      {/* Submit Transaction Button */}
      <Button colorScheme='yellow' mt='2rem' fontFamily={'font.heading'}>
        Submit Transaction
      </Button>
    </form>
  )
}
