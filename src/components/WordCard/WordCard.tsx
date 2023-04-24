import { useAppDispatch } from 'hooks';
import React, { useState } from 'react';
import { toggleFavorite } from 'store/dictionary';

import { WordProps } from './types';

export const WordCard = ({ word, sort }: WordProps) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const handleToggleFavorite = (
    event: React.MouseEvent | React.KeyboardEvent
  ) => {
    event.stopPropagation();
    dispatch(toggleFavorite(word));
  };

  const handleExpandRow = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <div className="bg-white rounded-sm px-4 py-2">
      <div
        onClick={handleExpandRow}
        onKeyDown={handleExpandRow}
        className="flex flex-row justify-between items-center hover:cursor-pointer"
      >
        <div className="flex gap-8">
          {sort && <div className="cursor-grab">≡</div>}
          <span className="font-bold whitespace-nowrap">{word.word}</span>
          <span className="italic whitespace-nowrap">{word.partOfSpeech}</span>
          <span className="truncate max-w-2xl">{word.shortdef[0]}</span>
        </div>
        <div
          onClick={handleToggleFavorite}
          onKeyDown={handleToggleFavorite}
          className="text-xl text-sky-600 hover:cursor-pointer"
        >
          {word.starred ? '★' : '☆'}
        </div>
      </div>
      {expanded && (
        <div className="py-2">
          {word.shortdef.length !== 0 && (
            <div>
              Definitions:
              {word.shortdef.map((shortdef, i) => (
                <li key={i}>{shortdef}</li>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
