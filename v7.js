const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");



let screensx = canvas.width;
let screensy = canvas.height;

let midx = screensx/2;
let midy = screensy/2;



let playerxv = 0;
let playeryv = 0;
let psx = 0.75;
let psy = 0.96;
let playerdir = 0;
let animate = 0;


document.addEventListener("keydown", checkDown);
document.addEventListener("keyup", checkUp);

const keys = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function checkDown(e){
    switch (e.keyCode){
        case 87: keys[0] = 1; break; //w
        case 83: keys[1] = 1; break; //s
        case 65: keys[2] = 1; break; //a
        case 68: keys[3] = 1; break; //d
        case 69: keys[4] = 1; break; //e
        case 81: keys[5] = 1; break; //q
        case 37: keys[6] = 1; break; //left
        case 39: keys[7] = 1; break; //right
        case 38: keys[8] = 1; break; //up
        case 40: keys[9] = 1; break; //down

        default: break;
    }
}
function checkUp(e){
    switch (e.keyCode){
        case 87: keys[0] = 0; break; //w
        case 83: keys[1] = 0; break; //s
        case 65: keys[2] = 0; break; //a
        case 68: keys[3] = 0; break; //d
        case 69: keys[4] = 0; break; //e
        case 81: keys[5] = 0; break; //q
        case 37: keys[6] = 0; break; //left
        case 39: keys[7] = 0; break; //right
        case 38: keys[8] = 0; break; //up
        case 40: keys[9] = 0; break; //down
        
        default: break;
    }
}
function fillbox(sx, sy, lx, ly, type){
    let prob = 0;
    for(let y = sy; y < sy+ly; y++){
        for(let x = sx; x < sx+lx; x++){
            if(Math.random()>prob*prob*prob){
                level[y*worldlen+x] = type;
            }
        }
        prob += 0.1;
    }

}


let level = [];
let type = [];
let ropex = [];

function createropes(num){
    for(let i = 0; i < num; i++){
        ropex[i] = Math.random()*worldlen;
    }
}

function chain(sx, sy){
    for(let y = sy; y > 0; y--){
        if(level[y*worldlen+sx] == 0){
            level[y*worldlen+sx] = 5;
        }
    }
}


function worldgen(sx, sy){
    let i = 0;
    for(let x = 0; x < worldlen; x++){
        level[i] = 1;
        i++;
    }
    for(let y = 1; y < worldheight-1; y++){
        level[i] = 1;
            i++;
        for(let x = 1; x < worldlen-1; x++){
           level[i] = 0;
            i++;
        }
        level[i] = 1;
            i++;
    }
    for(let x = 0; x < worldlen; x++){
        level[i] = 1;
        i++;
    }
    let currentx = sx;
    let currenty = sy;
    let change = 0;
    let change2 = 0;
    let change3 = 0;
    while(currentx < worldlen - 10){
        change = Math.random()*8+1;
        fillbox(Math.round(currentx), Math.round(currenty), change, Math.round(Math.random()*10)+1, Math.round(Math.round(Math.random()*2+1)));
        let t = Math.random()
        if(t > 0.3){
            chain(Math.round(currentx), Math.round(currenty));
        }
        
        change3 = Math.random()*3-2;
        change2 = 1+Math.random()*5;
        if(Math.random()>0.8){
            change2 = 10+Math.random()*5;
        }
       
        if(change2+change3 > 7){
            if(level[Math.round(currenty)*worldlen+(Math.round(currentx))+Math.round(change)]==0){
                if(t > 0.3){
                    chain((Math.round(currentx-2))+Math.round(change), Math.round(currenty-1));
                }
                level[Math.round(currenty-1)*worldlen+(Math.round(currentx-1))+Math.round(change)] = 4;
                
            }else{
                if(t > 0.3){
                    chain((Math.round(currentx-1))+Math.round(change), Math.round(currenty-1));
                }
                level[Math.round(currenty-1)*worldlen+(Math.round(currentx))+Math.round(change)] = 4;
               
            }
            
        }else{
            if(t > 0.3){
                if(level[Math.round(currenty)*worldlen+(Math.round(currentx))+Math.round(change)]==0){
                    chain((Math.round(currentx-1))+Math.round(change), Math.round(currenty-1));
                }else{
                    chain((Math.round(currentx))+Math.round(change), Math.round(currenty-1));
                }
            }
        }
       
        if(change > 2 && Math.random()>0.5){
            level[Math.round(currenty-1)*worldlen+(Math.round(currentx))+(Math.round(1+(change-3)*Math.random()))] = 6;
        }
        
        currentx += change + change2;
        currenty += change3;
    }

}

