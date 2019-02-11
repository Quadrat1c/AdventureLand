var auto_mode = true;
var assist_attack = true;

//send_item("QuadMage", 4, 1);

/*
 * TODO:
 * Auto Party
 * Auto Buy potions
 * Auto Upgrade Items
 */

setInterval(function () {
	if (!!Object.keys(parent.party).length == true) {
		// do nothing
	} else {
		accept_party_invite("Quadrat1c");
		game_log("Waiting for invite to party.");
	}
	
    // create character entities
    var leader = get_player("Quadrat1c");

    // use potions
    if(character.hp < 100 || character.mp < 300) use_hp_or_mp();

    loot();

    if(!auto_mode || character.rip || is_moving(character)) return;

    var target;
	if (assist_attack) { 
		target = get_target_of(leader); 
	} else {
		target = get_nearest_monster({min_xp:100,max_att:100});
	}
	
    if (!target) {
        // do nothing
    } else {
        if (can_attack(target)) {
            set_message("Attacking");
            attack(target);
        } else {
			if (distance(character, target) > 70 ) {
				move(
					character.real_x+(target.x-character.real_x)/2,
					character.real_y+(target.y-character.real_y)/2
				);
			}
		}
    }

    if (distance(character, leader) > 70 ) {
		move(
			character.real_x+(leader.x-character.real_x)/2,
			character.real_y+(leader.y-character.real_y)/2
		);
	}

},1000/4);  // Loops every 1/4 seconds.

function assist() {
	if (assist_attack) {
		assist_attack = false;
	} else {
		assist_attack = true;
	}
}
