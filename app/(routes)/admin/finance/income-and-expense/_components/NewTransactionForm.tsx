'use client'

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
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

      {/* Purpose */}
      <FormControl isRequired fontFamily={'font.body'} mt='25px'>
        <FormLabel>Purpose:</FormLabel>
        <Select defaultValue='Select purpose'>
          <option value='' disabled>
            Select purpose
          </option>
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
      </FormControl>

      {/* Amount */}
      <FormControl isRequired fontFamily={'font.body'} mt='25px'>
        <FormLabel>Amount:</FormLabel>
        <Input type='number' placeholder='XXXXX' />
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
      <Box textAlign={'center'} mt='2rem'>
        <Button colorScheme='yellow' fontFamily={'font.heading'}>
          Submit Transaction
        </Button>
      </Box>
    </form>
  )
}
