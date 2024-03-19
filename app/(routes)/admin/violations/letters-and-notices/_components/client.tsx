'use client'

import React from 'react'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'

import { ViolationLettersAndNoticesColumn, columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

import { Flex, Button, HStack } from '@chakra-ui/react'

import { useReactToPrint } from 'react-to-print'
import { useRef } from 'react'
import PDFTable from '@/components/system/PDFTable'
import BackButton from '@/components/system/BackButton'

interface ViolationLettersAndNoticesClientProps {
  data: ViolationLettersAndNoticesColumn[]
}

export const ViolationLettersAndNoticesClient: React.FC<
  ViolationLettersAndNoticesClientProps
> = ({ data }) => {
  const componentPDF = useRef<HTMLDivElement | null>(null)

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current || null,
    documentTitle: 'Violation Letter and Notices Report',
    onAfterPrint: () => alert('Data saved in PDF')
  })
  return (
    <>
      <Flex justify='space-between'>
        <Heading
          title='Violation Letters and Notices'
          description="View received Violation letters and notices from the Homeowners' Association."
        />
        <HStack>
          <Button size='sm' colorScheme='yellow' onClick={generatePDF}>
            Generate PDF
          </Button>
          <BackButton />
        </HStack>
      </Flex>
      <Separator />
      {/* <div className="hidden">
        <div ref={componentPDF} style={{ width: "100%" }}>
          <PDFTable />
        </div>
      </div> */}
      <div ref={componentPDF} style={{ width: '100%' }}>
        <DataTable columns={columns} data={data} searchKey='createdAt' />
      </div>
    </>
  )
}
