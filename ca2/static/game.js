//Next
//Get the monster to go towards the character
//Get health bar going
// Set it up so that you can't progress until you Kill the enemy
// Then we'll have to somehow implement different levels and do two things - Increase the speed of the monsters (have no idea)(you could introduce acceleration for it and so they'll get faster and faster that way and each level increase the acceleration) and increase the skeletons (easy)


//I need to have a look at the collisons of skeletons with the blue dude when i have a health bar working
let canvas;
let context;
let request_id;
let skeletons =[];

//background
let tilesPerRow = 64;
let tileSize = 16;
let background = [ //these lists are made up of 32 items and there is 20 lists
    [514,517,518,519,520,521,836,850,851,850,841,842,837,838,839,840,843,844,845,846,841,842,863,864,865,866,521,522,523,1109,1110,1111],
    [578,581,582,583,584,585,900,914,582,914,905,906,901,902,903,904,907,908,909,910,905,906,927,928,929,930,585,586,1173,1174,1175,1176],
    [644,645,646,647,648,649,964,978,646,978,969,970,965,966,967,968,971,972,973,974,969,970,991,992,993,994,649,650,1237,1238,1239,1240],
    [708,709,710,711,712,713,1028,709,709,709,1033,1034,1029,1030,1031,1032,1035,1036,1032,1038,1033,1034,1035,1036,1037,1038,1033,1034,1035,1036,1037,1038],
    [1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,539,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208],
    [1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,539,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208],
    [1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,539,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208],
    [1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,539,779,779,779,779,779,779,779,779,779,779],
    [1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,539,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208],
    [1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,539,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208],
    [1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,539,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208],
    [1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,539,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208],
    [1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,539,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208],
    [1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,539,779,779,779,779,779,779,779,779,779,779],
    [1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,539,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208],
    [1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,539,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208],
    [1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,539,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208],
    [1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,539,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208],
    [1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,539,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208],
    [1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208,539,1208,1208,1208,1208,1208,1208,1208,1208,1208,1208],
]
// not me spending ages trying to get the right width and height only for it to be in the stupid god damn place i downloaded it from 
let player ={
    x:0,
    y:0,
    width:50,
    height:37,
    frameX:0,
    frameY:0,
    xChange:0,
    yChange:0,
    health:1000
}
let healthBar = {
    x:10,
    y:10,
    width: 15,
    height:15,
    frameX:0,
    frameY:0
}
let enemy = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    xChange: 1,
    yChange: 1,
    frameX: 0,
    frameY:0,
    health: 100
}
let enemyHealth = {
    x:490,
    y:10,
    width: 15,
    height:15,
    frameX:0,
    frameY:0
}
//Images
let playerImage = new Image();
let healthImage = new Image();
let enemyImage = new Image();
let skeletonImage = new Image();
let backgroundImage = new Image();

let fpsInterval = 100/30; // the denominator is frames per second
let now;
let then = Date.now();


// keys 
let moveLeft = false;
let moveRight = false;
let moveDown = false;
let moveUp = false;
let space = false;

//Variables for the game
let respawn = true;

document.addEventListener('DOMContentLoaded', init,false);

function init(){
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    window.addEventListener('keydown',activate,false);
    window.addEventListener('keyup',deactivate,false);

    backgroundImage.src = 'floor.png';
    playerImage.src = 'Fullmain.png';
    enemyImage.src = 'attacking.png'
    skeletonImage.src= 'skeletonattack.png'
    healthImage.src = 'hearts.png'

    player.x = canvas.width/2;
    player.y = canvas.height /2;

    enemy.x = canvas.width/4;
    enemy.y = canvas.height/4;



    draw();
}


