'use strict';class Prize{constructor(a=new Game){this.game=a,this.theBiggerOneArr=[]}createBiggerOne(){0===this.game.prize.theBiggerOneArr.length&&(this.game.prize.theBiggerOneArr=[{x:2*this.game.unit,y:4*this.game.unit,w:2*this.game.unit,h:2*this.game.unit},{x:15*this.game.unit,y:4*this.game.unit,w:2*this.game.unit,h:2*this.game.unit},{x:2*this.game.unit,y:15*this.game.unit,w:2*this.game.unit,h:2*this.game.unit},{x:15*this.game.unit,y:15*this.game.unit,w:2*this.game.unit,h:2*this.game.unit}])}checkRandomFood(a,b){for(let c=0,d=a.length;c<d;c++)if(this.foodCollision(a[c],b))return!0;return!1}foodCollision(a,b){return a.x===b.x&&a.y===b.y||a.x===b.x&&a.y+this.game.unit===b.y+b.h||a.x+this.game.unit===b.x+b.w&&a.y===b.y||a.x+this.game.unit===b.x+b.w&&a.y+this.game.unit===b.y+b.h}update(){switch(this.game.food.randomScore){case 0:this.game.snake.mode="classic";break;case 1:this.theBiggerOneArr.forEach((a,b)=>{this.foodCollision(this.game.snake.head,a)&&(this.game.snake.eatAu.play(),this.game.snake.score+=Math.floor(6*Math.random()),this.theBiggerOneArr.splice(b,1),b--)});break;case 2:this.game.snake.mode="cant eat urself";break;default:this.game.snake.mode="modern";}}draw(){const a=this.game.offContext;switch(a.font="32px Changa One ",a.fillStyle="rgb(255,0,0)",this.game.food.randomScore){case 0:a.fillText("Classic mode",11.2*this.game.unit,1.5*this.game.unit);break;case 1:a.fillText("The more, the less",10.2*this.game.unit,1.5*this.game.unit),this.theBiggerOneArr.forEach(a=>{this.game.offContext.drawImage(this.game.food.foodImg,a.x,a.y,a.w,a.h)});break;case 2:a.fillText("Cant eat urself",11*this.game.unit,1.5*this.game.unit);}}}class Snake{constructor(a=new Game){this.game=a,this.head=this.newHead=null,this.score=this.move=null,this.snakeBody=[{x:9*this.game.unit,y:10*this.game.unit},{x:8*this.game.unit,y:10*this.game.unit}],this.mode="modern",this.eatAu=new Audio("audio/eat.mp3"),this.deadAu=new Audio("audio/dead.mp3")}init(){this.move="stop",this.score=0}direction(){switch(this.move){case"up":this.head.y-=this.game.unit;break;case"down":this.head.y+=this.game.unit;break;case"left":this.head.x-=this.game.unit;break;case"right":this.head.x+=this.game.unit;break;case"stop":}}update(){this.head={x:this.snakeBody[0].x,y:this.snakeBody[0].y},"stop"!=this.move&&(this.direction(),this.game.food.foodCollision(this.head)?(this.eatAu.play(),this.game.food.theBiggerOne?(this.game.food.randomScore=Math.floor(6*Math.random()),this.score+=this.game.food.randomScore,this.game.prize.createBiggerOne()):this.score++,this.game.food.createFood()):this.snakeBody.pop(),this.mode.includes("modern")?(this.death(),this.checkCollision()):this.mode.includes("cant eat urself")?this.death():this.noDeath(),this.snakeBody.unshift(this.head))}death(){(this.head.x<this.game.unit||this.head.x>17*this.game.unit||this.head.y<3*this.game.unit||this.head.y>17*this.game.unit)&&(this.deadAu.play(),this.game.lose=!0)}noDeath(){this.head.x<this.game.unit?this.head.x=17*this.game.unit:this.head.x>17*this.game.unit?this.head.x=this.game.unit:this.head.y<3*this.game.unit?this.head.y=17*this.game.unit:this.head.y>17*this.game.unit&&(this.head.y=3*this.game.unit),this.checkCollision()}checkCollision(){for(let a=1,b=this.snakeBody.length;a<b;a++)if(this.head.x===this.snakeBody[a].x&&this.head.y===this.snakeBody[a].y){this.deadAu.play(),this.game.lose=!0;break}}draw(){const a=this.game.offContext;this.snakeBody.forEach((b,c)=>{this.mode.includes("modern")?(a.fillStyle=0==c?"rgb(255,165,0)":"rgb(255,165,0)",a.strokeStyle="rgb(0,0,0)"):this.mode.includes("cant eat urself")?(a.fillStyle=0==c?"rgb(255,255,0)":"rgb(255,192,50)",a.strokeStyle="rgb(255,0,50)"):(a.fillStyle=0==c?"rgb(50,205,50)":"rgb(137,209,202)",a.strokeStyle="rgb(47,86,233)"),a.fillRect(b.x,b.y,this.game.unit,this.game.unit),a.strokeRect(b.x,b.y,this.game.unit,this.game.unit)}),a.fillStyle="rgb(255,255,255)",a.font="45px Changa One",a.fillText(this.score,2.6*this.game.unit,1.7*this.game.unit)}}