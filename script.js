window.onload = () => {
  let canvas = document.getElementById('canvas');
  canvas.style.margin = '5px';
  canvas.width = window.innerWidth - 15;
  canvas.height = window.innerHeight - 120;
  let ctx = canvas.getContext('2d');

  let coords = [];
  let coordsTouches = [];
  let replayColors = [];
  let replayWidth = [];

  let colorValue = 'black';
  let widthValue = '10';

  let colors = document.querySelectorAll('button');
  let repeatButton = document.querySelector('#repeat');
  let widthChangerInput = document.querySelector('#widthChanger');

  for(let color of colors) {
	color.style.background = color.id;
	color.onclick = () => {
	  colorValue = color.id;
	};
  }

  //for mobile
  widthChangerInput.ontouchend = () => {
	widthValue = widthChangerInput.value;
  };

  canvas.ontouchstart = (e) => {
	 //only 1 touch...
	 if (e.touches.length > 1) {
		canvas.ontouchmove = null;
	  	return;
	 }	else {
		ctx.beginPath();
		ctx.strokeStyle = colorValue;
		ctx.lineWidth = widthValue;
		ctx.linejoin = 'miter';
		ctx.miterLimit = 1;
		ctx.lineCap = 'round';

		replayColors.push(colorValue);
		replayWidth.push(widthValue);

		coordsTouches.push('down','down');

		canvas.ontouchmove = (e) => {
		  let x = e.changedTouches['0'].clientX;
		  let y = e.changedTouches['0'].clientY;

		  coordsTouches.push(x,y);

		  ctx.lineTo(x,y);
		  ctx.stroke();

		  canvas.ontouchend = () => {
			canvas.ontouchmove = null;
			ctx.beginPath();
			coordsTouches.push('up','up');
		 };
	   };
	 }
	 return false;
  };

  //for PC
  widthChangerInput.onmouseup = () => {
	widthValue = widthChangerInput.value;
  };

  canvas.onmousedown = () => {
	ctx.beginPath();
	ctx.strokeStyle = colorValue;
	ctx.lineWidth = widthValue;
	ctx.linejoin = 'miter';
	ctx.miterLimit = 1;
	ctx.lineCap = 'round';

	replayColors.push(colorValue);
	replayWidth.push(widthValue);

	coords.push('down','down');

	canvas.onmousemove = (e) => {
	  let x = e.clientX;
	  let y = e.clientY;

	  coords.push(x,y);

	  ctx.lineTo(x,y);
	  ctx.stroke();

	 canvas.onmouseup = canvas.onmouseleave = () => {
	   canvas.onmousemove = null;
	   ctx.beginPath();
	   coords.push('up','up');
	  };
	};
	return false;
  };

  repeatButton.onclick = () => {
	ctx.clearRect(0,0,canvas.width,canvas.height);
	let timer = setInterval(() => {

	  let x = coords.shift() || coordsTouches.shift();
	  let y = coords.shift() || coordsTouches.shift();

	  if (x == 'down' || y == 'down') {
		 ctx.lineWidth = replayWidth.shift();
		 ctx.strokeStyle = replayColors.shift();
	  }

	  if (x == 'up' || y == 'up') {
		 ctx.beginPath();
	  }

	  //forbid drawing when replaying...
	  if (coords.length > 0 || coordsTouches.length > 0) {
		canvas.onmousedown = canvas.ontouchstart = canvas.onmousemove = canvas.onmouseup = canvas.onmouseleave = canvas.ontouchend = canvas.ontouchmove = null;
	  } else {
	  //else allow drawing...
	  //for PC
	  canvas.onmousedown = () => {
  		ctx.beginPath();
		ctx.strokeStyle = colorValue;
		ctx.lineWidth = widthValue;
  		ctx.linejoin = 'miter';
  		ctx.miterLimit = 1;
  		ctx.lineCap = 'round';

		replayColors.push(colorValue);
		replayWidth.push(widthValue);

		coords.push('down','down');

  		canvas.onmousemove = (e) => {
  		  let x = e.clientX;
  		  let y = e.clientY;

  		  coords.push(x,y);

  		  ctx.lineTo(x,y);
  		  ctx.stroke();

  		  canvas.onmouseup = canvas.onmouseleave = () => {
  			canvas.onmousemove = null;
  			ctx.beginPath();
  			coords.push('up','up');
  		 };
  	   };
  	   return false;
	 };
	 
	  //for mobile
	  canvas.ontouchstart = (e) => {
		 //only 1 touch...
		 if (e.touches.length > 1) {
			canvas.ontouchmove = null;
	  		return;
		 }	else {
			ctx.beginPath();
			ctx.strokeStyle = colorValue;
			ctx.lineWidth = widthValue;
			ctx.linejoin = 'miter';
			ctx.miterLimit = 1;
			ctx.lineCap = 'round';

			replayColors.push(colorValue);
			replayWidth.push(widthValue);

			coordsTouches.push('down','down');

			canvas.ontouchmove = (e) => {
			  let x = e.changedTouches['0'].clientX;
			  let y = e.changedTouches['0'].clientY;

			  coordsTouches.push(x,y);

			  ctx.lineTo(x,y);
			  ctx.stroke();

			  canvas.ontouchend = () => {
				canvas.ontouchmove = null;
				ctx.beginPath();
				coordsTouches.push('up','up');
			 };
		   };
		 }
		 return false;
	  };	 
   }

	  if (x == undefined || y == undefined) {
		clearInterval(timer);
		return;
	  }

	  ctx.lineTo(x,y);
	  ctx.stroke();
	}, 10);
  };
};
