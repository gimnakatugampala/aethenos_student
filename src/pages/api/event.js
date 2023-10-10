export default function handler(req, res) {
  res.status(200).json([
    {
      id: 1,
      img: '/assets/images/blog/blog-01.jpg',
      category: 'ONLINE',
      title: 'Become a Better Blogger: Content Planning',
      date: "Oct 10, 2022",
      comment: 9,
      sm_desc: 'Lorem ipsum dolor sit amet cons tetur adipisicing sed.',
      delay:'100',
      home_1:true,
    },
    {
      id: 2,
      img: '/assets/images/blog/blog-02.jpg',
      category: 'LECTURE',
      title: 'How to Keep Workouts Fresh in the Morning',
      date: "Jan 10, 2022",
      comment: 15,
      sm_desc: 'Lorem ipsum dolor sit amet cons tetur adipisicing sed do eiusmod ux tempor incid idunt labore dol oremagna aliqua.',
      delay:'200',
      home_1:true,
    },
    {
      id: 3,
      img: '/assets/images/blog/blog-03.jpg',
      category: 'BUSINESS',
      title: 'Four Ways to Keep Your Workout Routine Fresh',
      date: "Feb 10, 2021",
      comment: 12,
      sm_desc: 'Lorem ipsum dolor sit amet cons tetur adipisicing sed do eiusmod ux tempor incid idunt.',
      delay:'300',
      home_1:true,
    }
  ])
}