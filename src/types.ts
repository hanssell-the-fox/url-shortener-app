export interface ConnectionOptions {
  database: string;
  collection: string;
}

export interface Model {
  _id: ObjectId;
  hash: string;
  originURL: string;
  shortURL: string;
}
