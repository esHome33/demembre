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
    const [recalc, setRecalc] = useState(false);

    useEffect(() => {
        const val = Number(age);
        if (val && props.age_chg) {
            props.age_chg(val);
            setRecalc(!recalc);
        } else {
            props.invalidate();
            setRecalc(!recalc);
        }
    }, [age]);

    useEffect(() => {
        const val = Number(nbe);
        if (val) {
            if (props.enf_chg) {
                props.enf_chg(val);
                setRecalc(!recalc);
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
                setRecalc(!recalc);
            }
        } else {
            props.invalidate();
            //console.log('invalidation nbprop');
        }
    }, [pro]);

    return (
        <div
            className='flex flex-col space-y-1 justify-start'
        >
            <div
                className='flex justify-start space-x-4 my-4 '
            >
                <span
                    id="labelage"
                    className='flex-1 my-auto'
                >
                    Age donateur :
                </span>
                <input
                    aria-labelledby='labelage'
                    value={age}
                    onChange={(e) => { e.preventDefault(); setAge(e.target.value) }}
                    className='h-10 max-w-20 bg-yellow-50 text-orange-800 px-2 py-1 rounded-lg -mb-3'
                />
            </div>

            <div
                className='flex justify-start space-x-4 my-4'
            >
                <span
                    id="labelprop"
                    className='flex-1 my-auto'
                >
                    Nb propriétés :
                </span>
                <input
                    aria-labelledby='labelprop'
                    value={pro}
                    onChange={(e) => { e.preventDefault(); setPro(e.target.value) }}
                    className='h-10 max-w-20 bg-yellow-50 text-orange-800 px-2 py-1 rounded-lg'
                />
            </div>

            <div
                className='flex justify-start space-x-4 my-4'
            >
                <span
                    id="labelenf"
                    className='flex-1 my-auto'
                >
                    Nb enfants :
                </span>
                <input
                    aria-labelledby='labelenf'
                    value={nbe}
                    onChange={(e) => { e.preventDefault(); setNbe(e.target.value) }}
                    className='h-10 max-w-20 bg-yellow-50 text-orange-800 px-2 py-1 rounded-lg mt-1'
                />
            </div>

            <Properties
                nombre={pro}
                calculateur={props.calculateur}
                affiche={props.affiche}
                rafraichir={recalc}
            />
        </div>
    )
}

export default SaisieParametres