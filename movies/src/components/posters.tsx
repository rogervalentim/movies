interface PostersComponentProps {
    file_path: string;
}

export function Posters({file_path}: PostersComponentProps) {
return (
    <>
     <img 
     key={file_path}
    src={`https://image.tmdb.org/t/p/w342${file_path}`} 
    className="cursor-pointer w-72 h-[250px] border-4 border-border lg:w-96 lg:h-[350px]"
/>
    </>
)
}