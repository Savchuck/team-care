var lastScrollHeight = 0;
var fixed = 0;

var sliderDelay = 500; // milliseconds

var roomImages = [
	["room/1.png", "room/2.png", "room/3.png"],
	["room/4.png", "room/5.png", "room/6.png"],
	["room/7.png", "room/8.png", "room/9.png"],
	];

var roomVideos = [
	"video/1.mp4", "video/2.mp4", "video/3.mp4"
	]

window.onload = main;
addEventListener("scroll", scrollListener);

function closeVideoBlock(){
	let videoBlock = document.querySelector(".video-block");
	videoBlock.style.opacity = "0%";
	setTimeout(function () {
		videoBlock.style.display = "none";
	videoBlock.querySelector(".window video").src = "video/empty.mp4";
	}, 500);
};

function openVideoBlock(item, index){
	let videoBlock = document.querySelector(".video-block");
	let windowBlock = videoBlock.querySelector(".window");
	videoBlock.style.display = "inline-block";
	windowBlock.style.transform = "translate(-50%, -50%) scale(0)";
	videoBlock.querySelector(".window video").src = roomVideos[index];

	setTimeout(function () {
		videoBlock.style.opacity = "100%";
		windowBlock.style.transform = "translate(-50%, -50%) scale(1)";

	}, 0)
	
};

function main(){
	scrollListener();

	// Open video block
	let openVideoButton = document.querySelectorAll(".propose-block .room-info-block .open-video");
	openVideoButton.forEach((item, index) => {item.onclick = function() { openVideoBlock(item, index) }});

	// Close video block
	let closeVideo = document.querySelector(".video-block .close");
	closeVideo.onclick = closeVideoBlock;

	// Arrow return functional

	document.querySelector(".arrow-return").onclick = function() { window.scrollTo(0, 0); };

	// Sliders functional
	let sliders = document.querySelectorAll(".propose-block");
	var slidersElem = [];

	sliders.forEach((slider, index) => {

		let img = slider.querySelector("img");
		let animImg = slider.querySelector("img.anim");

		slidersElem.push(0); // selectedImageIndex

		img.src = roomImages[index][slidersElem[index]];

		slider.querySelector(".next").onclick = function() {
			let oldIndex = slidersElem[index];
			slidersElem[index]++;
			if (slidersElem[index] >= roomImages[index].length) slidersElem[index] = 0;

			img.style.left = "0%";

			animImg.src = roomImages[index][slidersElem[index]];
			animImg.style.left = "100%";
			setTimeout(function () {
				img.style.transition = `${sliderDelay/1000}s`;
				img.style.left = "-100%";

				animImg.style.transition = `${sliderDelay/1000}s`;
				animImg.style.left = "0%";
			}, 0);

			setTimeout(function () {
				img.style.transition = "";
				img.style.left = "";

				animImg.style.left = "";
				animImg.style.display = "";
				animImg.style.transition = "";
				animImg.style.left = "";
				img.src = roomImages[index][slidersElem[index]];
			}, sliderDelay);
		};
		slider.querySelector(".prev").onclick = function() {
			let oldIndex = slidersElem[index];
			slidersElem[index]--;
			if (slidersElem[index] < 0) slidersElem[index] = roomImages[index].length-1;

			img.style.left = "0%";

			animImg.src = roomImages[index][slidersElem[index]];
			animImg.style.left = "-100%";
			setTimeout(function () {
				img.style.transition = `${sliderDelay/1000}s`;
				img.style.left = "100%";

				animImg.style.transition = `${sliderDelay/1000}s`;
				animImg.style.left = "0%";
			}, 0);

			setTimeout(function () {
				img.style.transition = "";
				img.style.left = "";

				animImg.style.left = "";
				animImg.style.display = "";
				animImg.style.transition = "";
				animImg.style.left = "";
				img.src = roomImages[index][slidersElem[index]];
			}, sliderDelay);
		};
	});
}

