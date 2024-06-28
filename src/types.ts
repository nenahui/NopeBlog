export interface ApiPost {
  name: string;
  description: string;
  date: string;
}

export interface Post extends ApiPost {
  id: string;
}

export interface ApiPosts {
  [id: string]: ApiPost;
}

export interface PostMutation {
  name: string;
  description: string;
}

export type NotificationColorTypes =
  | 'gray'
  | 'gold'
  | 'bronze'
  | 'brown'
  | 'yellow'
  | 'amber'
  | 'orange'
  | 'tomato'
  | 'red'
  | 'ruby'
  | 'crimson'
  | 'pink'
  | 'plum'
  | 'purple'
  | 'violet'
  | 'iris'
  | 'indigo'
  | 'blue'
  | 'cyan'
  | 'teal'
  | 'jade'
  | 'green'
  | 'grass'
  | 'lime'
  | 'mint'
  | 'sky';
