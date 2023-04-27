import { Word } from 'store/dictionary';

export interface WordCardProps {
  word: Word;
  sort?: boolean;
  draggable?: boolean;
  onDragStart?: (word: Word) => void;
  onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLDivElement>, word: Word) => void;
}
