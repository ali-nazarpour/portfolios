export interface SocialPost {
  id: string
  image: string
  caption: string
  likes: number
  type: 'photo' | 'reel' | 'carousel'
}

export const socialPosts: SocialPost[] = [
  { id: '1', image: '/assets/social/post-1.jpg', caption: 'Weekend trail session with the Fuel EXe 9.8', likes: 2847, type: 'photo' },
  { id: '2', image: '/assets/social/post-2.jpg', caption: 'Urban commute, redefined', likes: 1923, type: 'reel' },
  { id: '3', image: '/assets/social/post-3.jpg', caption: 'New arrivals at the showroom', likes: 3456, type: 'carousel' },
  { id: '4', image: '/assets/social/post-4.jpg', caption: 'Zero SR/F sunset ride', likes: 4102, type: 'photo' },
  { id: '5', image: '/assets/social/post-5.jpg', caption: 'Gravel adventure season is here', likes: 1567, type: 'photo' },
  { id: '6', image: '/assets/social/post-6.jpg', caption: 'Trail shredding with Trek', likes: 2234, type: 'reel' },
]

