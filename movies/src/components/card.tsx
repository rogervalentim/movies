import { useState } from 'react';
import { Eye, Star } from 'lucide-react';
import { TmdbProps } from '@/types/types';
import film from '@/assets/film.svg';

export function Card({ poster_path, title, name, vote_average }: TmdbProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={poster_path === null ? film : `https://image.tmdb.org/t/p/w342/${poster_path}`}
          alt={title || name}
          className="cursor-pointer border-4 border-border w-36 h-[250px] md:w-52 md:h-[300px] lg:w-64 lg:h-[350px]"
        />
        {isHovered && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60">
            <div className="flex flex-col justify-center items-center">
              <Eye  className="text-muted-foreground size-8 lg:size-14" />
              <p className="text-muted-foreground text-base lg:text-lg">Ver detalhes</p>
            </div>
          </div>
        )}
      </div>
      <p className="text-white text-base w-36 lg:text-lg lg:w-52 mt-2">
        {title || name}
      </p>
      <div className="flex items-center gap-2 mt-3">  
        <span><Star className="fill-amber-300 text-amber-300 size-5" /></span>
        <p className="text-muted-foreground text-sm lg:text-base">{vote_average.toFixed(2)}</p>
      </div>

    </>
  );
}
