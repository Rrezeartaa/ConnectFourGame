
function animateDroppingDisk (x_, y_, w_, h_, color) {
	var vy = 20;
	var gravity = 0.99;
	var bounce_factor = 0.4;
    
	function Ball() {
		this.radius = 40;
		this.x = x_ + cellWidth/2;
		this.y = y_;
		
		this.draw = function(context) {
			context.fillStyle = color;
			context.beginPath();
			context.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
			context.closePath();
			context.fill();
		}
	}
	
	var ball = new Ball();
    
	(function renderFrame() {
        if (resetNotClicked){
            requestAnimationFrame(renderFrame);
            
            context.clearRect(x_, y_, w_, h_);
            
            vy += gravity;
            ball.y += vy;
            if (ball.y + ball.radius > h_) { 
                ball.y = h_ - ball.radius;
                vy *= -bounce_factor;
            }
            ball.draw(context);
        }
	}());
}