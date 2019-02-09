var auto_mode = true;

/*
 * TODO:
 * Auto Party
 * Auto Buy potions
 * Auto Upgrade Items
 */

setInterval(function () {
    // create character entities
    var leader = get_player("Quadrat1c");

    // use potions
    if(character.hp<100 || character.mp<80) use_hp_or_mp();

    loot();

    if(!auto_mode || character.rip || is_moving(character)) return;

    var target = get_target_of(leader);
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
