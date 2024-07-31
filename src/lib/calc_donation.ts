/**
 * Classe qui effectue les calculs pour les donations de nue-propriété de biens
 */
export default class Calc_donation {
	age_donateur: number;
	nb_prop: number;
	nb_enfants: number;
	valeurs_venales: number[];
	valeurs_nu_prop: number[];

	droits_donation: number = 0;
	frais_notaire: number = 0;
	taxe_publicite_f: number = 0;
	frais_assiette: number = 0;
	contribution_secu_immo: number = 0;
	valeur_taxable: number = 0;
	cout_total_donation: number = 0;
	montant_taxable: number = 0;

	/**
	 * Pour faire les calculs il faut connaitre les trois paramètres suivants
	 * @param nombre_prop le nombre de propriétés dont on veut donner la nue-propriété
	 * @param age_donateur l'age du donateur
	 * @param nb_enfants le nombre d'enfants qui vont se partager les nue-propriétés
	 */
	constructor(age_donateur: number, nb_enfants: number, nombre_prop: number) {
		this.age_donateur = age_donateur;
		this.nb_enfants = nb_enfants;
		this.valeurs_venales = [];
		this.valeurs_nu_prop = [];
		for (let i = 0; i < nombre_prop; i++) {
			this.valeurs_venales.push(0);
			this.valeurs_nu_prop.push(0);
		}
		this.nb_prop = nombre_prop;
	}

	/**
	 * Détermine la part de la valeur de la nue-propriété
	 * en fonction de l'âge du donateur
	 *
	 * @param age age du donateur
	 * @returns la part de la valeur de la nue-propriété
	 */
	private get_val_nuprop(age: number) {
		if (age < 21) {
			return 0.1;
		} else if (age < 31) {
			return 0.2;
		} else if (age < 41) {
			return 0.3;
		} else if (age < 51) {
			return 0.4;
		} else if (age < 61) {
			return 0.5;
		} else if (age < 71) {
			return 0.6;
		} else if (age < 81) {
			return 0.7;
		} else if (age < 91) {
			return 0.8;
		} else {
			return 0.9;
		}
	}

	/**
	 * Barème progressif du fisc français pour les droits de donation
	 * @param montant_taxable montant soumis au barème progressif des droits de donation
	 *  (abattements déduits)
	 * @returns montant des droits de donation
	 */
	private calcule_montant_droits_donation(montant_taxable: number) {
		let valeur_taxe = 0;
		if (montant_taxable < 8073) {
			valeur_taxe += montant_taxable * 0.05;
		} else if (montant_taxable < 12110) {
			const reste = montant_taxable - 8072;
			valeur_taxe += reste * 0.1 + 8072 * 0.05;
		} else if (montant_taxable < 15933) {
			const reste = montant_taxable - 12110;
			valeur_taxe += reste * 0.15 + (12110 - 8072) * 0.1 + 8072 * 0.05;
		} else if (montant_taxable < 552325) {
			const reste = montant_taxable - 15933;
			valeur_taxe +=
				reste * 0.2 +
				(15933 - 12110) * 0.15 +
				(12110 - 8072) * 0.1 +
				8072 * 0.05;
		} else if (montant_taxable < 902839) {
			const reste = montant_taxable - 552325;
			valeur_taxe +=
				reste * 0.3 +
				(552325 - 15933) * 0.2 +
				(15933 - 12110) * 0.15 +
				(12110 - 8072) * 0.1 +
				8072 * 0.05;
		} else if (montant_taxable < 1805678) {
			const reste = montant_taxable - 902839;
			valeur_taxe +=
				reste * 0.4 +
				(902839 - 552325) * 0.3 +
				(552325 - 15933) * 0.2 +
				(15933 - 12110) * 0.15 +
				(12110 - 8072) * 0.1 +
				8072 * 0.05;
		} else {
			const reste = montant_taxable - 1805677;
			valeur_taxe +=
				reste * 0.45 +
				(1805677 - 902839) * 0.4 +
				(902839 - 552325) * 0.3 +
				(552325 - 15933) * 0.2 +
				(15933 - 12110) * 0.15 +
				(12110 - 8072) * 0.1 +
				8072 * 0.05;
		}

		this.droits_donation = Math.round(valeur_taxe);
		return valeur_taxe;
	}
	/**
	 * Fixe une valeur vénale pour une propriété
	 * @param numero_prop numéro d'ordre de la propriété (base 0)
	 * @param valeur  la valeur vénale de cette propriété
	 */
	set_valeurs_venales(numero_prop: number, valeur: number) {
		this.valeurs_venales[numero_prop] = valeur;
		const np = this.get_val_nuprop(this.age_donateur);
		this.valeurs_nu_prop[numero_prop] = valeur * np;
		this.cout_total_donation = this.cout_total(0);
	}

