//Adding map global variables

let w = 87;
let a = 65;
let s = 83;
let d = 68;


let tilemap = [];
let numDown = 10;
let numAcross = 10;
let tileSize = 50;
let textures = [];


let graphicMap = [ 

  //Adding images to the map
  //Our plan is to have around 4 different maps - each time the player completes one map
  //The screen scrolls to the next map and so on.

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],   
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]  
]

let tileRules = [
    
    //The collisions - in this case hedges

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
    [1, 1, 1, 1, 1, 1, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],  
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0], 
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0]  
]

//Adding player variables (mouse)

let player; 
let playerSprite;
let playerSpeed = 5;
let playerSize = tileSize;

//Adding enemy variables (our cats)

let catSprite1;
//We will have multiple cat enemies just have yet to put them in yet.
//Cats will move randomly around the screen and aim is to avoid them - collison = reset to start of maze.
let cat1;
let cats = [];
let catSize = 1;
let catSpeed = 3;
let numCats = 3;


//movement?
//Still a work in progress as we haven't able to get the mouse to move as planned yet.
let draww = false;

//Loading in our art sprites
//These are just prototypes for now, we will be finalising the sprites and 
//Adding more variety (e.g different coloured cats etc) and planning to add more levels 
//With different images.

function preload() {
    textures[0] = loadImage("grass.path.jpg");
    textures[1] = loadImage("hedge.collison.jpg");

    //Loading in our player sprite
    //Need to still make our mouse a png image to take out the white background
    playerSprite = loadImage("player.mouse.jpg");
    catSprite1 = loadImage("ginger.cat.jpg");
}


function setup() {
    createCanvas(500, 500);

    let tileID = 0; //Unsure what this means 

//Creating our tiles with the for loop

for (let across = 0; across < numAcross; across++) {
tilemap[across] = [];
for (let down = 0; down < numDown; down++) {

// let x = across * tileSize; // multiplies across value by tileSize to get pixel position on x axis
// let y = down * tileSize; // multiplies down value by tileSize to get pixel position on y axis
// //Setting Texture For Tile

let textureNum = graphicMap[down][across];

tilemap[across][down] = new Tile(textures[textureNum], across, down, tileSize, tileID); 

tileID++;
}}
player = new Player (playerSprite, 0,0, tileSize, playerSpeed, tileSize, tileRules);

//Tile creation finished
//Numbers 0,0 specify the starting location for our player sprite.

// cat1 = new Enemy(catSprite1, 0, catSize);
   
// for (let i = 0; i < numCats; i++) {
//       cats[i] = new Enemy(catSprite1, catSize,
//                              random(0, width),
//                              random(0, height),
//                              catSize,
//                              catSpeed);
//     }
// }

//Have taken this out for now as we were not able to get our cat to an appropriate size even when we
//changed around the settings, something we still need to figure out.

}




function draw() {
    background(0);
    
    
    // Loops through all tiles each time draw() is called
    for (let across = 0; across < numAcross; across++) {
        for (let down = 0; down < numDown; down++) {
            tilemap[across][down].display(); // runs display() method for each tile
            tilemap[across][down].debug(); // runs debug() method for each tile
        }
    }


    // cat1.display();
   

    // cats[3].display();

    
    // for (let i = 0; i < numCats; i++) {
    //     cats[i].display();
      
    // }

  


// Player methods we want to run once per frame

player.display();
player.move();

}



function keyPressed(){
    player.setDirection();

}


class Player {
    constructor(sprite, startAcross, startDown, size, speed, tileSize, tileRules){
        this.sprite = sprite;
        this.across = startAcross;
        this.down = startDown;
        this.size = size;
        this.speed = speed;
        this.tileRules = tileRules;
        this.tileSize = tileSize;
        this.xPos = this.across * tileSize;
        this.yPos = this.down * tileSize;
        this.dirX = 0;
        this.dirY = 0;
        this.isMoving = false;
        this.tx = this.xPos;
        this.ty = this.yPos;
    
    }


