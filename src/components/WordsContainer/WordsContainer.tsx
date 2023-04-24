import { WordCard } from 'components/WordCard';
import { Word } from 'components/WordCard/types';
import { useAppDispatch } from 'hooks';
import { useState } from 'react';
import { setDragStarredWord } from 'store/dictionary';

import { WordsContainerProps } from './types';

export const WordsContainer = ({ words, sort }: WordsContainerProps) => {
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const dispatch = useAppDispatch();

  const dragStartHandler = (wordCard: Word) => {
    setCurrentWord(wordCard);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, wordCard: Word) => {
    e.preventDefault();
    dispatch(setDragStarredWord({ wordCard, currentWord }));
  };

  const sortWords = (a: Word, b: Word) => {
    return a.order > b.order ? 1 : -1;
  };

  return (
    <div className="flex-auto flex flex-col gap-4 mb-10">
      {sort
        ? [...words].sort(sortWords).map((word) => {
            return (
              <div
                draggable
                key={word.id}
                onDragStart={() => dragStartHandler(word)}
                onDragOver={dragOverHandler}
                onDrop={(e) => dropHandler(e, word)}
              >
                <WordCard word={word} sort />
              </div>
            );
          })
        : words.map((word) => {
            return <WordCard key={word.id} word={word} />;
          })}
    </div>
  );
};
