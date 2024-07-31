'use client';

import React, { useEffect, useState } from 'react'
import Properties from './Properties';
import Calc_donation from '@/lib/calc_donation';

type Props = {
    age_chg: (n: number) => void;
    enf_chg: (n: number) => void;
    pro_chg: (n: number) => void;
    invalidate: () => void;
    affiche: () => void;
    calculateur: Calc_donation | undefined;
}

const SaisieParametres = (props: Props) => {
    const [age, setAge] = useState<string>('');
    const [nbe, setNbe] = useState<string>('');
    const [pro, setPro] = useState<string>('');

    useEffect(() => {
        const val = Number(age);
        if (val) {
            const p = props;
            if (props.age_chg) {
                props.age_chg(val);
            }
        } else {
            props.invalidate();
            //console.log('invalidation age');
        }
    }, [age]);

    useEffect(() => {
        const val = Number(nbe);
        if (val) {
            if (props.enf_chg) {
                props.enf_chg(val);
            }
        } else {
            //console.log('invalidation enfants');
            props.invalidate();
        }
    }, [nbe]);

    useEffect(() => {
        const val = Number(pro);
        if (val) {
            if (props.pro_chg) {
                props.pro_chg(val);
            }
        } else {
            props.invalidate();
            //console.log('invalidation nbprop');
        }
    }, [pro]);

    return (
        <div
            className='flex flex-col space-y-2 justify-start '
        >
            <div
                className='flex justify-start space-x-4 my-4 '
            >
                <span
                    id="labelage"
                    className='flex-1'
                >
                    Age donateur :
                </span>
                <input
                    aria-labelledby='labelage'
                    value={age}
                    onChange={(e) => { e.preventDefault(); setAge(e.target.value) }}
                    className='max-h-8 max-w-20 bg-yellow-50 text-orange-800 px-2 py-1 rounded-lg'
                />
            </div>

            <div
                className='flex justify-start space-x-4 my-4'
            >
                <span
                    id="labelprop"
                    className='flex-1'
                >
                    Nb propriétés :
                </span>
                <input
                    aria-labelledby='labelprop'
                    value={pro}
                    onChange={(e) => { e.preventDefault(); setPro(e.target.value) }}
                    className='max-h-8 max-w-20 bg-yellow-50 text-orange-800 px-2 py-1 rounded-lg'
                />
            </div>

            <div
                className='flex justify-start space-x-4 my-4'
            >
                <span
                    id="labelprop"
                    className='flex-1'
                >
                    Nb enfants :
                </span>
                <input
                    aria-labelledby='labelprop'
                    value={nbe}
                    onChange={(e) => { e.preventDefault(); setNbe(e.target.value) }}
                    className='max-h-8 max-w-20 bg-yellow-50 text-orange-800 px-2 py-1 rounded-lg'
                />
            </div>

            <Properties
                nombre={pro}
                calculateur={props.calculateur}
                affiche={props.affiche}
            />
        </div>
    )
}

export default SaisieParametres