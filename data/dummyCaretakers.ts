// data/dummyCaretakers.ts
export const dummyCaretakers = [
  {
    id: 'sitter1',
    title: 'Anna the Dog Whisperer',
    description: 'Experienced with all breeds, loves long walks.',
    rating: 4.9,
    reviews: 120,
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    tags: ['Walks', 'Training'],
    animalTypes: ['Dogs'],
    completedCare: 100,
    repeatClients: 50,
    starReviews: 100,
    experience: 'Dog Caregiver',
    experienceSince: '2018',
    about: "I'm a passionate dog lover with 5+ years of experience caring for dogs of all breeds and sizes. I offer a safe, loving environment where your furry friend will feel right at home. I'm available for walks, drop-ins, and overnight stays.",
    reviewsDetail: [
      {
        id: 'r1',
        name: 'Emily Carter',
        date: '2 months ago',
        rating: 5,
        comment: 'Anna is amazing! She took such great care of my golden retriever, Max. He came home happy and tired. I highly recommend her!',
        likes: 10,
        replies: 1,
        avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
      },
      {
        id: 'r2',
        name: 'David Lee',
        date: '3 months ago',
        rating: 5,
        comment: "Anna is the best! She's reliable, trustworthy, and truly loves dogs. My pug, Winston, adores her. I'd definitely be booking her again.",
        likes: 8,
        replies: 0,
        avatar: 'https://randomuser.me/api/portraits/men/10.jpg'
      }
    ],
    ratingBreakdown: {
      5: 90,
      4: 7,
      3: 1,
      2: 1,
      1: 1
    }
  },
  {
    id: 'sitter2',
    title: 'Cat Loving Carla',
    description: 'Specialist in feline care.',
    rating: 4.7,
    reviews: 12,
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    tags: ['Feeding', 'Overnight'],
    animalTypes: ['Cats'],
    completedCare: 70,
    repeatClients: 30,
    starReviews: 50,
    experience: 'Cat Caregiver',
    experienceSince: '2020',
    about: 'Feline specialist with a cozy home. I ensure your cats are fed, safe and happy.',
    reviewsDetail: [
      {
        id: 'r3',
        name: 'Laura Bennett',
        date: '1 month ago',
        rating: 5,
        comment: 'Carla was so sweet with my shy cat! I felt really safe leaving her with Carla.',
        likes: 5,
        replies: 0,
        avatar: 'https://randomuser.me/api/portraits/women/12.jpg'
      },
      {
        id: 'r4',
        name: 'Michael Ross',
        date: '2 months ago',
        rating: 4,
        comment: 'Very responsible sitter. Took good care of my two cats while I was away.',
        likes: 4,
        replies: 0,
        avatar: 'https://randomuser.me/api/portraits/men/13.jpg'
      }
    ],
    ratingBreakdown: {
      5: 85,
      4: 10,
      3: 3,
      2: 1,
      1: 1
    }
  },
  {
    id: 'sitter3',
    title: 'Multi-Pet Max',
    description: 'Experienced with rabbits, hamsters, and more.',
    rating: 4.6,
    reviews: 9,
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    tags: ['Feeding', 'Daycare'],
    animalTypes: ['Other'],
    completedCare: 40,
    repeatClients: 20,
    starReviews: 25,
    experience: 'Multi-Pet Specialist',
    experienceSince: '2019',
    about: 'Providing care for all types of small pets. Personalized and attentive service.',
    reviewsDetail: [
      {
        id: 'r5',
        name: 'Samantha Green',
        date: '3 weeks ago',
        rating: 5,
        comment: 'Max really knows how to care for small pets. My rabbit came home stress-free!',
        likes: 6,
        replies: 0,
        avatar: 'https://randomuser.me/api/portraits/women/16.jpg'
      },
      {
        id: 'r6',
        name: 'Peter Walsh',
        date: '2 months ago',
        rating: 4,
        comment: 'Good service, and my hamster was happy. Would recommend Max to other pet owners.',
        likes: 3,
        replies: 0,
        avatar: 'https://randomuser.me/api/portraits/men/17.jpg'
      }
    ],
    ratingBreakdown: {
      5: 80,
      4: 10,
      3: 5,
      2: 3,
      1: 2
    }
  }
];
