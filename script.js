window.addEventListener("load", () => {
  renderPhoto();
});

async function getRandomPhoto() {
  const apiKey = "AbUNy7pk-1-7F5yJ2z68bpCYtXaAzo1jQYvp7W42QYA";
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${apiKey}`
    );
    const photo = await response.json();
    return photo;
  } catch (error) {
    console.error("Ошибка при загрузке фотографий:", error);
    return {};
  }
}

async function renderPhoto() {
  const photo = await getRandomPhoto();
  if (photo) {
    const img = document.querySelector(".image");
    img.src = photo.urls.small;
    img.alt = photo.alt_description;

    const photographerNameDiv = document.querySelector(
      ".image_photographer-name"
    );
    photographerNameDiv.textContent = photo.user.name;

    const likesCounterSpan = document.querySelector(".image_likes-counter");
    likesCounterSpan.textContent = photo.likes;
  }
}

const likeButton = document.querySelector(".image_likes-button");
likeButton.addEventListener("click", increaseCounter);

function increaseCounter() {
  const likesCounter = document.querySelector(".image_likes-counter");
  const currentCounter = parseInt(likesCounter.textContent, 10);
  likesCounter.textContent = currentCounter + 1;
}
