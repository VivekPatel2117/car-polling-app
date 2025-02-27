import * as React from "react";
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselCard({...props}) {
  return (
    <div className="grid w-screen justify-center">
      <Carousel
        opts={{
          align: "start",
        }}
        orientation="vertical"
        className="h-[60vh] w-screen lg:w-[65vw] mb-1"
      >
        <CarouselContent className="-mt-1 h-[65vh]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="h-full p-0 w-full">
                <Card className="h-[60vh] w-full mt-1 mb-1">
                  <CardContent className="flex items-center justify-center">
                  <div className="h-full w-full grid items-center mt-4">
                        <Image src={props.ImgArr[index]} alt="Image" className="h-[55vh] w-full rounded-md lg:object-cover object-contain" />
                        <div className="text-content">
                           {props.name}
                        </div>
                    </div>
                  </CardContent>
                </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
