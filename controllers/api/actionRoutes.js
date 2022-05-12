const router = require('express').Router();
const Poker = require('poker-ts');
const { Hand } = require('../../models');


// end betting rounds

function activePlayers(arr){
    const res=[];
    for(let i=0;i<arr.length;i++){
        if(arr[i]!==null)
            res.push(i);
    }
    console.log(res)
    return res;
};

router.get('/table', (req, res) => {
    try{
        let holeCards = table.holeCards();
        let tableCards = table.communityCards();
        let tableStatus = {holeCards, tableCards}
        res.json(tableStatus);
    }
    catch (err) {
        console.log(err);
    }
});

router.get('/adminTable', (req, res) => {
    table = new Poker.Table({ smallBlind: 50, bigBlind: 100 });
    table.sitDown(0, 10000); // seat a player at seat 0 with 1000 chips buy-in
    table.sitDown(2, 10000); // seat a player at seat 2 with 1500 chips buy-in
    table.sitDown(5, 10000); // seat a player at seat 5 with 1700 chips buy-in
    table.startHand();
    res.json('admin hand started')
});

router.get('/adminTableCheck', (req, res) => {
    table = new Poker.Table({ smallBlind: 50, bigBlind: 100 });
    table.sitDown(0, 10000); // seat a player at seat 0 with 1000 chips buy-in
    table.sitDown(2, 10000); // seat a player at seat 2 with 1500 chips buy-in
    table.sitDown(5, 10000); // seat a player at seat 5 with 1700 chips buy-in
    table.startHand();
    res.json('admin hand started')
    table.actionTaken('call');
    table.actionTaken('call');
    table.actionTaken('check');
    table.endBettingRound();
    table.actionTaken('check');
    table.actionTaken('check');
    table.actionTaken('check');
    table.endBettingRound();
    table.actionTaken('check');
    table.actionTaken('check');
    table.actionTaken('check');
    table.endBettingRound();
    table.actionTaken('check');
    table.actionTaken('check');
    table.actionTaken('check');
    table.endBettingRound();
});

router.get('/makeTable', (req, res) => {
    table = new Poker.Table({ smallBlind: 50, bigBlind: 100 });
    res.json(table.seats());
});

router.get('/startGame', (req, res) => {
    table.startHand();
    res.json('hand started');
});

router.get('/endRound', (req, res) => {
    table.endBettingRound();
    res.status(200).json(table.roundOfBetting());
});

router.get('/tableStatus', (req, res) => {
    console.log(table.seats());
    console.log(table.handPlayers());
    res.status(200).json(table.roundOfBetting());
});

router.get('/whatNext', (req, res) => {
    res.json([
        table.playerToAct(),
        table.roundOfBetting()
    ]);
});

router.get('/tableCards', (req, res) => {
    res.json(table.communityCards());
});

router.get('/winners', (req, res) => {
    res.json(table.winners());
})

router.get('/progress', (req, res) => {
    console.log(table.isBettingRoundInProgress());
    console.log(table.isHandInProgress());
    res.json('check log');
})

router.get('/sitDown/:seat/:chips', (req, res) => {
    // when sitting down, display how many chips you have
    // ask for input of how many you want to sit down with
    // must be within range of your chips'
    console.log(req.params);
    let mySeat = JSON.parse(req.params.seat);
    let myChips = JSON.parse(req.params.chips);
    table.sitDown(mySeat, myChips);
    res.json(table.seats()[req.params.seat]);

    // add what seat we are to db

    
    // if (req.session.logged_in) {
    //   //assign seat (choose)
    //   // can't join a hand in progress
    //   table.sitDown(req.params.seat, 10000);
    //   ;
    // } else {
    //   res.redirect('/login').end();
    // }
  });

router.get('/whatRound', (req,res) => {
    res.status(200).json(table.roundOfBetting());
})

router.post('/showdown', async (req, res) => {

    if (!table.areBettingRoundsCompleted())
        {table.endBettingRound();};

        console.log(activePlayers(table.handPlayers()));
        
    if (table.numActivePlayers()===1) {
        let handCards = table.holeCards()[activePlayers(table.handPlayers())[0]]

        let cards = table.communityCards();
        console.log(table.communityCards());
        let card1=handCards[0];
        let card2=handCards[1];
        cards.push(card1);
        cards.push(card2);
        console.log(cards);
    }
        table.showdown();

        // console.log(table.winners());

        // console.log(table.winners(1));
        // console.log(table.winners().cards);
        // console.log(table.winners()[0][0][1].cards);
        // console.log(JSON.stringify(table.winners()[0][0][1].cards));
        // let data = user id, hand, pot amount
        try {
            const dbWinnerData = await Hand.create({
                hand_val: JSON.stringify(table.winners()[0][0][1].cards),
            });
            res.status(200).json(dbWinnerData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
        console.log(table.seats());
});
// some kind of win before showdown
router.get('/newRound', (req,res) => {
    
    if (table.numActivePlayers()===1 && table.isHandInProgress()) {
        let winner = table.handPlayers()[table.playerToAct()];
        console.log(table.handPlayers()[table.playerToAct()]);
        console.log(table.holeCards()[table.playerToAct()]);
        console.log(table.communityCards());
        console.log(table.pots());
        console.log(table.roundOfBetting());
        console.log(table.isBettingRoundInProgress());
        table.endBettingRound();

        // while (table.isHandInProgress()) {            
        //     table.endBettingRound();
        //     if (table.areBettingRoundsCompleted()) {
        //       table.showdown();
        //       res.json(table.winners());
        //     };
        //   };

        table.showdown();
        
        console.log(table.seats());
        res.json(winner);
        return;
    }
    table.endBettingRound();
    res.status(200).json(table.roundOfBetting());
})

router.get('/call/:seat', (req, res) => {
    // pass in current active seat
    if (true) {
        table.actionTaken('call');
      //call action
        res.json('call')
      ;
    } else {
      res.json('done').end();
    }
  });

router.get('/fold/:seat', (req, res) => {
// pass in current active seat
    if (true) {
        table.actionTaken('fold');
        //fold action
        // check if last player alive
        // if 1 player showdown(), else fold
        res.json('fold')
        ;
    } else {
        res.json('done').end();
    }
    });

router.get('/check/:seat', (req, res) => {
// pass in current active seat
    if (true) {
        table.actionTaken('check');
    //check action
        res.json('check')
    ;
    } else {
    res.json('done').end();
    }
    });

router.get('/bet/:seat/:betAmount', (req, res) => {
// pass in current active seat
    if (true) {
        table.actionTaken('bet', JSON.parse(req.params.betAmount));
        //bet action
        res.json('bet');
    } else {
        res.json('done').end();
    }
    });
    
// req.body.seat===req.params.seat
router.get('/raise/:seat/:betAmount', (req, res) => {
    // pass in current active seat
    if (true) {
        table.actionTaken('raise', JSON.parse(req.params.betAmount));
    //raise action
        res.json('raise')
    ;
    } else {
    res.json('done').end();
    }
    });

    module.exports = router;