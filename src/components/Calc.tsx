'use client'

import Calc_donation from '@/lib/calc_donation';
import transforme from '@/lib/utils';
import React, { useRef, useState } from 'react'
import SaisieParametres from './SaisieParametres';
import Calculs from './Calculs';

type Props = {}

const Calc = (props: Props) => {

    const [age, setAge] = useState<string>('');
    const [nb_enfants, setNb_enfants] = useState<string>('');
    const [nb_proprietes, setNb_proprietes] = useState<string>('');
    const [reset, setReset] = useState<boolean>(false);
    const [cc, setCc] = useState<Calc_donation | undefined>(undefined);
    
    
    const change_age = (new_age: number) => {
        const newval = `${new_age}`;
        const { age: agen, nb_enfants:nb_enfants_num, nb_proprietes: nb_proprietes_num }
            = transforme(newval, nb_enfants, nb_proprietes);
        setCc( new Calc_donation(agen, nb_enfants_num, nb_proprietes_num));
        setAge(newval);
        setReset(()=>false);
    }
    const change_nb_enf = (new_nb_enfant: number) => {
        const newval = `${new_nb_enfant}`;
        const { age: agen, nb_enfants:nb_enfants_num, nb_proprietes: nb_proprietes_num }
            = transforme(age, newval, nb_proprietes);
        setCc(new Calc_donation(agen , nb_enfants_num , nb_proprietes_num));
        setNb_enfants(newval);
        setReset(()=>false);
    }
    const change_nb_prop = (new_nb_prop: number) => {
        const newval = `${new_nb_prop}`;
        const { age: agen, nb_enfants:nb_enfants_num, nb_proprietes: nb_proprietes_num }
            = transforme(age, nb_enfants, newval);
        setCc(new Calc_donation(agen, nb_enfants_num, nb_proprietes_num));
        setNb_proprietes(newval);
        setReset(()=>false);
    }

    const invalidate = () => {
        setCc(undefined);
        setReset(true);        
    }

    const force = () => {
        setReset(()=>!reset);
    }


    return (
        <div
            className='flex flex-col space-y-4 mb-10'
        >
            <SaisieParametres
                age_chg={change_age}
                enf_chg={change_nb_enf}
                pro_chg={change_nb_prop}
                invalidate={invalidate}
                calculateur={cc}
                affiche={force}
            />
            <hr
                className='h-2 border-red-200 border-2 rounded-full'
            ></hr>
            <Calculs
                calculateur={cc}
                reset={reset}
            />
        </div>
    )
}

export default Calc;