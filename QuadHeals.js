var auto_mode = true;
var assist_attack = true;

//send_item("QuadMage", 4, 1);


setInterval(function () {
	if (!!Object.keys(parent.party).length == true) {
		// do nothing
	} else {
		accept_party_invite("Quadrat1c");
		game_log("Waiting for invite to party.");
	}
	
	// use potions
    if(character.hp < character.max_hp * 0.25 || character.mp < 300) use_hp_or_mp();
	loot();
	
    // create character entities
    var leader = get_player("Quadrat1c");
    var mage = get_player("QuadMage");

    // heal self and other characters
	if (character.hp<250) {
		heal(character);
	} else {
		heal_party();
	}

    if(!auto_mode || character.rip || is_moving(character)) return;
	
	var target;
	if (assist_attack) { 
		target = get_target_of(leader); 
	} else {
		target = get_nearest_monster({min_xp:100,max_att:100});
	}
	
    if (!target) {
		heal_party();
    } else {
        if (can_attack(target)) {
            set_message("Attacking");
            attack(target);
        } else {
			heal_party();
		}
    }
	
	if (distance(character, leader) > 50 ) {
		move(
			character.real_x+(leader.x-character.real_x)/2,
			character.real_y+(leader.y-character.real_y)/2
		);
	}

},1000/4);  // Loops every 1/4 seconds.

function heal_party() {
	var target;
	var lowest = 9999;
	for (var i = 0; i < parent.party_list.length; i++) {
		var member = get_player(parent.party_list[i]);
		if (member != null && !member.rip && member.hp < member.max_hp) {
			var difference = member.max_hp - member.hp;
			if (difference > 400 && difference < lowest) {
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

function assist() {
	if (assist_attack) {
		assist_attack = false;
	} else {
		assist_attack = true;
	}
}
