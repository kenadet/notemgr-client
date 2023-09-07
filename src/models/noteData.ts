export interface INoteData {
  notes: Note[];
  totalpages: number;
  currentPage: number;
}

export interface Note {
  _id?: string;
  title: string;
  description: string;
  category: string;
}
