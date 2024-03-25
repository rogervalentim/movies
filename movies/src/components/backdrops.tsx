interface BackdropsComponentProps {
  file_path: string;
}

export function Backdrops({ file_path }: BackdropsComponentProps) {
  return (
    <img
      key={file_path}
      src={`https://image.tmdb.org/t/p/w780${file_path}`}
      className="cursor-pointer border-4 object-cover border-border"
      alt="Backdrop"
    />
  );
}
