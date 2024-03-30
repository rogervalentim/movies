import { NavLink } from "react-router-dom";
import { Input } from "./ui/input";
import { SearchProps } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { SearchComponent } from "./search-component";
import { useMediaQuery } from 'react-responsive';


const apiKey = import.meta.env.VITE_API_KEY;

export function Header() {
    const [searchData, setSearchData] = useState<string>('');
    const [searchVisible, setSearchVisible] = useState<boolean>(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const [inputMobile, setInputMobile] = useState(false);

    const isMobile = useMediaQuery({ maxWidth: 767 });

    const { data: searchResults, isLoading: searchIsLoading, isError } = useQuery<SearchProps[]>({
        queryKey: ["search", searchData],
        queryFn: async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/search/multi?query=${searchData}&api_key=${apiKey}&include_adult=false&language=pt-BR`
                );
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados.');
                }

                const data = await response.json();

                return data.results;

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
                throw error;
            }
        },
        enabled: !!searchData,
    });

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setSearchVisible(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchRef]);

    function handleSearch(event: ChangeEvent<HTMLInputElement>): void {
        const query: string = event.target.value;
        setSearchData(query);
        setSearchVisible(true);
    }

    function clearSearch(): void {
        setSearchData('');
        setSearchVisible(false);
        setInputMobile(false);
    }

    function toggleInputMobile() {
        setInputMobile(true);
        setSearchVisible(true); 
    }

    function closeInputMobile() {
        setInputMobile(false);
        setSearchData('');
    }

    return (
        <>
           
           <header className={`sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${inputMobile ? 'hidden' : ''}`}>
                <div className="px-5 h-12 flex justify-between border-b border-border/40 items-center flex-row">
                    <div className="flex items-center gap-6">
                        <NavLink to="/" className="flex items-center space-x-2">
                            <span className="text-lg lg:text-xl font-bold">Roger's Cine</span>
                        </NavLink>
    
                    </div>
                    {!isMobile && (
                        <div className="flex flex-col" ref={searchRef}>
                            <div className="relative">
                                <Input 
                                    type="text"  
                                    placeholder="Procure filmes, séries, atores e etc..." 
                                    className="md:w-[400px] lg:w-[600px] h-10"
                                    value={searchData}
                                    onChange={handleSearch} 
                                    aria-label="Caixa de pesquisa"
                                />
                                <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" /> 
                                </span>
                            </div>
                            {isError && <div>Ocorreu um erro ao buscar os dados.</div>}
                            {searchVisible && searchResults && searchResults.length > 0  && (
                                <SearchComponent 
                                    searchResults={searchResults} 
                                    clearSearch={clearSearch} 
                                    searchIsLoading={searchIsLoading}
                                />
                            )}
                        </div>
                    )}
                    <div className="flex items-center gap-4">
                        <button aria-label="Abrir pesquisa" onClick={toggleInputMobile} >
                            <Search className="h-5 w-5 text-gray-400 md:hidden lg:hidden" /> 
                        </button>
                        <NavLink to="/movies" className="text-foreground/60 hover:text-foreground text-base lg:text-lg">Filmes</NavLink>
                        <NavLink to="/tv" className="text-foreground/60 hover:text-foreground text-base lg:text-lg">Séries</NavLink>
                    </div>
                </div>
            </header>
            {inputMobile && (
                <div className={`w-full bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60 fixed top-0 z-50`}>
                    <div className="flex justify-between items-center bg-[#121212] px-5 h-14">
                                <input 
                                    type="text"  
                                    placeholder="Procure filmes, séries, atores e etc..." 
                                    className="w-full 0 text-lg bg-[#121212] outline-none"
                                    value={searchData}
                                    onChange={handleSearch}
                                    aria-label="Caixa de pesquisa" 
                                />
                                <span className="flex items-center">
                                    <button aria-label="Fechar pesquisa" onClick={closeInputMobile}>
                                    <X className="h-5 w-5 text-gray-400"   /> 
                                    </button>
                                </span>
                            </div>
                    
                    {isError && <div>Ocorreu um erro ao buscar os dados.</div>}
                    {searchVisible && searchResults && searchResults.length > 0  && (
                        <SearchComponent 
                            searchResults={searchResults} 
                            clearSearch={clearSearch} 
                            searchIsLoading={searchIsLoading}
                        />
                    )}
                </div>
            )}
        </>
    );
    
}

