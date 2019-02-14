var attack_mode = true;
var skills_mode = true;

/* TODO: Automate these */
//start_character("QuadHeals", 31);
//start_character("QuadMage", 32);

//send_item("QuadHeals", 0, 149);
//send_item("QuadMage", 3, 100);
//smart_move("abee");

setInterval( function () {
    // TODO: Improve potion code maybe?
    if (character.hp < character.max_hp * 0.75 || character.mp < character.max_mp * 0.50) use_hp_or_mp();
    loot();

    if (!attack_mode || character.rip || is_moving(character)) return;

    var target;
    if (!target) {
        target = get_nearest_monster({min_xp:targetMinXP, max_att:targetMaxAttack});

        if (target) change_target(target);
        else {
            set_message("No Monsters");
            return;
        }
    }

    if (!in_attack_range(target)) {
        // charge if 100 distance
        if (distance(character, target) > 100) useCharge(target);
        move (
            character.x+(target.x-character.x) / 2,
            character.y+(target.y-character.y) / 2
        );
    } else if (can_attack(target)) {
        set_message("Attacking");
        if (skills_mode) useCombatSkills(target);
        attack(target);
    }
},1000/4);  // loops every 1/4 seconds.

function useCombatSkills(target) {
    if (can_use("agitate") || can_use(WarriorSkills.Taunt.name, tartget)) {
        let used = false;

        if (can_use(WarriorSkills.Agitate.name, target) && 
        character.level >= WarriorSkills.Agitate.level) used = useAgitate();

        if (!used && can_use(WarriorSkills.Taunt.name, target)) used = useTaunt(target);

        if (used) {
            if (can_use(WarriorSkills.Cleave.name, target) && 
            character.level >= WarriorSkills.Cleave.level &&
            character.mp >= WarriorSkills.Cleave.mp) {
                useCleave();
            }

            if (can_use(WarriorSkills.Stomp.name, target) && 
            parent.G.items[character.slots.mainhand.name].wtype === WeaponTypes.Basher) {
                useStomp();
            }
        }
    }
}

function useAgitate() { /** Taunts all nearby monsters. **/
    let nearbyMonsters = getMonstersNearby(WarriorSkills.Agitate.range);

    if (nearbyMonsters.length) {
        game_log("Taunting nearby monsters!", colorGreen);
        actionText(parent.G.skills[WarriorSkills.Agitate.name].name, colorGreen);
        use_skill(WarriorSkills.Agitate.name);
        return true;
    }
    return false;
}

function useCharge(target) { /** Gain 30 Speed for a short duration. **/
    if (can_use(WarriorSkills.Charge.name, target)) {
        game_log("Charge!", colorGreen);
        use_skill(WarriorSkills.Charge.name);
    }
}

function useCleave() { /** Swing your axe in a flurry to damage all enemies nearby! **/
    game_log("Swinging my axe!", colorGreen);
    actionText(parent.G.skills[WarriorSkills.Cleave.name].name, colorGreen);
    use_skill(WarriorSkills.Cleave.name);
}

function useStomp() { /** Stop on the ground to Stun enemies nearby! **/
    game_log("I'm an earthquake!", colorGreen);
    actionText(parent.G.skills[WarriorSkills.Stomp.name].name, colorGreen);
    use_skill(WarriorSkills.Stomp.name);
}

function useTaunt(target) { /** Taunts an enemy. Prevent players from escaping in pvp. Steals aggro **/
    if (parent.distance(target, character) <= WarriorSkills.Taunt.range) {
        game_log("Rhhawr!", colorGreen);
        actionText(parent.G.skills[WarriorSkills.Taunt.name].name, colorGreen);
        use_skill(WarriorSkills.Taunt.name, target);
        return true;
    }
    return false;
}

function useHardShell() { /** Protect yourself from Physical Attacks for a short duration. **/

}

function useWarCry() { /** Motivate your allies to fight! **/
    
}
