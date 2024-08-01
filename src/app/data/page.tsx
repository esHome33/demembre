'use client'
import React from 'react'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, getKeyValue } from "@nextui-org/table";

const rows = [
    {
        key: "0",
        etendue: "6500 € et moins",
        coeffTTC: "5,804 %"
    },
    {
        key: "1",
        etendue: "6501 € à 17000 € ",
        coeffTTC: "2,394 %"
    },
    {
        key: "2",
        etendue: "17001 € à 60000 €",
        coeffTTC: "1,596 %"
    },
    {
        key: "3",
        etendue: "60001 € et plus",
        coeffTTC: "1,1976 %"
    }
];

const columns = [
    {
        key: "etendue",
        label: "Tranches (val. propriété complète)",
    },
    {
        key: "coeffTTC",
        label: "Taux applicable",
    }
];

const rows_dd = [
    {
        key: "0",
        etendue: "8072 € et moins",
        coeffTTC: "5 %"
    },
    {
        key: "1",
        etendue: "8 073 € à 12 109 € ",
        coeffTTC: "10 %"
    },
    {
        key: "2",
        etendue: "12 110 € à 15 932 €",
        coeffTTC: "15 %"
    },
    {
        key: "3",
        etendue: "15 933 € à 552 324 €",
        coeffTTC: "20 %"
    },
    {
        key: "4",
        etendue: "552 325 € à 902 838 €",
        coeffTTC: "30 %"
    },
    {
        key: "5",
        etendue: "902 839 € à 1 805 677 €",
        coeffTTC: "40 %"
    },
    {
        key: "6",
        etendue: "1 805 678 € et plus",
        coeffTTC: "45 %"
    }
];

const columns_dd = [
    {
        key: "etendue",
        label: "part taxable après abattement",
    },
    {
        key: "coeffTTC",
        label: "Barème d'imposition",
    }
];


const Page = () => {
    return (
        <div
            className='flex min-h-screen flex-col  p-8'
        >
            <div
                className='mx-auto font-bold text-lg'
            >
                Coefficients utilisés pour les calculs
            </div>

            <div
                className='text-sm rounded-md max-w-md p-4 border border-green-300 
                mt-4 mx-auto bg-green-100 text-black'
            >
                <div
                    className='font-serif text-center'
                >
                    frais de notaire
                </div>
                <Table
                    aria-label="Example table with dynamic content"

                >
                    <TableHeader
                        className='bg-teal-500'
                    >
                        {columns.map((column) =>
                            <TableColumn
                                className=' bg-teal-500  rounded-lg
                                text-center px-2 text-wrap italic'
                                key={column.key}>{column.label}</TableColumn>
                        )}
                    </TableHeader>
                    <TableBody>
                        {rows.map((row) =>
                            <TableRow key={row.key}>
                                {(col) => {
                                    if (col === "etendue") {
                                        return (
                                            <TableCell
                                                className='border border-green-800'
                                            >
                                                <div className='ml-2'>
                                                    {getKeyValue(row, col)}
                                                </div>
                                            </TableCell>
                                        );
                                    } else {
                                        return (
                                            <TableCell
                                                className='border border-green-800 text-center'
                                            >
                                                {getKeyValue(row, col)}
                                            </TableCell>
                                        );
                                    }
                                }}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div
                className='text-sm rounded-md max-w-md p-4 border border-green-300 
                mt-4 mx-auto bg-green-100 text-black'
            >
                <div
                    className='font-serif  text-center'
                >
                    droits de donation en ligne directe
                </div>
                <Table
                    aria-label="droits donation ligne directe"
                >
                    <TableHeader>
                        {columns_dd.map((column) =>
                            <TableColumn
                                className=' bg-green-400 text-center px-2 text-wrap rounded-lg'
                                key={column.key}>{column.label}</TableColumn>
                        )}
                    </TableHeader>
                    <TableBody>
                        {rows_dd.map((row) =>
                            <TableRow key={row.key}>
                                {(col) => {
                                    if (col === "etendue") {
                                        return (<TableCell
                                            className='border border-green-800'
                                        >
                                            {<div className='ml-2'> {getKeyValue(row, col)}</div>}
                                        </TableCell>)
                                    } else {
                                        return <TableCell
                                            className='border border-green-800 text-center'
                                        >{getKeyValue(row, col)}</TableCell>
                                    }
                                }}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            
            <div
                className='mx-auto text-xs mt-2'
            >
                1er août 2024
            </div>
        </div>
    )
}

export default Page