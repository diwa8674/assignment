export interface IBooksDetail {
  items: {};
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export class BooksDetail implements IBooksDetail {
  items: {};
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  constructor(obj?: any) {
    this.items = obj.items || {};
    this.id = obj.id || '';
    this.name = obj.name || '';
    this.email = obj.email || '';
    this.phone = obj.phone || '';
    this.address = obj.address || '';
  }
}

export function generateMockBook(): BooksDetail {
  return {
    items: {},
    id: '1',
    name: 'angular',
    email: 'cdcd@y.com',
    phone: '9809879',
    address: 'csdcdscdscsdcs',
  };
}
