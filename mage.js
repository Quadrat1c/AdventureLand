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

    var target;
    if (assist_mode) {
        target = get_target_of(leader);
    } else {
        target = get_nearest_monster({min_xp:targetMinXP, max_att:targetMaxAttack});
    }

    if (!target) {
        // do nothing
    } else {
        if (can_attack(target)) {
            set_message("Attacking");
            attack(target);
            if (skills_mode) useCombatSkills(target);
        } else {
            if (distance(character, target) > 100 ) {
				move(
					character.real_x+(target.x-character.real_x) / 2,
					character.real_y+(target.y-character.real_y) / 2
				);
			}
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
    if (can_use("burst") && 
        target.hp >= calcManaBurstDmg() && character.mp > 2000) { 
            useManaBurst(target);
    }

    if (can_use("energize") && 
    character.level >= MageSkills.Energize.level) {
        useEnergize();
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

function useManaBurst(target) { /** Converts your entire mana pool to damage. Deals 0.5 magical damage for each MP. **/
    game_log("Casting " + parent.G.skills[MageSkills.ManaBurst.name].name + " for " + calcManaBurstDmg() + " dmg", colorGreen);
    //actionText(parent.G.skills[MageSkills.ManaBurst.name].name, colorGreen);
    use_skill(MageSkills.ManaBurst.name, target);
}

function useControlledManaBurst(target) { /** A skill for experienced mages. Allows you to control your most powerful ability. **/
    use_skill(MageSkills.ControlledManaBurst.name, target);
}

function useEnergize() { /** Transfers mana to a target. As a side effect the target gains high attack speed for a short duration. **/
    let partyMembers = getPartyMembers();
    
    partyMembers = Object.values(partyMembers).filter(char =>
          parent.distance(char, character) <= MageSkills.Energize.range && 
          isBelowPercent(char.mp, char.max_mp, 0.3) 
    );
    partyMembers.sort((a, b) => a.mp / a.max_mp - b.mp / b.max_mp);
    if(partyMembers.length){
        actionText(parent.G.skills[MageSkills.Energize.name].name, colorGreen);
        use_skill(MageSkills.Energize.name, partyMembers[0]);
        game_log("Used " + parent.G.skills[MageSkills.Energize.name].name + " on " + partyMembers[0].name, colorGreen);
    }    
}

function useMagiport(target) { /** Pull someone to your location using the magical paths that surround our world. **/
    use_skill(MageSkills.Magiport.name, target);
}

function useLight(target) { /** Reveals invisible entities nearby and prevents them from going invisible again for 12 seconds. **/
    use_skill(MageSkills.Light.name, target);
}

function useBlink(target) { /** Teleport to a nearby location. **/
    use_skill(MageSkills.Blink.name, target);
}

function calcManaBurstDmg() {
    return 0.5 * character.mp;
}
