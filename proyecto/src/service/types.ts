export interface LogIn {
  email: FormDataEntryValue | null;
  username: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

export interface Token {
  refresh: "";
  access: "";
}

export interface addSinger {
  name: FormDataEntryValue | null;
  stageName: FormDataEntryValue | null;
  last_name: FormDataEntryValue | null;
  nationality: FormDataEntryValue | null;
  image: FormDataEntryValue | null;
}
export interface addSongs {
  name: FormDataEntryValue | null;
  duration: FormDataEntryValue | null;
  realeaseDate: FormDataEntryValue | null;
  price: FormDataEntryValue | null;
}
export interface addAlbum {
  name: FormDataEntryValue | null;
  genre?: FormDataEntryValue | null;
  singer?: FormDataEntryValue | null;
  realeaseDate?: any;
  price: FormDataEntryValue | null;
  stock: FormDataEntryValue | null;
  images: FormDataEntryValue | null;
}
