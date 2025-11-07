export interface BookItem {
  _id: string;
  id: string;
  title: string;
  author: string;
  ISBN: string;
  publisher: string;
  availableAmount: number;
  coverPicture: string;
}

export interface BookJson {
  success: boolean;
  count: number;
  data: BookItem[];
}

export interface BookingItem {
  nameLastname: string;
  tel: string;
  venue: string;
  bookDate: string;
}
