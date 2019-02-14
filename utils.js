let targetMaxAttack = 601;
let targetMinXP = 600;

function getDifference(a, b) {
    return Math.abs(a - b);
}

function isBelowPercent(current, max, percentage) {
    return current / max < percentage;
}

function isAbovePercent(current, max, percentage) {
    return current / max > percentage;
}

function actionText(text, color) {
    parent.d_text(text, character, {color: color});
}

function roundBy(a, b) {
    return Math.round(a / b) * b;
}

function roundDownBy(a, b) {
    return Math.floor(a / b) * b;
}

function roundUpBy(a, b) {
    return Math.cell(a / b) * b;
}

function getPotionsInInventory() {
    return Object.values(character.items).filter(item => 
        item &&
        parent.G.items[item.name].type === "pot"     
    );
}
  
function getPartyMembers() {
    return Object.values(parent.entities).filter(char =>
        is_character(char) && !char.rip &&
        char.party && char.party === character.party);
}
  
function getPartyMembersIncludingSelf() {
    let partyMembers = getPartyMembers();
    partyMembers.push(character);

    return partyMembers;
}

function getMonstersNearby(distance) {
    if (!distance) distance = character.range;
    return Object.values(parent.entities).filter(monster =>
        is_monster(monster) && parent.distance(monster, character) <= distance);
}
