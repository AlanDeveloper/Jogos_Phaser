// Abrir index.html a partir do firefox para que o jogo funcione


// Iniciando configurações do jogo
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {

    // Carregamento de arquivos
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
}

var player;
var platforms;
var cursors;

var stars;
var score = 0;
var scoreText;

function create() {

    // Antes de poder adicionar a física ao jogo devemos iniciar um tipo de física
    // Para saber melhor dos tipos de físicas 
    // https://phaser.io/docs/2.4.4/Phaser.Physics.html
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Adicionando background onde deve ficar e seu nome
    game.add.sprite(0, 0, 'sky');

    platforms = game.add.group();

    //  Habilitar a física a qualquer objeto criado no grupo 'platforms'
    platforms.enableBody = true;

    // Chão
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Duplicando o chão pelo fato da plataforma ser pequena para preencher todo chão
    ground.scale.setTo(2, 2);

    //  Impedindo que caia ao pular nele
    ground.body.immovable = true;

    //  Segunda plataforma
    var ledge = platforms.create(400, 400, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-150, 250, 'ground');
    ledge.body.immovable = true;

    // Adicionando player
    player = game.add.sprite(32, game.world.height - 150, 'dude');

    //  Adicionando a física ao player
    game.physics.arcade.enable(player);

    //  Configurando física
    // Quanta força será devolvida ao player depois do pulo
    player.body.bounce.y = 0.2;
    // Pulo quanto mais alto número menor o pulo
    player.body.gravity.y = 300;
    // Impedindo que ele suma da tela
    player.body.collideWorldBounds = true;

    //  Animações
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    //  Criando grupo
    stars = game.add.group();
    stars.enableBody = true;

    //  Criando 12 estrelas
    for (var i = 0; i < 12; i++)
    {
        var star = stars.create(i * 70, 0, 'star');

        //  Gravidade
        star.body.gravity.y = 300;

        //  Força devolvida será diferente para cada estrela
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    //  Score
    scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    // Controles 
    cursors = game.input.keyboard.createCursorKeys();
    
}

function update() {

    //  Adicionando colisão entre plataformas e estrelas
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);

    //  Verificação para ver se dois corpos se encostaram
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

    //  Adicionando velocidade do player
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        // Esquerda
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        // Direita
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        // Parando animação
        player.animations.stop();
        player.frame = 4;
    }
    
    //  Permite que jogador pule ao tocar no chão
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }


    // Para a vitória

    if (score === 120) {
        var fim = game.add.text(game.world.height / 1.8, game.world.height / 2, 'Ganhou !', { fontSize: '32px', fill: '#000' });
        score = 0;
        player.kill();
    }
}

function collectStar (player, star) {
    
    // Remove estrelas
    star.kill();

    //  Adiciona o score
    score += 10;
    scoreText.text = 'Score: ' + score;

}
