var auto_mode = true;

//send_item("QuadMage", 4, 1);

setInterval(function () {
	// use potions
    if(character.hp<100 || character.mp<80) use_hp_or_mp();
	loot();
	
    // create character entities
    var leader = get_player("Quadrat1c");
    var mage = get_player("QuadMage");

    // heal self and other characters
    if (character.hp<250) heal(character);
	if (leader) {
		if (leader.hp<500) heal(leader);
	}
	if (mage) {
    	if (mage.hp<200) heal(mage);
	}

    if(!auto_mode || character.rip || is_moving(character)) return;

    var target = get_target_of(leader);
    if (!target) {
        // heal party
		if (character.hp < character.max_hp * 0.9) heal(character);
		if (leader) {
			if (leader.hp < leader.max_hp * 0.9) heal(leader);
		}
		if (mage) {
			if (mage.hp < mage.max_hp * 0.9) heal(mage);
		}
    } else {
        if (can_attack(target)) {
            set_message("Attacking");
            attack(target);
        } else {
			/*
			move(
				character.real_x+(target.x-character.real_x)/1,
				character.real_y+(target.y-character.real_y)/1
			);*/
		}
    }
	
	if (distance(character, leader) > 50 ) {
		move(
			character.real_x+(leader.x-character.real_x)/2,
			character.real_y+(leader.y-character.real_y)/2
		);
	}

},1000/4);  // Loops every 1/4 seconds.
