import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

// interface TableRow {
//   id: number
//   total: string
//   currentyearbudget: number
//   currentyearactuals: number
// }

function TotalTable () {
  return (
    <Table variant='simple' size='xs' my='50px' width='50%' align='center'>
      <Thead bgColor='brand.300'>
        <Tr h='2rem'>
          <Th p='1rem'></Th>
          <Th
            p='1rem'
            w='300px'
            fontSize='sm'
            fontFamily='font.heading'
            textAlign='right'
          >
            Current Year Budget (CYB)
          </Th>
          <Th
            p='1rem'
            w='300px'
            fontSize='sm'
            fontFamily='font.heading'
            textAlign='right'
          >
            Current Year Actuals (CYA)
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr fontFamily='font.body'>
          <Td p='0.5rem'>Total Yearly Revenue</Td>
          <Td p='0.5rem' textAlign='right'>
            0
          </Td>
          <Td p='0.5rem' textAlign='right'>
            0
          </Td>
        </Tr>
        <Tr fontFamily='font.body'>
          <Td p='0.5rem'>Total Yearly Expenses</Td>
          <Td p='0.5rem' textAlign='right'>
            0
          </Td>
          <Td p='0.5rem' textAlign='right'>
            0
          </Td>
        </Tr>
        <Tr fontFamily='font.body'>
          <Td p='0.5rem'>Total Yearly Operating Overage/Surplus</Td>
          <Td p='0.5rem' textAlign='right'>
            0
          </Td>
          <Td p='0.5rem' textAlign='right'>
            0
          </Td>
        </Tr>
      </Tbody>
    </Table>
  )
}

export default TotalTable
