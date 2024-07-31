'use client'
import React, { useEffect, useState } from 'react'

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
                className='flex space-x-1 p-2'
            >
                <span
                    className='bg-red-800 text-red-50 text-xs rounded py-2 px-1'
                >
                    val
                </span>
                <input
                    className='max-w-24 bg-green-200 text-green-700 p-2'
                    value={valeur}
                    onChange={chgt_valeur}
                />
                <span
                    className='bg-red-800 text-red-50 text-xs rounded py-2 px-1'
                >
                    nue-prop
                </span>
                <input
                    className='max-w-24 bg-slate-300 text-slate-900 p-2'
                    value={nuprop}
                    readOnly
                />
                <button
                    className='p-2 bg-red-500 hover:bg-red-700 rounded'
                    onClick={bton_click}
                >Valide</button>
            </div>
        </div>
    )
}

export default Propriete