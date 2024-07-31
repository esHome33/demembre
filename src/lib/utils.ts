const transforme = (
	age: string,
	nb_enfant: string,
	nb_proprietes: string
) => {
	const resu = {
		age: 0,
		nb_enfants: 0,
		nb_proprietes: 0,
    };
    
    if (age.length > 0) {
        resu.age = Number(age);
    }
    if (nb_enfant.length > 0) {
        resu.nb_enfants = Number(nb_enfant);
    }
    if (nb_proprietes.length > 0) {
        resu.nb_proprietes = Number(nb_proprietes);
    }
    return resu;
};

export default transforme;
