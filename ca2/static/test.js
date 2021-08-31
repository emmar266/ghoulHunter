// I literally have one thing left to do and it just can't do it :(

// Also i think theres a flask problem with just creating an account.
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

let player ={
    x:0,
    y:0,
    width:50,
    height:37,
    frameX:0,
    frameY:0,
    xChange:0,
    yChange:0,
    health:200
}
let healthBar = {
    x:10,
    y:10,
    width: 15,
    height:15,
    frameX:0,
    frameY:0
}
let enemy = [];
let chicken = [];

let enemyHealth = {
    x:490,
    y:10,
    width: 15,
    height:15,
    frameX:0,
    frameY:0
}
let increase_health = [];
let keys = [];
//Images
let playerImage = new Image();
let healthImage = new Image();
let enemyImage = new Image();
let skeletonImage = new Image();
let extraHealthImage = new Image();
let backgroundImage = new Image();
let powerUpImage = new Image();
let keyImage = new Image();

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
let respawnSkeletons = true;
let level = 1;
let respawnEnemy = true;
let won = false;
let oneHealthIncrease = true;
let score = 0;
let respawnChicken = true;
let keyLevel = true;

//sending to the server stuff
let xhttp;
let health_view;


//form
//By default the playing level in medium 
//
let easyMediumHard;
let hero;
let music;

document.addEventListener('DOMContentLoaded', init,false);

function init(){
    canvas = document.querySelector('canvas');
    context = canvas.getContext('2d');
    window.addEventListener('keydown',activate,false);
    window.addEventListener('keyup',deactivate,false);// i have no idea why but this window alert needs to be here or else the thing will not work
    
    get_hero();
    //window.alert('loading');
    
    if (hero){
        if(hero==='blue'){
            playerImage.src = 'static/Fullmain.png';
        }else if (hero ==='knight'){
            playerImage.src = 'static/Knight.png';
        }else if (hero ==='huntress'){
            playerImage.src = 'static/HeroKnight.png'
        }
    }
    load_images(['static/attacking.png','static/key.png','static/chicken.png','static/increase_health.png','static/hearts.png','static/skeletonattack.png','static/attacking.png','static/floor.png'])

    backgroundImage.src = 'static/floor.png';
    //
    enemyImage.src = 'static/attacking.png';
    skeletonImage.src= 'static/skeletonattack.png';
    healthImage.src = 'static/hearts.png';
    extraHealthImage.src = 'static/increase_health.png';
    powerUpImage.src = 'static/chicken.png';
    keyImage.src = 'static/key.png'

    music = new Audio('static/music.mp3');
    music.play();

    player.x = canvas.width/2;
    player.y = canvas.height /2;

    health_view = document.querySelector('#health');

    get_level();
    
    draw();
}


