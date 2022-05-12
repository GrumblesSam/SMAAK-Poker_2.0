

const Poker = require('poker-ts');
const { default: ChipRange } = require('poker-ts/dist/lib/chip-range');

table = new Poker.Table({ smallBlind: 50, bigBlind: 100 })

table.sitDown(0, 1000); // seat a player at seat 0 with 1000 chips buy-in
table.sitDown(2, 1500); // seat a player at seat 2 with 1500 chips buy-in
table.sitDown(5, 1700); // seat a player at seat 5 with 1700 chips buy-in






table.startHand();
console.log(table.seats());
console.log(table.pots());
console.log(table.legalActions());
table.actionTaken('raise', 200);
table.actionTaken('call');
table.actionTaken('call');
table.endBettingRound();
console.log(table.pots());

while (table.isHandInProgress()) {
    while (table.isBettingRoundInProgress()) {
      const seatIndex = table.playerToAct();

      table.holeCards()[seatIndex];
      // Get `action` and possibly `betSize` in some way
      // if there's a table showing the cards, there should be a button saying an action
      // and a field for bet size. I can take the values when someone hits the action button
      // and put those values in here.
      const [action, betSize] = getPlayerActionSomehow(seatIndex);
      
      table.actionTaken(action, betSize);
      seatIndex.actiontaken
    }
    
    table.endBettingRound()
    
    if (table.areBettingRoundsCompleted()) {
      table.showdown()
    }
}

document
    .querySelector('#action-form')
    .addEventListener('submit', getPlayerActionSomehow)