import { Photo } from "./Photo";

export class Gallery {
  private prev: Element;
  private next: Element;
  private imgTitle: Element;
  private mainImg: Element;
  private description: Element;
  private thumbnailContainer: Element;
  private counter: number = 0;

  constructor(private photos: Photo[], element: Element) {
    this.initElements(element);
    this.next.addEventListener("click", () => this.showNextPhoto());
    this.prev.addEventListener("click", () => this.showPrevPhoto());
    this.update();
  }

  initElements(element: Element) {
    this.prev = element.getElementsByClassName("btn-prev")[0];
    this.next = element.getElementsByClassName("btn-next")[0];
    this.imgTitle = element.getElementsByTagName("h1")[0];
    this.mainImg = element.getElementsByTagName("img")[0];
    this.description = element.getElementsByTagName("p")[0];
    this.thumbnailContainer = element.getElementsByClassName(
      "thumbs-container"
    )[0];
  }
  updateMainPhoto() {
    const photo = this.photos[this.counter];
    this.imgTitle.innerText = photo.title;
    this.description.innerText = photo.description;
    this.mainImg.setAttribute("src", photo.source);
  }
  showNextPhoto() {
    this.counter++;
    if (this.counter >= this.photos.length) {
      this.counter = 0;
    }
    this.update();
  }
  showPrevPhoto() {
    this.counter--;
    if (this.counter < 0) {
      this.counter = this.photos.length - 1;
    }
    this.update();
  }

  updateThumbnails() {
    let currentImage: HTMLImageElement;
    this.thumbnailContainer.innerHTML = "";
    let lastPhotoIndex: number = this.counter + 4;
    let firstThumbnailIndex = this.counter;
    if (this.counter >= 4 && this.photos.length > 5) {
        if (this.photos.length === 6) {
            firstThumbnailIndex + 1;
            lastPhotoIndex + 1;
        } else if (this.photos.length > 6) {
            firstThumbnailIndex + 2;
            lastPhotoIndex + 2;
        }
    }
    
    if (lastPhotoIndex >= this.photos.length) {
      lastPhotoIndex = this.photos.length - 1;
    }
    for (let i = this.counter; i <= lastPhotoIndex; i++) {
      currentImage = document.createElement("img");
      currentImage.setAttribute("src", this.photos[i].source);
      if (this.counter === i) {
        currentImage.setAttribute("class", "selected");
      }
      currentImage.addEventListener("click", () => {
        this.showPhotoByIndex(i);
      });
      this.thumbnailContainer.appendChild(currentImage);
    }
  }

  showPhotoByIndex(index: number) {
    this.counter = index;
    this.update();
  }
  update() {
    this.updateMainPhoto();
    this.updateThumbnails();
  }
}
