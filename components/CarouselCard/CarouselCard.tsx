import * as React from "react";
import Image from "next/image"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Card, CardContent } from "@/components/ui/card";
import Car from "@/public/car.jpg"
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
        className="h-[60vh] w-[60vw]"
      >
        <CarouselContent className="-mt-1 h-[60vh]">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="pt-1 h-[45vh] w-full">
                <Card className="h-full w-full">
                  <CardContent className="flex items-center justify-center p-6">
                  <div className="h-full w-full grid">
                        <Image src={props.ImgArr[index]} alt="Image" className="h-[40vh] w-full rounded-md object-cover" />
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
