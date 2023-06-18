/** Load event waits for all assets such as 
 * spritesheet to be fully loaded before it executes
 *  code in it's call back function 
 * All game code will be located in this function*/
 window.addEventListener('load', function(){

    const canvas = document.getElementById('canvas1');

    const ctx = canvas.getContext('2d'); //ctx is instance of built-in 2D canvas API that holds all the drawing methods and properties we need to animate the game

    canvas.width = 800;
    canvas.height = 720;

    // Manage keyboard inputs apply listener events to keys
    class InputHandler{
        constructor(){
            this.keys = [];
            window.addEventListener('keydown',e=>{  //add key that is currently pressed to an array
                if( (e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight') && this.keys.indexOf(e.key) === -1){ 
                    this.keys.push(e.key)
                }

            })
            window.addEventListener('keyup', e => { //remove key that is unpressed from array
                if (e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight') {
                    this.keys.splice(this.keys.indexOf(e.key),1)
                }

            })
        }
 
    }

    //React to keys 
    class Player{

        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            this.x = 50;
            this.y = this.gameHeight - this.height; //puts player at the button of canvas
            this.image = document.getElementById('playerImage')
            this.frameX = 0;
            this.frameY = 0;
            this.speed = 0;
            this.vy = 0; // velocity on y axis
            this.weight = 1; //gravity
        }


        draw(context) {
            context.fillStyle = 'white'
            context.fillRect(this.x, this.y, this.width, this.height); //draw rectangle representing player

            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }


        update(input){

            if(input.keys.indexOf('ArrowRight')> -1){
                this.speed = 5;

            } else if (input.keys.indexOf('ArrowLeft') > -1){
                this.speed = -5;

            } else if (input.keys.indexOf('ArrowUp') > -1 && this.Onground()) {
                this.vy -= 30;

            }
            else{
                this.speed = 0;
            }
            //horizontal movement
            this.x += this.speed;
            if(this.x < 0) this.x = 0;
            else if(this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width

            //vertical movement
            this.y += this.vy;

            if (!this.Onground()){
                this.vy += this.weight;
                this.frameY = 1; //change sprite  to jumping action
            } else{
                this.vy = 0;
                this.frameY = 0; //change sprite back to default
            }

            if(this.y > this.gameHeight - this.height){
                this.gameHeight - this.height;
            }
        }


        /*************** Utility method to check if player is on the ground or not */
        Onground(){
            return this.y >= this.gameHeight - this.height;
        }

      

    }

     //Handle infinite scroll background
     class Background {

     }

     //Generate enemies
     class Enemy {

     }

     //Responsible for adding animating and removing enemeis
     function handleEnemy(){

     }

     //Display texts in-game
     function displayStatusText(){

     }

     //instance of InputHandler that runs all the code in its constructor
     const input = new InputHandler();

     //Create instance of player
     const player = new Player(canvas.width, canvas.height);

    

     //main animation loop runs 60 times per second
     function animate() {
         ctx.clearRect(0,0,canvas.width, canvas.height)//delete entire canvas between each animation loop
         player.draw(ctx)
         player.update(input);
         requestAnimationFrame(animate); //creates endless animation loop


     }

     animate();
 })