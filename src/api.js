export async function fetchImages(breed) {
    const response = await fetch(
      `https://dog.ceo/api/breed/hound/basset/images/random/10`
    );
    const data = await response.json();
    return data.message;
  }