var game = new Phaser.Game(264, 400, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var joga = 0;
var map = [3, 3, 3, 3, 3, 3, 3, 3, 3];
var vitoria = 0;
var fim;
function preload() {
    game.load.image('quadrado', 'assets/quad.png');
    game.load.image('x', 'assets/sign-x.png');
    game.load.image('o', 'assets/sign-o.png');
    game.load.image('button', 'assets/color.png');
}
function create() {
    var vetor = [];
    var quads = game.add.group();
    var x = 0, y = 0;
    for (let i = 0; i < 9; i++) {
        
        var quadrado = quads.create(x, y, 'quadrado');
            quadrado.scale.setTo(0.2);
            quadrado.inputEnabled = true;
            quadrado.events.onInputDown.add(function (event) {
                if (map[event.renderOrderID] === 3 && vitoria === 0){
                    if (joga === 0) {
                        var x = game.add.sprite(event.cameraOffset.x + 18, event.cameraOffset.y + 18,'x');
                            x.scale.setTo(.4);
                        vetor.push(x);
                        joga = 1;
                        map[event.renderOrderID] =  0;
                    } else {
                        var o = game.add.sprite(event.cameraOffset.x + 18, event.cameraOffset.y + 18,'o');
                            o.scale.setTo(.4);
                        vetor.push(o);
                        joga = 0;
                        map[event.renderOrderID] =  1;
                    }
                }
            }, this);
        
        x = x + 80;
        if (quads.children.length === 3) {y = y + 80; x = 0;}
        if (quads.children.length === 6) {y = y + 80; x = 0;}
    }

    var button = game.add.button(game.world.height / 6.6, game.world.height / 1.1, 'button', function (event) {
        for (let i = 0; i < vetor.length; i++) {
            vetor[i].destroy();
        }
        joga = 0;
        vitoria = 0;
        fim.visible = false;
        map = [3, 3, 3, 3, 3, 3, 3, 3, 3];
    }, this);
        button.scale.setTo(0.5 ,1);

    var text = game.add.text(game.world.height / 4.3, game.world.height / 1.09, 'Reiniciar', { fontSize: '20px', fill: '#FFF'});
    fim = game.add.text(game.world.height / 6.1, game.world.height/ 1.5, 'Ganhou !', { fontSize: '32px', fill: '#FFF' });
        fim.visible = false;
}
function update() {
    //  Vitória do jogador 1
    if (map[0] === 0 && map[1] === 0 && map[2] === 0) {
        map = [3, 3, 3, 3, 3, 3, 3, 3, 3];
        vitoria = 1;
    }
    if (map[2] === 0 && map[5] === 0 && map[8] === 0) {
        map = [3, 3, 3, 3, 3, 3, 3, 3, 3];
        vitoria = 1;
    }
    if (map[8] === 0 && map[7] === 0 && map[6] === 0) {
        map = [3, 3, 3, 3, 3, 3, 3, 3, 3];
        vitoria = 1;
    }
    if (map[6] === 0 && map[3] === 0 && map[0] === 0) {
        map = [3, 3, 3, 3, 3, 3, 3, 3, 3];
        vitoria = 1;
    }

    if (map[0] === 0 && map[4] === 0 && map[8] === 0) {
        map = [3, 3, 3, 3, 3, 3, 3, 3, 3];
        vitoria = 1;
    }
    if (map[2] === 0 && map[4] === 0 && map[6] === 0) {
        map = [3, 3, 3, 3, 3, 3, 3, 3, 3];
        vitoria = 1;
    }
    if (map[3] === 0 && map[4] === 0 && map[5] === 0) {
        map = [3, 3, 3, 3, 3, 3, 3, 3, 3];
        vitoria = 1;
    }
    if (map[1] === 0 && map[4] === 0 && map[7] === 0) {
        map = [3, 3, 3, 3, 3, 3, 3, 3, 3];
        vitoria = 1;
    }
    // Vitória do jogador 2

    if (map[0] === 1 && map[1] === 1 && map[2] === 1) {
        map = [3, 3, 3, 3, 3, 3, 3, 3, 3];
        vitoria = 1;
    }
    if (map[2] === 1 && map[5] === 1 && map[8] === 1) {
        map = [3, 3, 3, 3, 3, 3, 3, 3, 3];
        vitoria = 1;
    }
    if (map[8] === 1 && map[7] === 1 && map[6] === 1) {
        map = [3, 3, 3, 3, 3, 3, 3, 3, 3];
        vitoria = 1;
    }
    if (map[6] === 1 && map[3] === 1 && map[0] === 1) {
        map = [3, 3, 3, 3, 3, 3, 3, 3, 3];
        vitoria = 1;
    }

    if (map[0] === 1 && map[4] === 1 && map[8] === 1) {
        map = [3, 3, 3, 3, 3, 3, 3, 3, 3];
        vitoria = 1;
    }
    if (map[2] === 1 && map[4] === 1 && map[6] === 1) {
        map = [3, 3, 3, 3, 3, 3, 3, 3, 3];
        vitoria = 1;
    }
    if (map[3] === 1 && map[4] === 1 && map[5] === 1) {
        map = [3, 3, 3, 3, 3, 3, 3, 3, 3];
        vitoria = 1;
    }
    if (map[1] === 1 && map[4] === 1 && map[7] === 1) {
        map = [3, 3, 3, 3, 3, 3, 3, 3, 3];
        vitoria = 1;
    }

    if (vitoria === 1) {
        vitoria = 3;
        fim.visible = true;
    }
}


// https://phaser.io/examples/v2/groups/add-a-sprite-to-group