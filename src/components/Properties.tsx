

import Calc_donation from '@/lib/calc_donation';
import React from 'react'
import Propriete from './Propriete';

type Props = {
    nombre: string;
    calculateur: Calc_donation | undefined;
    affiche: () => void;
}

const Properties = (props: Props) => {

    const nb = Number(props.nombre);
    if (!props.calculateur) {
        return <>Aucune propriété</>;
    }

    const nb_proprietes = Number(props.nombre);

    const modif_valeur = (valeur: number, numero_prop: number) => {
        if (props.calculateur) {
            props.calculateur.set_valeurs_venales(numero_prop, valeur);
            const ret = props.calculateur.valeurs_nu_prop[numero_prop];
            return ret;
        } else {
            return 0;
        }
    }

    const det_prop = () => {
        let elt: JSX.Element[] = [];
        for (let index = 0; index < nb_proprietes; index++) {
            const prix_v = props.calculateur?.valeurs_venales[index];
            const prix_np = props.calculateur?.valeurs_nu_prop[index];
            elt.push(
                <Propriete
                    nue_prop={`${prix_np}`}
                    valeur={`${prix_v}`}
                    key={index}
                    index={index}
                    change_val={modif_valeur}
                    force={props.affiche}
                />
            );
        }
        return elt;
    }

    return (
        <div
            className='mt-3 font-mono'
        >
            Il y a {nb} propriétés
            {
                det_prop().map((elt, index) => {
                    return elt;
                })
            }
        </div>
    )
}

export default Properties