function draw(){
    request_id = window.requestAnimationFrame(draw);//I think this is somehow wrong but how cause like the draw should be blue
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval){
        return;
    }
    then = now - (elapsed % fpsInterval);
    if(skeletons.length <5){
        if(respawn){
        let s = {
            x:0,
            y: randint(0, canvas.height),
            width:41,
            height:37,
            xChange: randint(5,1),
            yChange: randint(5,1),
            frameX: 0,
            frameY:0
        };
        skeletons.push(s)
    }
    }
    if (skeletons.length ==5){
        respawn = false;
    }

    context.clearRect(0,0,canvas.widht, canvas.height);
    context.fillStyle='black';//light blue
    context.fillRect(0,0,canvas.width,canvas.height);
    for (let r = 0; r < 20; r += 1) {
        for (let c = 0; c < 32; c += 1) {
            let tile = background[r][c];
            if (tile >= 0) {
                let tileRow = Math.floor(tile / tilesPerRow);
                let tileCol = Math.floor(tile % tilesPerRow);            
                context.drawImage(backgroundImage,
                    tileCol * tileSize, tileRow * tileSize, tileSize, tileSize,
                    c * tileSize, r * tileSize, tileSize, tileSize);
            }
        }
    }


    //player
    context.drawImage (playerImage, player.width *player.frameX, player.height*player.frameY, player.width,player.height,player.x,player.y,player.width,player.height);
    if (moveLeft||moveRight){
        player.frameX = (player.frameX +1)%6;
    }
    //skeletons
    for (let s of skeletons){ 
        context.drawImage(skeletonImage,s.width *s.frameX,s.height * s.frameY,s.width, s.height, s.x,s.y,s.width,s.height)
        s.frameX = 4
    }
    for(let s of skeletons){
        if(player_collides(s)){
            s.frameX = (s.frameX +1)%6;
            player.health = player.health - 1;
            if (player.health===0){
                stop()
            }
        }
    }

    //enemy
    context.drawImage(enemyImage,enemy.width *enemy.frameX,enemy.height * enemy.frameY,enemy.width, enemy.height, enemy.x,enemy.y,enemy.width,enemy.height);
    if (player_collides(enemy)){
        player.health = player.health -1;
        if (player.health<=0){
            stop()
        }
    }

    //hearts
    //This is basically functional but it could be better but thats more to do with the sprite than anything else
    context.drawImage(healthImage,healthBar.width *healthBar.frameX,healthBar.height * healthBar.frameY,healthBar.width, healthBar.height, healthBar.x,healthBar.y,healthBar.width,healthBar.height)
    if (player.health>=50){
        healthBar.frameX = 0
    }else if (player.health>=5){
        healthBar.frameX = 1
    }else{
        healthBar.frameX = 2
    }
    //enemy heart
    context.drawImage(healthImage,enemyHealth.width *enemyHealth.frameX,enemyHealth.height * enemyHealth.frameY,enemyHealth.width, enemyHealth.height, enemyHealth.x,enemyHealth.y,enemyHealth.width,enemyHealth.height)


    if (enemy.x+30>=0){
        enemy.xChange = enemy.xChange *-1;
    }
    if (enemy.x + enemy.width -30 <= canvas.width+10){
        enemy.xChange = enemy.xChange *-1;
    }
    if (enemy.y +30>0){
        enemy.yChange = enemy.yChange *-1;
    }
    if (enemy.y + enemy.height -30< canvas.height){
        enemy.yChange = enemy.yChange *-1;
    }
    // Update main enemy
    enemy.x = enemy.x + enemy.xChange;
    enemy.y = enemy.y + enemy.yChange;
   


    //Update the skeletons
    for (let s of skeletons){
        if (s.x+30>=0){
            s.xChange = s.xChange *-1;
        }
        if (s.x + s.width -30 <= 320){
            s.xChange = s.xChange *-1;
        }
        if (s.y +30>0){
            s.yChange = s.yChange *-1;
        }
        if (s.y + s.height -30< canvas.height){
            s.yChange = s.yChange *-1;
        }
        s.x = s.x + s.xChange;
        s.y = s.y + s.yChange;
    }

    // key presses
    if (moveLeft){
        if(player.x >0){
            player.xChange = player.xChange -0.5; // this will add acceleration if you don't want that hardcode a value to say 10 or whatever
            player.frameY = 2;
        }
    }
    if (moveRight){
        if (player.x +player.width< canvas.width){
            player.xChange = player.xChange + 0.5;
            player.frameY = 1;
        }

    }
    if (moveUp){
        if(player.y >0){
            player.yChange = player.yChange - 0.7;
        }
        
    }
    if (moveDown){
        if(player.y +player.height< canvas.height){
            player.yChange = player.yChange + 0.7;
        }

    }
    if (space){
        player.frameY =5
        for (let s of skeletons){
            if (damage(s)){
                let index = skeletons.indexOf(s);
                skeletons.splice(index,1);
            }  
        }      
        if (damage(enemy)){
            enemy.health = enemy.health - 1;
            if(enemy.health <=0){
                enemy.frameY =2
                enemy.frameX = 2
            }
        }
            
        
        
    }
    // Update the player
    player.x = player.x + player.xChange;
    player.y = player.y + player.yChange;

    //friction
    player.xChange = player.xChange *0.8; // friction
    player.yChange = player.yChange *0.8 // friction


}
function randint(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function activate(event){
    let key = event.key;
    if (key==='ArrowLeft'){
        moveLeft = true;
    }else if (key=== 'ArrowUp'){
        moveUp = true;
    }else if (key=== 'ArrowRight'){
        moveRight = true;
    }else if (key ==='ArrowDown'){
        moveDown= true;
    }else if (key){
        space = true;
    }
}
function deactivate(event){
    let key = event.key;
    if (key==='ArrowLeft'){
        moveLeft = false;
    }else if (key=== 'ArrowUp'){
        moveUp = false;
    }else if (key=== 'ArrowRight'){
        moveRight = false;
    }else if (key ==='ArrowDown'){
        moveDown= false;
    }else if (key){
        space = false;
    }

}

function player_collides(s){
    if (player.x + player.height <s.x-10 || s.x+s.width-10 < player.x || player.y >s.y +s.height-10 || s.y -10> player.y +player.height){
        return false;
    }else {
        return true;
    }
}

function damage(s){
    if (player.x + player.height <s.x-10 || s.x+s.width-10 < player.x || player.y >s.y +s.height-10 || s.y -10> player.y +player.height){
        return false;
    }else{
        return true;
    }
}

function stop (){
    window.removeEventListener('keydown', activate, false);
    window.removeEventListener('keyup',deactivate,false);
    window.cancelAnimationFrame(request_id);
}

