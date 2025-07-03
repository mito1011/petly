const imageMap = {
  Dogs: [
    'https://placedog.net/400/400?id=3',
    'https://placedog.net/400/400?id=4',
    'https://placedog.net/400/400?id=1',
    'https://placedog.net/400/400?id=21',
    'https://placedog.net/400/400?id=5',
    'https://placedog.net/400/400?id=6',
    'https://placedog.net/400/400?id=7',
    'https://placedog.net/400/400?id=8',
    'https://placedog.net/400/400?id=9',
    'https://placedog.net/400/400?id=10',
    
  ],
  Cats: [
    'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOWxwJD2Z1yDo54D9G2kSJkvtv2v_7NXKRqg&s',
    'https://cdn2.thecatapi.com/images/3bt.jpg',
    'https://cdn2.thecatapi.com/images/9ccXTANkb.jpg',
    'https://cdn2.thecatapi.com/images/bpc.jpg',
    'https://cdn2.thecatapi.com/images/6qi.jpg',
    'https://cdn2.thecatapi.com/images/cml.jpg',
    'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg',
    'https://images.pexels.com/photos/2194261/pexels-photo-2194261.jpeg',
    'https://images.pexels.com/photos/1170986/pexels-photo-1170986.jpeg',
    'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg',
  ],
  Birds: [
    'https://images.pexels.com/photos/792416/pexels-photo-792416.jpeg',
    'https://images.pexels.com/photos/326900/pexels-photo-326900.jpeg',
    'https://www.tierchenwelt.de/images/stories/haustiere/voegel/wellensittiche_l.jpg',
    'https://images.pexels.com/photos/36846/bald-eagle-adler-bird-of-prey-raptor.jpg',
    'https://images.pexels.com/photos/162140/duckling-birds-yellow-fluffy-162140.jpeg',
    'https://images.pexels.com/photos/414181/pexels-photo-414181.jpeg',
    'https://images.pexels.com/photos/2629372/pexels-photo-2629372.jpeg',
    'https://images.pexels.com/photos/2317904/pexels-photo-2317904.jpeg',
    'https://images.pexels.com/photos/2226006/pexels-photo-2226006.jpeg',
    'https://images.pexels.com/photos/763197/pexels-photo-763197.jpeg',
    'https://images.pexels.com/photos/2115984/pexels-photo-2115984.jpeg',
  ],
  Exotic: [
    'https://images.pexels.com/photos/70083/frog-macro-amphibian-green-70083.jpeg',
    'https://images.pexels.com/photos/18147351/pexels-photo-18147351.jpeg',
    'https://images.pexels.com/photos/32835765/pexels-photo-32835765.jpeg',
    'https://images.pexels.com/photos/247431/pexels-photo-247431.jpeg',
    'https://images.pexels.com/photos/213399/pexels-photo-213399.jpeg',
    'https://images.pexels.com/photos/12774150/pexels-photo-12774150.jpeg',
    'https://images.pexels.com/photos/2664272/pexels-photo-2664272.jpeg',
    'https://images.pexels.com/photos/32791311/pexels-photo-32791311.jpeg',
    'https://images.pexels.com/photos/814898/pexels-photo-814898.jpeg',
    'https://images.pexels.com/photos/225869/pexels-photo-225869.jpeg',
  ],
  Other: [
    'https://images.pexels.com/photos/1093126/pexels-photo-1093126.jpeg',
    'https://www.kaninchen-haltung.com/wp-content/uploads/2020/04/kaninchen-alter-haustier.jpg',
    'https://images.pexels.com/photos/45246/green-tree-python-python-tree-python-green-45246.jpeg',
    'https://images.pexels.com/photos/2613148/pexels-photo-2613148.jpeg',
    'https://www.kaninchen-haltung.com/wp-content/uploads/2020/04/kaninchen-alter-haustier.jpg',
    'https://images.pexels.com/photos/325044/pexels-photo-325044.jpeg',
    'https://images.pexels.com/photos/34426/snake-rainbow-boa-reptile-scale.jpg',
    'https://images.pexels.com/photos/2613148/pexels-photo-2613148.jpeg',
    'https://images.pexels.com/photos/106686/pexels-photo-106686.jpeg',
    'https://images.pexels.com/photos/1112007/pexels-photo-1112007.jpeg',
    'https://www.kaninchen-haltung.com/wp-content/uploads/2020/04/kaninchen-alter-haustier.jpg',
    'https://images.pexels.com/photos/4588065/pexels-photo-4588065.jpeg', //hier
    'https://images.pexels.com/photos/133459/pexels-photo-133459.jpeg',
    'https://images.pexels.com/photos/128756/pexels-photo-128756.jpeg',
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