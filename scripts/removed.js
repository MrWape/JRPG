

// COMPARE TO CALCSTAT

setup.getStat = function(NPC, stat = "hpmax") {
	var st = setup.N[NPC].stats;
	var num = 0;

	if (["hp", "ap", "pp"].includes(stat)) {
		num = st[stat];

	} else if (stat == "hpmax") {
		num = 15 + (st.S) + (st.E * 2) + Math.floor(st.level * (2 + st.E / 2));

	} else if (stat == "ppmax") {
		num = 1 + Math.floor(st.I / 2);

	} else if (stat == "apmax") {
		num = 5 + Math.floor(st.A / 2);

	} else if (st[stat]) {
		num = st[stat];

	} else {
		num = 999;
	}

	//ADD GARMENTS
	//ADD PERKS
	//ADD WEAPONS
	//ADD STATUS EFFECTS

	//alert(num);
	return num
}











