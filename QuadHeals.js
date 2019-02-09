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
    var mage = get_player("QuadMage");

    // heal self and other characters
    if (character.hp<250) heal(character);
    if (leader.hp<500) heal(leader);
    if (mage.hp<200) heal(mage);

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
        }
    }

    move(
        character.x+(leader.x-character.x)/2,
        character.y+(leader.y-character.y)/2
    );

},1000/4);  // Loops every 1/4 seconds.