function renderropes(){
    for(let i = 0; i < ropex.length; i++){
        let depth = (i*103.254)%1.2+0.5;
        if(depth > 1){
            let tx = (ropex[i]-camx)*zoom;
            tx = tx/depth + midx;
            let id = Math.round((i*13.8)%5);
            let dd = (depth);
            for(let y = ((screensy-zoom)/-2)-((camy*zoom)-(screensy/2))%(2*zoom/dd)-zoom+midy; y < screensy; y += 2*zoom/dd){
                ctx.drawImage(ropesheet, id*18+0.1, 0, 17.8, 36, tx, y, zoom*1.01/dd, zoom*2.02/dd);
            }
        }
    }
}

function renderropes2(){
    for(let i = 0; i < ropex.length; i++){
        let depth = (i*103.254)%1.2+0.5;
        if(depth < 1){
            let tx = (ropex[i]-camx)*zoom;
            tx = tx/depth + midx;
            let id = Math.round((i*13.8)%5);
            let dd = (depth);
            for(let y = ((screensy-zoom)/-2)-((camy*zoom)-(screensy/2))%(2*zoom/dd)-zoom+midy; y < screensy; y += 2*zoom/dd){
                ctx.drawImage(ropesheet, id*18+0.1, 0, 17.8, 36, tx, y, zoom*1.01/dd, zoom*2.02/dd);
            }
        }
    }
}


function binary(a, b, c, d){
    return (a + 2*b + 4*c + 8*d);
}

function typegen(){
    for(let i = 0; i < worldlen*worldheight; i++){
        type[i] = 0;
        if(level[i] != 0 && level[i] < 4){
            let key = level[i];
            let bin = binary(level[i-1]==key, level[i+1]==key, level[i+worldlen]==key, level[i-worldlen]==key, );
            if(key == 1 && Math.random()>0.5){
                bin+=16;
            }
            type[i] = bin;
        }
        if(level[i]==6){
            type[i] = Math.round(Math.random()*6);
        }
    }
}

function camcontrol(){
    camx = camx+(playerx-camx)*0.05;
    camy = camy+(playery-camy)*0.05;
    let tz = 60-(80*Math.abs(playerxv)+Math.abs(playeryv));
    //zoom += zoom*0.02*(keys[4]-keys[5]);
    zoom = zoom+(tz-zoom)*0.1;
    if(camx<(screensx/2+0.01)/zoom){
        camx = (screensx/2+0.01)/zoom;
    }
    if(camx>(worldlen*zoom-screensx/2)/zoom){
        camx = (worldlen*zoom-screensx/2)/zoom;
    }
    if(camy < (screensy/2+0.01)/zoom){
        camy = (screensy/2+0.01)/zoom;
    }
    if(camy > (worldheight*zoom-screensy/2)/zoom){
        camy = (worldheight*zoom-screensy/2)/zoom;
    }
}

function playercontrol(){
    playery += playeryv;
    let tground = 0;

    for(y = Math.round(playery-1); y < Math.round(playery+2); y++){
        for(x = Math.round(playerx-1); x < Math.round(playerx+2); x++){
            let t = level[y*worldlen+x];
            if(t != 0 && t < 4){
                let dy = Math.abs((y+0.5)-playery);
                if((0.5+psy/2)-dy > 0 && Math.abs(playerx-(x+0.5)) < 0.5+(psx/2)){
                    playeryv = 0;
                    if(y+0.5-playery > 0){
                        playery += 1.01*(dy-(0.5+psy/2));
                        tground = 1;
                    }else{
                        playery -= 1.01*(dy-(0.5+psy/2));
                    }
                    break;
                }
            }
        }
    }
    playerx += playerxv;
    for(y = Math.round(playery-1); y < Math.round(playery+2); y++){
        for(x = Math.round(playerx-1); x < Math.round(playerx+2); x++){
            let t = level[y*worldlen+x];
            if(t != 0 && t < 4){
                let dx = Math.abs((x+0.5)-playerx);
                if((0.5+psx/2)-dx > 0.00 && Math.abs(playery-(y+0.5)) < 0.5+(psy/2)){
                    playerxv = 0;
                    if(x+0.5-playerx > 0){
                        playerx += dx-(0.5+psx/2);
                    }else{
                        playerx -= dx-(0.5+psx/2);
                    }
                    break;
                }
            }
        }
        
    }
    playerxv = (0.93-0.4*tground)*(playerxv + (0.013+(tground*0.12))*(keys[3]-keys[2]));
    playeryv = 0.97*(playeryv+0.01);
    if((keys[3]||keys[2])&&!(keys[3]&&keys[2])){
        playerdir = (keys[3]-keys[2])/2+0.5;
    }
    if(tground&&keys[0]){
        playeryv = -0.3;
    }
    if(Math.abs(playerxv) > 0.1 && tground){
        animate++;
    }
    let tid = Math.round(playery-1)*worldlen+Math.round(playerx-0.75);
    if(level[tid]==4){
        playeryv = -0.6;
        playerxv *= 2.2;
        type[tid] = 1;
    }
    if(playery > lavaheight+0.5){
        dead = 1;
    }
}

