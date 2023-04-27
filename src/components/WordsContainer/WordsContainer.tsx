import './WordsContainer.css';

import { WordCard } from 'components/WordCard';
import { useAppDispatch } from 'hooks';
import { DragEvent, FC, useState } from 'react';
import { setDragStarredWord, Word } from 'store/dictionary';

import { WordsContainerProps } from './types';

export const WordsContainer: FC<WordsContainerProps> = ({ words, sort }) => {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const dispatch = useAppDispatch();

  const dragStartHandler = (wordCard: Word) => {
    setCurrentWord(wordCard);
  };

  const dragOverHandler = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandler = (e: DragEvent<HTMLDivElement>, wordCard: Word) => {
    e.preventDefault();
    dispatch(setDragStarredWord({ wordCard, currentWord }));
  };

  const sortWords = (a: Word, b: Word) => (a.order > b.order ? 1 : -1);

  return (
    <div className="words-container">
      {sort
        ? [...words].sort(sortWords).map((word) => {
            return (
              <WordCard
                key={word.id}
                sort
                draggable
                word={word}
                onDragStart={dragStartHandler}
                onDragOver={dragOverHandler}
                onDrop={dropHandler}
              />
            );
          })
        : words.map((word) => <WordCard key={word.id} word={word} />)}
    </div>
  );
};
