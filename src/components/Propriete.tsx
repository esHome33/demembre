'use client'
import React, { useState } from 'react'

type Props = {
    valeur: string;
    nue_prop: string;
    index: number;
    change_val: (val: number, numero_prop: number) => number;
    force: () => void;
}

const Propriete = (props: Props) => {
    const [valeur, setValeur] = useState<string>(props.valeur);
    const [nuprop, setNuprop] = useState<string>(props.nue_prop);


    const chgt_valeur = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const val = e.target.value;
        const new_val = Number(val);
        if (new_val) {
            setValeur(val);
            if (val !== '') {
                const retour = props.change_val(new_val, props.index);
                setNuprop(`${retour}`);
            } else {
                setNuprop('');
            }
        } else {
            setValeur('');
            setNuprop('');
        }
    }

    const bton_click = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        props.force();
    }

    return (
        <div>
            <div
                className='flex flex-col sm:flex-row sm:space-x-2 space-y-1 p-2 w-fit'
            >
                <div className='flex flex-row space-x-1 h-10 my-auto'>

                    <span
                        className='dark:bg-red-800 dark:text-red-50
                        bg-slate-300 text-blue-950
                        text-xs rounded pt-2 px-1 sm:w-10 text-center'
                    >
                        val
                    </span>
                    <input
                        className=' bg-green-200 text-green-700 p-2 text-sm rounded w-24 sm:w-20'
                        value={valeur === undefined ? "" :
                            valeur === "0" ? "":valeur}
                        onChange={chgt_valeur}
                    />
                </div>

                <div className='flex flex-row space-x-1 h-10 my-auto'>
                    <div
                        className='dark:bg-red-800 dark:text-red-50 
                        bg-slate-300 text-blue-950
                        text-xs 
                        rounded py-1 px-1 text-wrap text-center max-w-10'
                    >
                        nue-prop
                    </div>
                    <input
                        className=' bg-slate-300 text-slate-900 
                        p-2 text-sm rounded w-[5.2rem] sm:w-20'
                        value={nuprop === undefined ? "" :
                            nuprop === "0"?"":nuprop}
                        readOnly
                    />
                </div>
                <button
                    className='p-2 
                    bg-transparent border border-black text-black
                    dark:bg-red-500 dark:hover:bg-red-700 dark:border-none dark:text-white
                    rounded min-w-10 max-w-[8.8rem]'
                    onClick={bton_click}
                >OK</button>
            </div>
        </div>
    )
}

export default Propriete