    //Code for movement of player sprite
    setDirection (){

        if (keyIsDown("65")) {
            this.dirX = -1;
            this.dirY = 0;
        }

        if (keyIsDown("68")) {
            this.dirX = 1;
            this.dirY = 0;
        }

        if (keyIsDown("87")) {
            this.dirX = 0;
            this.dirY = -1;
        }

        if (keyIsDown("83")) {
            this.dirX = 0;
            this.dirY = 1;
        }

        //We have discovered an error here where the mouse starts to move continously however the collisions disappear.


        //We plan to make it so when the key is held down the player moves
        //Continously but haven't been able to make it work yet so this is still a work
        //In progress.
        
        // To Check if we are NOT currently moving
        //if(!this.isMoving) {
            //if not, then we set direction player is travelling
     
            //UP
            // if (key == "w"){
                
            //     this.dirX = 0;
            //     this.dirY = -1; //Direction is UP
            //     draww = true;
            // }
    
            //DOWN
            // if (key == "s"){
            //     this.dirX = 0;
            //     this.dirY = 1; //Direction is DOWN
            // }
    
            //LEFT
        //     if (key == "a"){
        //         this.dirX = -1;
        
        //         this.dirY = 0; //Direction is LEFT
        //   }
    
            //RIGHT
            // if (key == "d"){
            //     this.dirX = 1;
            //     this.dirY = 0; //Direction is RIGHT
            // }

        //Above but commented out is our original code to move the mouse when w a s d is clicked.
        
    
        this.checkTargetTile(); 
    
            
        }

                
//Start by checking the position of the player object
//Previously we have got our pixel position from across and down values
//By multiplying across or down by the tileSize.
//This time we are reversing this by trying to get our across and down
//Values from our pixel position. So we want to DIVIDE our current pixel position by tileSize.

//Using Math.floor() function to round to nearest whole number
checkTargetTile() {


    this.across = Math.floor(this.xPos / this.tileSize);
    this.down = Math.floor(this.yPos / this.tileSize);


    //Next we work out tile player is going towards.
    
    let nextTileHorizontal = this.across + this.dirX;
    let nextTileVertical = this.down + this.dirY;


    
    if (
        nextTileHorizontal >= 0 && //top of map
        nextTileHorizontal < numAcross && //bottom of map
        nextTileVertical >= 0 && //left edge of map
        nextTileVertical < numDown // right edge of map
    
    // != MEANS NOT EQUAL TO
    ) {

        //If it is in bounds, have it set as moveable in our ruleMap:
    if (this.tileRules[nextTileVertical][nextTileHorizontal] !=1)  {
    
        //if the target is walkable, then...
        //Calculate the precise x and y coordinate of the target tile
    this.tx = nextTileHorizontal * this.tileSize;
    this.ty = nextTileVertical * this.tileSize;
    
        this.isMoving = true;
        
            }
        }
    }
        
    
move() {
    //This is in our draw loop, so called move() is called every frame BUT
    if (this.isMoving) {
        //This code block will only activate when this.isMoving = true. Otherwise nothing happens.
        //So first, start by moving in direction set by setDirection()
    
    this.xPos += this.speed * this.dirX;
    this.yPos += this.speed * this.dirY;

    //One final if statement to check if, after moving, player has reached target tile.

if (this.xPos === this.tx && this.yPos === this.ty) {  /// === means TRUE EQUIVALENCE, are these two values EQUIVALENT/the same
// If there, stop moving and reset our variables.
this.isMoving = false;
this.dirX = 0;
this.dirY = 0;
}
    }
}

display() {
    imageMode(CORNER);
    image(this.sprite, this.xPos, this.yPos, this.size, this.size);
}
}
    
class Tile {
    constructor(texture, across, down, tileSize, tileID) { // we've added a texture parameter at the beginning of our class
        this.texture = texture; 
        this.across = across;
        this.down = down;
        this.xPos = across * tileSize;
        this.yPos = down * tileSize;
        this.tileSize = tileSize;
        this.tileID = tileID;
    }

 display() {
        //Displays the texture of instance of NPC class
        noStroke();
        image(this.texture, this.xPos, this.yPos, this.tileSize, this.tileSize)
    }



    debug() {
        //TILE
        stroke(245);
        noFill();
        rect(this.x, this.y, this.tileSize, this.tileSize);

        //LABEL
        noStroke();
        fill(255);
        textAlign(LEFT, TOP);
        
        text(this.tileID, this.x, this.y);
    }
    
    }

    // class Enemy {
    //     constructor(sprite, x, y, size) {
    //         this.sprite = sprite; //tells it to store a sprite image <3
    //         this.x = x;
    //         this.y = y;
    //         this.size = size;
    //         this.added; 
    //     }
      
    //     move() {
    //         this.x += this.speed; // += means add this to this (this.x new value = this.x + this.speed)
    //     }   
        
    //     display() {
    //       image(this.sprite, this.x, this.y, this.size);
    //     }
    //   }