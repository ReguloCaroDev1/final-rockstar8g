export interface NavButton {
  text: string;
  icon: JSX.Element;
  onClick: () => void;
}
export interface Singer {
  _id: string;
  stageName: string;
  name: string;
  lastName: string;
  image: string;
  nationality: string;
}

export interface Song {
  _id: string;
  name: string;
  singer: Singer;
  releaseDate: Date;
  album?: Album;
  duration?: number;
  completeFile: string;
  previewFile: string;
  price?: number;
}
export interface Album {
  _id: string;
  name: string;
  singer: Singer;
  releaseDate: Date;
  songs: Song[];
  price: number;
  genre: Genre;
  stock: number;
  image: string;
}
export interface Genre {
  _id: string;
  description: string;
}
interface FormProps {
  saveFace: any;
}