function draw(){
    if (hero==='huntress'){
        player.width = 100;
        player.height = 55;
    }
    request_id = window.requestAnimationFrame(draw);
    let now = Date.now();
    let elapsed = now - then;
    if (elapsed <= fpsInterval){
        return;
    }
    then = now - (elapsed % fpsInterval);
    if(skeletons.length <5){
        if(respawnSkeletons){
        let s = {
            x:randint(0,200),
            y: randint(0, canvas.height),
            width:41,
            height:37,
            xChange:randint(1,2),
            yChange: randint(1,2),
            frameX: 0,
            frameY:0,
            speed:randint(2,4)
        };
        skeletons.push(s);
    }
    }
    if (skeletons.length ===5){
        respawnSkeletons = false;
    }
    //This should make sure there is only one increase of health available per level 
    if(increase_health<1){
        if(oneHealthIncrease){
        let i = {
            x:randint(10,500-10),
            y: randint(10,320-10),
            width:15,
            height:15,
            frameX:0,
            frameY:0
        };
        increase_health.push(i);
        oneHealthIncrease = false;
    }
    }
    if (keys <1){
        if(keyLevel){
        let k ={
            x:randint(10,500),
            y: randint(10,310),
            width:40,
            height: 40,
            frameX:0,
            frameY:0
        };  
        keys.push(k);
    }

    }

    for (let i=0; i<level; i+=1){
        if (respawnEnemy){
            let e = {
                x: 0,
                y: randint(0,canvas.height-100),
                width: 100,
                height: 100,
                xChange:randint(1,2),
                yChange: randint(1,2),
                frameX: 0,
                frameY:0,
                health: 100,
                speed:randint(0.5,3)
            };
        enemy.push(e);
        }
    }
    if (easyMediumHard==='hard' && respawnChicken){
        for(let i =0; i< 1; i +=1){
                let c = {
                    x:randint(10,400),
                    y: randint(50,200),
                    width:32,
                    height:32,
                    xChange:randint(0.5,2),
                    yChange: randint(0.5,2),
                    frameX:0,
                    frameY:0,
                    speed: randint(1,3)
                };
            chicken.push(c);
           
            
        }
    }
    if (chicken.length ===1){
        respawnChicken = false;
    }


    if (enemy.length ==level){
        respawnEnemy = false;
    }

    context.clearRect(0,0,canvas.widht, canvas.height);
    if (easyMediumHard=== 'easy'){
        context.fillStyle='black';//light blue
        context.fillRect(0,0,canvas.width,canvas.height); 
    }else if(easyMediumHard ==='medium'){
        context.fillStyle = 'red';
        context.fillRect(0,0,canvas.width,canvas.height); 
    }else if (easyMediumHard==='hard'){
        context.fillStyle = 'green';
        context.fillRect(0,0,canvas.width,canvas.height); 

    }

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
        context.drawImage(skeletonImage,s.width *s.frameX,s.height * s.frameY,s.width, s.height, s.x,s.y,s.width,s.height);
        s.frameX = 4;
    }
    for(let s of skeletons){
        if(damage(s)){
            s.frameX = (s.frameX +1)%6;
            player.health = player.health - 1;
        }
        if (player.health===0){
            stop()
            loseMessage()

        }
    }
    //chicken power up
    if (easyMediumHard ==='hard'){
        for (let c of chicken){
            c.frameX = (c.frameX +1)%3;

            c.x = c.x + c.xChange *c.speed;
            c.y = c.y + c.yChange* c.speed;  

            }
        }
    

    //enemy
    for(let e of enemy){
        context.drawImage(enemyImage,e.width *e.frameX,e.height * e.frameY,e.width, e.height, e.x,e.y,e.width,e.height); 
        if (player_collides(e)){
            if (easyMediumHard==='easy'|| easyMediumHard==='medium'){
                player.health = player.health -2;
            }else if (easyMediumHard==='hard'){
                player.health = player.health -3;
            }
            
        }
        if (player.health<=0){
            stop()
            loseMessage()
        
        }
    }
    if (easyMediumHard==='hard'){
        for(let c of chicken){
            context.drawImage(powerUpImage,c.width *c.frameX,c.height * c.frameY,c.width, c.height, c.x,c.y,c.width,c.height) 
    }
 
    }
    //hearts
    //This is basically functional but it could be better but thats more to do with the sprite than anything else
    context.drawImage(healthImage,healthBar.width *healthBar.frameX,healthBar.height * healthBar.frameY,healthBar.width, healthBar.height, healthBar.x,healthBar.y,healthBar.width,healthBar.height)
    if (player.health>=100){
        healthBar.frameX = 0;
    }else if (player.health>=5){
        healthBar.frameX = 1;
    }else{
        healthBar.frameX = 2;
    }
    //context.drawImage(healthImage,enemyHealth.width *enemyHealth.frameX,enemyHealth.height * enemyHealth.frameY,enemyHealth.width, enemyHealth.height, enemyHealth.x,enemyHealth.y,enemyHealth.width,enemyHealth.height)

    for (let e of enemy){
        if (e.x+30>=0){
            e.xChange = e.xChange *-1;
        }
        if (e.x + e.width -30 <= canvas.width+10){
            e.xChange = e.xChange *-1;
        }
        if (e.y +30>0){
            e.yChange = e.yChange *-1;
        }
        if (e.y + e.height -30< canvas.height){
            e.yChange = e.yChange *-1;
        }
        // Update main enemy
        e.x = e.x + e.xChange *e.speed;
        e.y = e.y + e.yChange* e.speed;  
        }

    for (let e of enemy){
        if(e.x - player.x< 10){
            e.frameX = (e.frameX +1)%6;
        }
    }
    //Update the skeletons

    for (let s of skeletons){
        if (s.x+30>=0){
            s.xChange = s.xChange *-1
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
        s.x = s.x +s.xChange*s.speed;
        s.y = s.y +s.yChange* s.speed;

    }

    // key presses
    if (moveLeft){
        if(player.x >0){
            player.xChange = player.xChange -0.5; // this will add acceleration if you don't want that hardcode a value to say 10 or whatever
            if(hero==='huntress'){
                player.frameY = 1;
            }else{
                player.frameY = 2;
            }
 
        }
    }
    if (moveRight){
        if (player.x +player.width< canvas.width){
            player.xChange = player.xChange + 0.5;
            if (hero==='huntress'){
                player.frameY =1;
            }else {
                player.frameY = 1;
            }
            

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
        if (hero==='blue'){
           player.frameY =5; 
        }else if(hero==='knight'){
            player.frameY = 7;
        }else if (hero==='huntress'){
            player.frameY = 3;
        }
        
        for (let s of skeletons){
            if (damage(s)){
                let index = skeletons.indexOf(s);
                skeletons.splice(index,1);
                score = score +1;
            }  

        }  

        if(easyMediumHard ==='hard'){
            for (let c of chicken){
                if (damage(c)){
                    let index4 = chicken.indexOf(c);
                    chicken.splice(index4,1);
                    enemy.length = 0;
                    score = score +10
                    
                }
            }
        }


        for (let e of enemy){
            if (damage(e)){
                if (easyMediumHard ==='easy'){
                    e.health = e.health - 2;
                }else if (easyMediumHard ==='medium' || easyMediumHard === 'hard'){
                    e.health = e.health -1;
                }
                
                if(e.health <=0){
                    let enemyIndex = enemy.indexOf(e);
                    enemy.splice(enemyIndex,1);
                    score = score +4;
                }
            }
        }
    }      

    // Update the player
    if (hero==='huntress'){
        player.x = player.x + player.xChange *.30;
        player.y = player.y + player.yChange *.30;
    }else{
        player.x = player.x + player.xChange;
        player.y = player.y + player.yChange;
    }


    //friction
    player.xChange = player.xChange *0.8; // friction
    player.yChange = player.yChange *0.8; // friction


    
    //Is the level complete
    //gonna have to do some work with the health etc
    if (skeletons.length==0&& oneHealthIncrease){
        for(let i of increase_health){
            context.drawImage(extraHealthImage,i.width *i.frameX,i.height * i.frameY,i.width, i.height, i.x,i.y,i.width,i.height);
            if(damage(i)){
            player.health = player.health +50;
            let index3 = increase_health.indexOf(i);
            increase_health.splice(index3,1);
        }
 
        }
    }
    if (enemy.length==0){
        for (let k of keys){
            context.drawImage(keyImage,k.width *k.frameX,k.height * k.frameY,k.width, k.height, k.x,k.y,k.width,k.height);
            if (damage(k)){
                level = level+1;
                respawnEnemy = true;
                respawnSkeletons= true;
                player.health = 500;
                oneHealthIncrease= true;
                respawnChicken = true;
                chicken.length = 0;
            }
        }
    }

    health_view.innerHTML = easyMediumHard + ' ' + hero;

    if (level === 9){
        stop()
        endCredits()
    }

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
//both player_collides and player damage are first checking if they didn't collide which i did not realise so to get the stuff i want working i might need to write an entirely new player collides 
// I'm going to set this one
function player_collides(s){
    if ((player.x )+ player.height-10 <s.x+10 || s.x+(s.width)-40 < player.x +10|| player.y >s.y +(s.height )|| s.y > player.y +player.height){
        return false;
    }else {
        return true;
    }
}

function damage(s){
    if (player.x + player.height <s.x || s.x+s.width < player.x || player.y -10>s.y +s.height +10|| s.y+10> player.y +player.height-10){
        return false;
    }else{
        return true;
        
    }
}

function stop (){
    window.removeEventListener('keydown', activate, false);
    window.removeEventListener('keyup',deactivate,false);
    window.cancelAnimationFrame(request_id);

    let data = new FormData();
    data.append('score',score);

    xhttp = new XMLHttpRequest();
    xhttp.addEventListener('readystatechange',handle_response,false);
    //
    xhttp.open('POST','/~er12/cgi-bin/ca2/run.py/store_score',true);
    xhttp.send(data);
}
function endCredits(){
    context.font = '15px Comic sans';
    context.fillStyle = 'red';
    context.fillText('You won',200,70);
    context.font = '10px Comic sans';
    context.fillText('I would like to formally thank w3schools for being the only functional thing in my life',40,150);
    context.fillText("To javascript i would like to say, You shouldn't exist and i hate you",40,160);
    context.fillText("To stackoverflow, you've left me down significantly. I don't know what jQuery is and no I'm not allowed to use it",40,170);
}
function loseMessage(){
    context.font =' 15px Comic sans';
    context.fillStyle = 'red';
    context.fillText('Game over',200,150);
    context.font = '10px Comic sans';
    context.fillStyle = 'red';
    context.fillText('You suck', 210,160);
}


function handle_response(){
    if (xhttp.readState ===4){
        if(xhttp.status ===200){
            if(xhttp.responseText ==='success'){
                window.alert('Your score was successfully stored');
            }else {
                window.alert("I'm sorry your score was not saved. It could be a problem with our code or youre just stupid");
            }

        }
    }
}

function get_level(){
    xhttp = new XMLHttpRequest();
    xhttp.addEventListener('readystatechange',handel_response2,false);
    ///
    xhttp.open('GET','/~er12/cgi-bin/ca2/run.py/level', true);
    xhttp.send(null);
}
//query
function handel_response2(){
    if (xhttp.readyState ===4){
        if (xhttp.status===200){
            if (xhttp.responseText =='easy'){
                easyMediumHard = 'easy';
            }else if(xhttp.responseText =='medium'){
                easyMediumHard = 'medium';
           }else if(xhttp.responseText =='hard'){
                easyMediumHard = 'hard';
            }
            }
        return easyMediumHard;
        }
    }

function get_hero(){
    xhttp = new XMLHttpRequest();
    xhttp.addEventListener('readystatechange',handel_response3,false);
    ////
    xhttp.open('GET','/~er12/cgi-bin/ca2/run.py/hero', false);
    xhttp.send(null);
}
function handel_response3(){
    if (xhttp.readyState===4){
        if(xhttp.status===200){
            if(xhttp.responseText =='blue'){
                hero = 'blue';
            }else if (xhttp.responseText =='knight'){
                hero = 'knight';
            }else if (xhttp.responseText =='huntress'){
                hero = 'huntress';
            }
        }
    }
}
async function load_images(urls) {
    let promises = [];
    for (let url of urls) {
        promises.push(new Promise(resolve => {
            let img = new Image();
            img.onload = resolve;
            img.src = url;
        }));
    }
    await Promise.all(promises); 
}