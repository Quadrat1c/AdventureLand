initialize();

function initialize() {
    game_log("-- Initializing Files.");
    // load required files
    load_code(2);   // constants.js
    load_code(99);  // utils.js

    game_log("-- Loading Character Files.");
    // load class specific files
    loadCharacterClass();
    
    game_log("Loading Complete.");
}

function loadCharacterClass() {
    switch (character.ctype) {

        case CharacterTypes.Warrior:
            load_code(30);  // warrior.js
            break;

        case CharacterTypes.Priest:
            load_code(31);  // priest.js
            break;

        case CharacterTypes.Mage:
            load_code(32);  // mage.js
            break;

        case CharacterTypes.Merchant:
            load_code(33);  // merchant.js

        case CharacterTypes.Ranger:
            load_code(34);  // ranger.js
            break;

        case CharacterTypes.Rogue:
            load_code(35);  // rogue.js
            break;

        case Default:
            game_log("Unknown Class");
            break;
    }
}