function ragdoll(){
    playerx += playerxv;
    playery += playeryv;
    playerxv *= 0.98;
    playeryv = 0.94*(playeryv+0.01);
    if(playery > lavaheight){
        playeryv -= 0.015;
    }
}


function grid(){
    let i = Math.floor((camy*zoom-screensy/2)/zoom)*worldlen+(Math.floor((camx*zoom-screensx/2)/zoom));
    a = (screensx-zoom)/-2 - ((camx*zoom)-(screensx/2))%zoom;
    let b = worldlen-Math.ceil(screensx/zoom+1);
    
    let r1 = 0;
    
    let y = ((screensy-zoom)/-2)-((camy*zoom)-(screensy/2))%zoom;
    
    while(r1 < Math.ceil(screensy/zoom+1) ){
        let r2 = 0;
        let x = a;
        while(r2 < worldlen-b){
            if(level[i] != 0){
                ctx.drawImage(spritesheet, type[i]*18+0.1, (level[i]-1)*18+0.1, 17.8, 17.8, x+midx-zoom*0.5, y+midy-zoom*0.5, zoom*1.01, zoom*1.01);
            }
            if(level[i] == 4 && Math.random() > 0.8){
                type[i] = 0;
            }
            x+=zoom;
            r2++;
            i++;
        }
        y+=zoom;
        r1++;
        i+=b;
    }

}

function renderbackground(){
    ctx.fillStyle = 'rgb(223, 246, 245)'
    ctx.fillRect(0, 0, screensx, screensy);
    for(let x = (camx*-25)%576; x < screensx; x+=576){
        ctx.drawImage(background, 0, 0, 1152, 1440, x, -8*playeryv+midy, 1152, 1440);
    }
}

function renderlava(){
    ctx.fillStyle = 'rgb(255, 0, 0';
    let x =((screensx-zoom)/-2)-((camx*zoom)-(screensx/2))%(2*zoom)-zoom+midx;
    let a = (lavaheight-camy)*zoom+midy;
    while(x < screensx){
        let y = a;
        while(y < screensy){
            ctx.drawImage(lavasheet, Math.round((time/32)%1)*18, (y!=a)*18, 18, 18, x, y, zoom*1.01, zoom*1.01);
            y+=zoom;
        }
        x+=zoom;
    }
    
}


const spritesheet = new Image();
const playersheet = new Image();
const ropesheet = new Image();
const background = new Image();
const lavasheet = new Image();
winscreen = new Image();
spritesheet.src = "tiles.png";
playersheet.src = "player.png";
ropesheet.src = "ropes.png";
background.src = "background.png";
lavasheet.src = "lava.png";
winscreen.src = "win.png";


ctx.imageSmoothingEnabled = false;

let worldlen = 200;
let worldheight = 50;

let lavaheight = worldheight-10;

let playerx = 10;
let playery = worldheight-22;
let zoom = 50;

let dead = 0;

worldgen(10, worldheight-20);
typegen();
createropes(45);
let time = 0;
let camx = playerx;
let camy = playery;
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if(dead){
        ragdoll();
    }else{
        playercontrol();
    }

    camcontrol();

    renderbackground();

    renderropes();

    grid();

    ctx.fillStyle = 'rgb(235, 235, 245)'

    if(dead){
        ctx.drawImage(playersheet, 48, playerdir*24, 24, 24, (playerx-camx-0.96*0.5)*zoom+midx, (playery-camy-psy*0.5)*zoom+midy, 0.96*zoom, psy*zoom);
    }else{
        ctx.drawImage(playersheet, Math.round(animate/8)%2*24, playerdir*24+0.1, 24, 23.9, (playerx-camx-0.96*0.5)*zoom+midx, (playery-camy-psy*0.5)*zoom+midy, 0.96*zoom, psy*zoom)
    }

    renderlava();

    renderropes2();
    time++;
    lavaheight-=0.01;
    requestAnimationFrame(draw);
    if(playerx > worldlen - 10){
        dead = 1;
        ctx.fillStyle = 'rgb(0, 25, 125';
        ctx.fillRect(0, 0, screensx, screensy);
        ctx.drawImage(winscreen, 0, 0, screensx, screensy);
    }
}
draw();
