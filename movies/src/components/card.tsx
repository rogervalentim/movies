import { useState } from 'react';
import { Eye, Film, Star } from 'lucide-react';
import { CardProps } from '@/types/types';

export function Card({ poster_path, title, name, vote_average }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        className="relative aspect-[2/3]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={title || name}
            className="cursor-pointer w-full h-full object-cover p-1 bg-zinc-800/60" />
        ) : (
          <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
            <Film
            className="h-full w-full object-cover text-zinc-500"                          
          />
         </div>
        )}
        {isHovered && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60">
            <div className="flex flex-col justify-center items-center">
              <Eye className="text-muted-foreground size-8 lg:size-14" />
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
