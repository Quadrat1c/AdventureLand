// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!

var attack_mode=true
var follow_mode=false

setInterval(function(){
	var leader = get_player("Quadrat1c");
	
	if (follow_mode) {
		move(
			character.x+(leader.x-character.x)/4,
			character.y+(leader.y-character.y)/4
			);
	}
	
	//use_hp_or_mp();
	if(character.hp<100 || character.mp<80) use_hp_or_mp();
	loot();

	if(!attack_mode || character.rip || is_moving(character)) return;
	
	//var target = get_targeted_monster();
	var target = get_target_of(leader);
	if(!target)
	{
		target=get_nearest_monster({min_xp:100,max_att:120});
		if(target) change_target(target);
		else
		{
			set_message("No Monsters");
			return;
		}
	}
	move(
		character.x+(leader.x-character.x)/4,
		character.y+(leader.y-character.y)/4
	);
	
	if(!in_attack_range(target))
	{
		/*
		move(
			character.x+(target.x-character.x)/2,
			character.y+(target.y-character.y)/2
			);*/
		// Walk half the distance
	}
	else if(can_attack(target))
	{
		set_message("Attacking");
		attack(target);
	}

},1000/4); // Loops every 1/4 seconds.

// Learn Javascript: https://www.codecademy.com/learn/learn-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround

	{
		set_message("Attacking");
		attack(target);
	}

},1000/4); // Loops every 1/4 seconds.

// Learn Javascript: https://www.codecademy.com/learn/learn-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround
