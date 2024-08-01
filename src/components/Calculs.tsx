'use client';

import Calc_donation from '@/lib/calc_donation';
import { useState } from 'react';


type Props = {
    calculateur: Calc_donation | undefined | null;
    reset: boolean;
}

const Calculs = (props: Props) => {
    const [reset, setReset] = useState(props.reset);
    const calculs = props.calculateur;

    return (
        <div
            className='flex flex-col space-y-2'
        >
            <div
                className='flex-1 flex space-x-2 mb-2'
            >

                {calculs ?
                    <div
                        className='rounded-md bg-slate-800 text-yellow-200 px-2 py-1 text-center text-sm my-auto'
                    >
                        age {calculs.age_donateur}
                    </div>
                    :
                    <div
                        className='mx-auto text-sm italic text-white bg-blue-900 rounded p-2'
                    >
                        complétez les données d&apos;entrée
                    </div>
                }

                {calculs ?
                    <div
                        className='rounded-md bg-slate-800 text-yellow-200 px-2 py-1 text-center text-sm my-auto'
                    >
                        {calculs.nb_enfants} enfants
                    </div>
                    :
                    null
                }

                {
                    calculs ?
                        <div
                            className='rounded-md bg-slate-800 text-yellow-200 px-2 py-1 text-center text-sm my-auto'
                        >
                            {calculs.nb_prop} prop
                        </div>
                        :
                        null
                }
            </div>

            
            <div
            >
                coût total TTC : {calculs ? Math.round(calculs.cout_total_donation)+"€" : "//"}
            </div>
            <div>
                droits donation : {calculs ? Math.round(calculs.droits_donation) + "€" : "//"}
            </div>
            <div>
                frais notaire : {calculs ? Math.round(calculs.frais_notaire) + "€" : "//"}
            </div>
            <div>
                pub foncière : {calculs ? Math.round(calculs.taxe_publicite_f) + "€" : "//"}
            </div>
            <div>
                frais d&apos;assiette et recouvrement : {calculs ? Math.round(calculs.frais_assiette) + "€" : "//"}
            </div>
            <div>
                CSI : {calculs ? Math.round(calculs.contribution_secu_immo) + "€" : "//"}
            </div>
        </div>
    )
}

export default Calculs