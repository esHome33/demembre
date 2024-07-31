'use client';

import Calc_donation from '@/lib/calc_donation';
import React, { useEffect, useState } from 'react'

type Props = {
    calculateur: Calc_donation | undefined | null;
    reset: boolean;
}

const Calculs = (props: Props) => {


    const calculs = props.calculateur;



    return (
        <div
            className='flex flex-col space-y-2'
        >

            <div>Calculs faits : {props.reset ? "VRAI" : "FAUX"}</div>
            <div
                className='flex space-x-2'
            >

                <div
                    className='rounded-md bg-slate-500 px-2'
                >
                    {calculs ? `age ${calculs.age_donateur}` : "//"}
                </div>
                <div
                    className='rounded-md bg-slate-500 px-2'
                >
                    {calculs ? `${calculs.nb_enfants} enfants` : "//"}
                </div>
                <div
                    className='rounded-md bg-slate-500 px-2'
                >
                    {calculs ? `${calculs.nb_prop} prop` : "//"}
                </div>
            </div>

            <div>
                cout total = {calculs ? calculs.cout_total_donation : "//"}
            </div>
            <div>
                droits donation = {calculs ? Math.round(calculs.droits_donation) : "//"}
            </div>
            <div>
                frais notaire = {calculs ? Math.round(calculs.frais_notaire) : "//"}
            </div>
            <div>
                pub foncière = {calculs ? Math.round(calculs.taxe_publicite_f) : "//"}
            </div>
            <div>
                frais d&apos;assiette et recouvrement = {calculs ? Math.round(calculs.frais_assiette) : "//"}
            </div>
            <div>
                CSI = {calculs ? Math.round(calculs.contribution_secu_immo) : "//"}
            </div>
        </div>
    )
}

export default Calculs