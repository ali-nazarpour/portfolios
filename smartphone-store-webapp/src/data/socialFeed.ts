export interface SocialPost {
  id: string
  image: string
  captionKey: string
  likes: number
}

export const socialPosts: SocialPost[] = [
  { id: '1', image: '/assets/social/post-1.jpg', captionKey: 'social.p1Caption', likes: 1240 },
  { id: '2', image: '/assets/social/post-2.jpg', captionKey: 'social.p2Caption', likes: 892 },
  { id: '3', image: '/assets/social/post-3.jpg', captionKey: 'social.p3Caption', likes: 2103 },
  { id: '4', image: '/assets/social/post-4.jpg', captionKey: 'social.p4Caption', likes: 756 },
  { id: '5', image: '/assets/social/post-5.jpg', captionKey: 'social.p5Caption', likes: 1544 },
  { id: '6', image: '/assets/social/post-6.jpg', captionKey: 'social.p6Caption', likes: 967 },
]
