'use strict';class Food{constructor(a=new Game){this.game=a,this.food={},this.theBiggerOne=null,this.randomScore=null,this.numFoodAte=0,this.foodImg=new Image,this.foodImg.src="img/food.webp"}init(){this.createFood()}createFood(){0!==this.numFoodAte&&0==this.numFoodAte%5?(this.food={x:Math.floor(16*Math.random()+1)*this.game.unit,y:Math.floor(14*Math.random()+3)*this.game.unit,w:2*this.game.unit,h:2*this.game.unit},this.theBiggerOne=!0,this.numFoodAte=0):(this.food={x:Math.floor(17*Math.random()+1)*this.game.unit,y:Math.floor(15*Math.random()+3)*this.game.unit,w:this.game.unit,h:this.game.unit},this.theBiggerOne=!1,this.numFoodAte++),this.checkRandomFood(this.game.snake.snakeBody)&&this.createFood()}checkRandomFood(a){for(let b=0,c=a.length;b<c;b++)if(this.foodCollision(a[b]))return!0;return!1}foodCollision(a){return a.x===this.food.x&&a.y===this.food.y||a.x===this.food.x&&a.y+this.game.unit===this.food.y+this.food.h||a.x+this.game.unit===this.food.x+this.food.w&&a.y===this.food.y||a.x+this.game.unit===this.food.x+this.food.w&&a.y+this.game.unit===this.food.y+this.food.h}draw(){const a=this.game.offContext;a.drawImage(this.foodImg,this.food.x,this.food.y,this.food.w,this.food.h)}}