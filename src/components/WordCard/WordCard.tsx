import './WordCard.css';

import { useAppDispatch } from 'hooks';
import { FC, KeyboardEvent, MouseEvent, useState } from 'react';
import { toggleStarredWord } from 'store/dictionary';

import { WordCardProps } from './types';

export const WordCard: FC<WordCardProps> = ({
  word,
  sort,
  draggable,
  onDragStart,
  onDragOver,
  onDrop,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useAppDispatch();

  const handleToggleStarredWord = (event: MouseEvent | KeyboardEvent) => {
    event.stopPropagation();
    dispatch(toggleStarredWord(word));
  };

  const handleExpandRow = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className="word-card"
      draggable={draggable}
      onDragStart={() => onDragStart?.(word)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop?.(e, word)}
    >
      <div
        onClick={handleExpandRow}
        onKeyDown={handleExpandRow}
        className="word-card__main-info"
      >
        {sort && <span className="word-card__sort-icon">≡</span>}
        <span className="word-card__title">{word.word}</span>
        <span className="word-card__part">{word.partOfSpeech}</span>
        <span className="word-card__shortdef">{word.shortdef[0]}</span>
        <span
          onClick={handleToggleStarredWord}
          onKeyDown={handleToggleStarredWord}
          className="word-card__star"
        >
          {word.starred ? '★' : '☆'}
        </span>
      </div>

      {!!word.shortdef.length && isExpanded && (
        <div className="word-card__expand-row">
          Definitions:
          {word.shortdef.map((shortdef, index) => (
            <li key={index}>{shortdef}</li>
          ))}
        </div>
      )}
    </div>
  );
};
