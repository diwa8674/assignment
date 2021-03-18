export class BooksDetail {
  id: string;
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishDate: string;
    description: string;
    averageRating: number;
    ratingsCount: number;
    imageLinks: {
      thumbnail: string;
      smallThumbnail: string;
    };
  };
  name: string;
  email: string;
  phone: string;
  address: string;
  constructor(booksDetail?: BooksDetail) {
    this.id = booksDetail.id || '';
    this.volumeInfo = booksDetail.volumeInfo || null;
    this.name = booksDetail.name || '';
    this.email = booksDetail.email || '';
    this.phone = booksDetail.phone || '';
    this.address = booksDetail.address || '';
  }
}

export function generateMockBook(): BooksDetail {
  return {
    id: '1',
    volumeInfo: {
      title: 'title',
      subtitle: 'subtitle',
      authors: ['author'],
      publisher: 'publisher',
      publishDate: '',
      description: 'description',
      averageRating: 3,
      ratingsCount: 5,
      imageLinks: {
        thumbnail: 'string',
        smallThumbnail: 'string',
      },
    },
    name: 'angular',
    email: 'cdcd@y.com',
    phone: '9809879',
    address: 'csdcdscdscsdcs',
  };
}
