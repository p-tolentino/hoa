import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

interface TableRow {
  id: number
  total: string
  currentyearbudget: number
  currentyearactuals: number
}

function TotalTable () {
  return (
    <Table variant='simple' size='xs' my='50px' width='50%' align='center'>
      <Thead bgColor='brand.300'>
        <Tr h='2rem'>
          <Th p='0.5rem' width='45%'></Th>
          <Th
            p='0.5rem'
            fontSize='xs'
            fontFamily='font.heading'
            textAlign='right'
          >
            Current Year Budget
          </Th>
          <Th
            p='0.5rem'
            fontSize='xs'
            fontFamily='font.heading'
            textAlign='right'
          >
            Current Year Actuals
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr fontFamily='font.body'>
          <Td pl='1rem'>Total Yearly Revenue</Td>
          <Td pr='1rem' textAlign='right'>
            10000
          </Td>
          <Td pr='1rem' textAlign='right'>
            20000
          </Td>
        </Tr>
        <Tr fontFamily='font.body'>
          <Td pl='1rem'>Total Yearly Expenses</Td>
          <Td pr='1rem' textAlign='right'>
            10000
          </Td>
          <Td pr='1rem' textAlign='right'>
            20000
          </Td>
        </Tr>
        <Tr fontFamily='font.body'>
          <Td pl='1rem'>Total Yearly Operating Overage/Surplus</Td>
          <Td pr='1rem' textAlign='right'>
            10000
          </Td>
          <Td pr='1rem' textAlign='right'>
            20000
          </Td>
        </Tr>
      </Tbody>
    </Table>
  )
}

export default TotalTable
