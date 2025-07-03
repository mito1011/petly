const imageMap = {
  Dogs: [
    'https://placedog.net/400/400?id=1',
    'https://placedog.net/400/400?id=2',
    'https://placedog.net/400/400?id=3',
    'https://placedog.net/400/400?id=4',
    'https://placedog.net/400/400?id=5',
    'https://placedog.net/400/400?id=6',
    'https://placedog.net/400/400?id=7',
    'https://placedog.net/400/400?id=8',
    'https://placedog.net/400/400?id=9',
    'https://placedog.net/400/400?id=10',
  ],
  Cats: [
    'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg',
    'https://cdn2.thecatapi.com/images/3bt.jpg',
    'https://cdn2.thecatapi.com/images/9ccXTANkb.jpg',
    'https://cdn2.thecatapi.com/images/bpc.jpg',
    'https://cdn2.thecatapi.com/images/6qi.jpg',
    'https://cdn2.thecatapi.com/images/cml.jpg',
    'https://cdn2.thecatapi.com/images/MTg0NjMwOQ.jpg',
    'https://cdn2.thecatapi.com/images/ecc.jpg',
    'https://cdn2.thecatapi.com/images/f2d.jpg',
    'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg',
  ],
  Birds: [
    'https://images.pexels.com/photos/45851/bird-sparrow-branch-tree-45851.jpeg',
    'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg',
    'https://images.pexels.com/photos/45863/bird-nature-wildlife-beak-45863.jpeg',
    'https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg',
    'https://images.pexels.com/photos/414181/pexels-photo-414181.jpeg',
    'https://images.pexels.com/photos/45864/bird-colorful-rainbow-lorikeet-45864.jpeg',
    'https://images.pexels.com/photos/234272/pexels-photo-234272.jpeg',
    'https://images.pexels.com/photos/133459/pexels-photo-133459.jpeg',
    'https://images.pexels.com/photos/50577/bird-branch-nature-animal-50577.jpeg',
    'https://images.pexels.com/photos/162140/bird-yellow-parrot-macaw-162140.jpeg',
  ],
  Exotic: [
    'https://images.pexels.com/photos/161931/macaque-monkey-primates-animal-161931.jpeg',
    'https://images.pexels.com/photos/326875/pexels-photo-326875.jpeg',
    'https://images.pexels.com/photos/67284/chameleon-reptile-green-lizard-67284.jpeg',
    'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg',
    'https://images.pexels.com/photos/213399/pexels-photo-213399.jpeg',
    'https://images.pexels.com/photos/414886/pexels-photo-414886.jpeg',
    'https://images.pexels.com/photos/47911/iguana-lizard-reptile-exotic-47911.jpeg',
    'https://images.pexels.com/photos/35657/pexels-photo.jpg',
    'https://images.pexels.com/photos/814898/pexels-photo-814898.jpeg',
    'https://images.pexels.com/photos/225869/pexels-photo-225869.jpeg',
  ],
  Other: [
    'https://images.pexels.com/photos/1084165/pexels-photo-1084165.jpeg',
    'https://images.pexels.com/photos/248280/pexels-photo-248280.jpeg',
    'https://images.pexels.com/photos/1314816/pexels-photo-1314816.jpeg',
    'https://images.pexels.com/photos/106686/pexels-photo-106686.jpeg',
    'https://images.pexels.com/photos/158471/hamster-animal-cute-golden-hamster-158471.jpeg',
    'https://images.pexels.com/photos/326875/pexels-photo-326875.jpeg',
    'https://images.pexels.com/photos/2286956/pexels-photo-2286956.jpeg',
    'https://images.pexels.com/photos/2194261/pexels-photo-2194261.jpeg',
    'https://images.pexels.com/photos/208984/pexels-photo-208984.jpeg',
    'https://images.pexels.com/photos/458799/pexels-photo-458799.jpeg',
  ],
};

export function getAnimalImageUrl(animalType: keyof typeof imageMap, id: string | number): string {
  const images = imageMap[animalType];
  if (!images || images.length === 0) {
    throw new Error(`No images found for animalType: ${animalType}`);
  }

  const numericId = typeof id === 'number' ? id : parseInt(id, 10);

  // IDs starten bei 1 → Index = id - 1
  const index = (numericId - 1) % images.length;

  return images[index];
}