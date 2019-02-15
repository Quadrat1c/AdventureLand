var attack_mode = true;
var assist_mode = true;
var skills_mode = true;

/* TODO: Automate these */
//send_item("QuadHeals", 0, 149);
//send_item("QuadMage", 3, 100);
//smart_move("abee");

setInterval( function () {
    partyAccept();  // accept party invite from Quadrat1c

    if(!attack_mode || character.rip) return;

    // TODO: Improve potion code maybe?
    if (character.hp < character.max_hp * 0.75 || character.mp < character.max_mp * 0.60) use_hp_or_mp();
    loot();

    // character entities
    var leader = get_player("Quadrat1c");

    if (character.hp < character.max_hp * 0.30) { 
        heal(character); 
    } else {
        heal_party();
    }

    var target;
    if (assist_mode) {
        target = get_target_of(leader);
    } else {
        target = get_nearest_monster({min_xp:targetMinXP, max_att:targetMaxAttack});
    }

    if (!target) {
        heal_party();
    } else {
        if (can_attack(target)) {
            set_message("Attacking");
            attack(target);
            if (skills_mode) useCombatSkills(target);
        } else {
            heal_party();
        }
    }

    if (distance(character, leader) > 100) {
        move(
            character.real_x+(leader.x-character.real_x) / 2,
            character.real_y+(leader.y-character.real_y) / 2
        );
    }

},1000/4);  // loops every 1/4 seconds.

function useCombatSkills(target) {
    if (can_use("curse") && character.mp > PriestSkills.Curse.mp
	   && target.hp >= 3000) { 
        useCurse(target); 
    }
}

function partyAccept() {
    if (!!Object.keys(parent.party).length == true) {
        // do nothing
    } else {
        accept_party_invite("Quadrat1c");
        game_log("Waiting for invite to party.");
    }
}

function heal_party() {
	var target;
	var lowest = 9999;
	for (var i = 0; i < parent.party_list.length; i++) {
		var member = get_player(parent.party_list[i]);
		if (member != null && !member.rip && member.hp < member.max_hp) {
			var difference = member.max_hp - member.hp;
			if (difference > 300 && difference < lowest) {
				lowest = difference;
				if (target == null || target.max_hp - target.hp > difference) {
					target = member;
				}
			}
		}
	}

	if (target != null) {
		set_message("Healing");
		heal(target);
	}
}

function useCurse(target) { /** Cursed opponents receive 20% more damage, deal 20% less damage and they slow down by 20 **/
    game_log("Cursing Enemy!", colorGreen);
    use_skill(PriestSkills.Curse.name, target);
}
