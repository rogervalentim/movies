import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Skeleton } from "./ui/skeleton";

export function SkeletonCategory() {
    return (
        <>
          <Skeleton className="h-2 w-64 py-4 ml-5" />
      <Carousel className="px-5">
            <CarouselContent className="-ml-2 py-2 md:-ml-4">
              {[...Array(10)].map((_, index) => (
                <CarouselItem key={index} className="relative w-40 basis-1/3 md:basis-1/4 md:w-52 lg:w-64">
                  <Skeleton className="h-[380px] rounded-none w-64" />
                  <Skeleton className="h-5 w-56 mt-2 rounded-none" />
                  <Skeleton className="h-5 w-12 mt-2 rounded-none" />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </>
    )
}