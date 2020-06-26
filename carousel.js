class ImageCarousel {
  constructor() {
    this.carouselframe = document.querySelector('.carousel-frame');
    this.imagesContainer = document.querySelector('.images-container');
    this.imagesContainerWidth = this.imagesContainer.offsetWidth;
    this.totalImages = this.imagesContainer.children.length;
    this.totalwidth = this.imagesContainerWidth * this.totalImages;
    this.imagesContainer.style.width = this.totalwidth + 'px';
    this.leftArrow = document.createElement('div');
    this.rightArrow = document.createElement('div');
    this.dotsContainer = document.createElement('div');
    this.dotCollection = [];
    this.transitionTime = 1;
    this.holdTime = 3000;
    this.speed = 10;
    this.left = 0;
    this.index = 0;
    this.newIndex = 0;
  }

  init() {
    this.createDots();
    this.createArrows();
    this.indicateDot();
    this.automateSlider();
    this.dotNavigate();
    this.arrowNavigate();
  }

  createDots() {
    this.dotsContainer.setAttribute('style', 'transform:translateX(-50%); position:absolute; z-index:1; bottom:15px; left:50%;');
    this.carouselframe.appendChild(this.dotsContainer);

    for (let i = 0; i < this.totalImages; i++) {
      const dot = document.createElement('span');
      dot.setAttribute('style', 'height:10px; width:10px; border:2px solid black; border-radius:50%; background:white; display:inline-block; margin:5px; cursor:pointer;');
      this.dotsContainer.appendChild(dot);
      this.dotCollection.push(dot);
    }
  }

  createArrows() {
    this.leftArrow.setAttribute('style', 'position:absolute; top:50%; transform:translateY(-50%) rotate(-90deg); left:15px; z-index:1; font-weight:bolder; font-size: 3rem; color:white; opacity:85%; cursor:pointer;')
    this.rightArrow.setAttribute('style', 'position:absolute; top:50%; transform:translateY(-50%) rotate(90deg); right:15px; z-index:1; font-weight:bolder; font-size: 3rem; color:white; opacity:85%; cursor:pointer;')
    this.leftArrow.textContent = '^';
    this.rightArrow.textContent = '^';
    this.carouselframe.appendChild(this.leftArrow);
    this.carouselframe.appendChild(this.rightArrow);
  }

  indicateDot(){
    this.dotCollection[this.index].style.background = 'white';
    this.dotCollection[this.newIndex].style.background = 'black';
  }

  slideImage(index, newIndex) {
    this.moveImage = setInterval(() => {
      if (this.left < 0){
        this.left = 0;
      }
      if (this.left > this.totalwidth - this.imagesContainerWidth){
        this.left = this.totalwidth - this.imagesContainerWidth
      }

      this.left = this.left + this.speed * (newIndex - index);
      console.log(this.left);
      if (this.left === this.imagesContainerWidth * newIndex) {
        clearInterval(this.moveImage);
      }
      
      this.imagesContainer.style.left = -this.left + 'px';
      
    }, this.transitionTime);
  }


  dotNavigate() {
    this.dotsContainer.addEventListener('click', e => {
      clearInterval(this.moveImage);
      clearInterval(this.holdImage);
      const targetDot = e.target.closest('span');
      if (!targetDot) return;

      const targetIndex = this.dotCollection.findIndex(dot => dot === targetDot);
      this.index = this.newIndex;
      this.newIndex = targetIndex;
      this.slideImage(this.index, this.newIndex);
      this.automateSlider();
      this.indicateDot();
    });
  }

  arrowNavigate(){
    this.leftArrow.addEventListener('click', () => {
      clearInterval(this.moveImage);
      clearInterval(this.holdImage);
      this.index = this.newIndex;
      this.newIndex--
      if(this.newIndex < 0){
        this.newIndex = this.totalImages - 1;
      }
      this.slideImage(this.index, this.newIndex);
      this.automateSlider();
      this.indicateDot();
    });
    this.rightArrow.addEventListener('click', () => {
      clearInterval(this.moveImage);
      clearInterval(this.holdImage);
      this.index = this.newIndex;
      this.newIndex++;
      if(this.newIndex === this.totalImages){
        this.newIndex = 0;
      }
      this.slideImage(this.index, this.newIndex);
      this.automateSlider();
      this.indicateDot();
    });
  }

  automateSlider() {
    this.holdImage = setInterval(() => {

      this.index = this.newIndex;
      this.newIndex++;
      if (this.newIndex === this.totalImages){
        this.newIndex = 0;
      }
      this.slideImage(this.index, this.newIndex);
      this.indicateDot();
    }, this.holdTime);
  }

}

let imageCarousel = new ImageCarousel();
imageCarousel.init();