	/**
	 * Calcule le montant taxable sur la valeurs de la nue-propriété des biens
	 *
	 * Indiquer la valeur des donations déjà faites au préalable
	 * dans les quinze dernières années
	 * @param montant_deja_donne montant global des donations déjà faites
	 * à déduire de l'abattement de 100000 euros
	 *
	 * @returns le montant qui est soumis à la taxe des droits de donation
	 */
	calcule_montant_taxable(montant_deja_donne: number) {
		const somme_des_nu_prop = this.valeurs_nu_prop.reduce(
			(accu, valeur) => accu + valeur,
			0
		);
		const abattement = this.nb_enfants * 100000 - montant_deja_donne;
		const montant_taxable = somme_des_nu_prop - abattement;
		if (montant_taxable < 0) {
			return 0;
		} else {
			this.montant_taxable = Math.round(montant_taxable);
			return this.montant_taxable;
		}
	}

	/**
	 * Les frais de notaire se cumulent pour chaque propriété.
	 * Ils sont calculés sur la base de la valeur en pleine propriété.
	 * Cette fonction fournit les frais montant TTC (TVA 20%)
	 */
	calcul_frais_notaire() {
		let somme = 0;
		for (let i = 0; i < this.nb_prop; i++) {
			somme += this.calcul_frais_notaire_individuel(i);
		}
		this.frais_notaire = Math.round(somme);
		return this.frais_notaire;
	}

	/**
	 * les frais de notaire se calculent individuellement sur la valeur en pleine propriété.
	 * Ce calcul donne les frais TTC (TVA 20%)
	 */
	calcul_frais_notaire_individuel(numero_immeuble: number) {
		const somme_val_venales = this.valeurs_venales[numero_immeuble];
		let frais_notaire = 0;
		const t1 = 5.804 / 100;
		const t2 = 2.394 / 100;
		const t3 = 1.596 / 100;
		const t4 = 1.1976 / 100;

		if (somme_val_venales <= 6500) {
			frais_notaire += somme_val_venales * t1;
		} else if (somme_val_venales <= 17000) {
			const reste = somme_val_venales - 6500;
			const tranches_inf = 6500 * t1;
			frais_notaire += reste * t2 + tranches_inf;
		} else if (somme_val_venales <= 60000) {
			const reste = somme_val_venales - 17000;
			const tranches_inf = 6500 * t1 + (17000 - 6500) * t2;
			frais_notaire += reste * t3 + tranches_inf;
		} else {
			const reste = somme_val_venales - 60000;
			const tranches_inf =
				6500 * t1 + (17000 - 6500) * t2 + (60000 - 17000) * t3;
			frais_notaire += reste * t4 + tranches_inf;
		}

		return frais_notaire;
	}

	/**
	 * La taxe de pub foncière se calcule sur la valeur de la nue propriété (0.6 %).
	 *
	 * @returns valeur de la taxe de publicité foncière
	 */
	calcul_taxe_publicite_fonciere() {
		const somme_val_np = this.valeurs_nu_prop.reduce(
			(accu, valeur) => accu + valeur,
			0
		);
		const taux = 0.6 / 100;
		const pub_fonciere = somme_val_np * taux;
		this.taxe_publicite_f = Math.round(pub_fonciere);
		return this.taxe_publicite_f;
	}

	/**
	 * Les frais d'assiette et de recouvrement se calculent sur la taxe
	 * de pub foncière (2,37% de la valeur de la taxe de pub foncière)
	 * @returns frais d'assiette et de recouvrement
	 */
	calcul_frais_assiette_recouv() {
		const pub_fonc = this.calcul_taxe_publicite_fonciere();
		const taux = 2.37 / 100;
		const frais_assiette = pub_fonc * taux;
		this.frais_assiette = Math.round(frais_assiette);
		return this.frais_assiette;
	}

	/**
	 * contribution de sécurité immobilière : calculée sur la valeur
	 * de la nue-propriété
	 */
	calcul_csi() {
		const taux = 0.1 / 100;
		const somme_val_nuprop = this.valeurs_nu_prop.reduce(
			(accu, valeur) => accu + valeur,
			0
		);
		const csi = somme_val_nuprop * taux;
		this.contribution_secu_immo = Math.round(csi);
		return this.contribution_secu_immo;
	}

	cout_total(donations_deja_faites: number) {
		let total = 0;
		const montant_taxable = this.calcule_montant_taxable(
			donations_deja_faites
		);
		const dd = this.calcule_montant_droits_donation(montant_taxable);
		this.droits_donation = dd;
		total += dd;
		this.frais_notaire = this.calcul_frais_notaire();
		total += this.frais_notaire;
		this.taxe_publicite_f = this.calcul_taxe_publicite_fonciere();
		total += this.taxe_publicite_f;
		this.frais_assiette = this.calcul_frais_assiette_recouv();
		total += this.frais_assiette;
		this.contribution_secu_immo = this.calcul_csi();
		total += this.contribution_secu_immo;
		this.cout_total_donation = total;
		return total;
	}
}