function scrollListener(){
	let pageHeight = window.innerHeight;
	let scrollHeight = document.body.scrollTop;
	let scrollHeightDown = scrollHeight+pageHeight;
	let fullPageScrolls = scrollHeight/pageHeight;
	let direction = 1;
	if (scrollHeight < lastScrollHeight) direction = -1;
	lastScrollHeight = scrollHeight;
	// console.log(event);
	document.querySelector(".header img").style.marginLeft = `-${10*fullPageScrolls}%`;
	document.querySelector(".header img").style.marginTop = `${scrollHeight-120}px`;

	// stick menu to top
	let menu = document.querySelector(".menu");
	let arrowReturn = document.querySelector(".arrow-return");
	if (Math.ceil(scrollHeight) > menu.offsetTop && fixed == 0){
		menu.setAttribute("fixed", "true");
		fixed = 1;

		arrowReturn.style.transition = ".5s";
		arrowReturn.style.display = "inline-block";
		setTimeout(function () {
			arrowReturn.style.opacity = "100%";
		}, 0);
		setTimeout(function() {
			arrowReturn.style.opacity = "100%";
			arrowReturn.style.display = "inline-block";
			arrowReturn.style.transition = "";
		}, 500);

	}
	else if (Math.ceil(scrollHeight) < pageHeight - menu.offsetHeight && fixed == 1){
		menu.setAttribute("fixed", "false");
		fixed = 0;

		arrowReturn.style.transition = ".5s";
		setTimeout(function () {
			arrowReturn.style.opacity = "0%";
		}, 0);
		setTimeout(function() {
			arrowReturn.style.display = "none";
			arrowReturn.style.transition = "";
		}, 500);
	}
	menu.style.background = `rgba(255, 255, 255, ${1*(scrollHeight/(pageHeight-menu.offsetHeight))})`;
	let menuItems = document.querySelectorAll(".menu-item");
	menuItems.forEach((item, index) => {
		menuItems.forEach(item => {item.setAttribute("selected", "false");});

		item.onclick = function() { scrollPage(document.querySelectorAll("h1.title")[index].offsetTop-20); };
		let value = 255-255*(scrollHeight/(pageHeight-menu.offsetHeight))
		if (value >= 0){
			let color = `rgba(${value}, ${value}, ${value}, 1.0)`;
			// console.log(value);
			item.style.color = `${color}`;
			// item.style.borderLeft = `2px solid ${color}`;
			// item.style.borderRight = `2px solid ${color}`;
		}
		else{
			item.style.color = "";
			// item.style.borderLeft = "";
			// item.style.borderRight = "";
			let titles = document.querySelectorAll("h1.title");
			let selected = 0;
			titles.forEach((item, index) => {
				item.setAttribute("selected", "false");
				// console.log(item.offsetTop, (scrollHeightDown-scrollHeight/2));
				if (item.offsetTop < (scrollHeightDown-pageHeight/2)) {
					selected = index;
				}
				// console.log(item.offsetTop);
				// console.log(item.offsetTop, scrollHeight, item.getBoundingClientRect().top+scrollHeight)
			});
			// console.log(selected);

			let menuItems = document.querySelectorAll(".menu .menu-item");

			menuItems[selected].setAttribute("selected", "true");
			// menuItems[selected].style.borderLeft = "4px solid red";
			// menuItems[selected].style.borderRight = "4px solid red";
			// menuItems[selected].style.padding = "0 15px";
		}
	});
}

document.addEventListener('mouseup', function(e) {
        let window1 = document.querySelector('.video-block .window');
        let video = document.querySelector('.video-block');
        let windowDStyle = window.getComputedStyle(video).getPropertyValue('display');
        if (!window1.contains(e.target) && windowDStyle != "none") {
            closeVideoBlock();
        }
        });

function getPosition(element) {
    var xPosition = 0;
    var yPosition = 0;

    while(element) {
        xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
    }

    return { x: xPosition, y: yPosition };
}

addEventListener("wheel", (event) => {
	let pageHeight = window.innerHeight;
	let scrollHeight = document.body.scrollTop;
	// console.log(event);
});

function scrollPage(yOffset){
	window.scrollTo(0, yOffset-document.querySelector(".menu").offsetHeight);
}
document.querySelector(".arrow-down").onclick = function() {
		scrollPage(window.innerHeight+2);
};
