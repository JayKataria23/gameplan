import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Surprise Your Loved Ones with Custom Games
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Create personalized, heartfelt gaming experiences that will bring
              joy and excitement to your special someone.
            </p>
          </div>
          <div className="space-x-4">
            <Button asChild>
              <Link href="/create">Create Your Game</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/explore">Explore Games</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="container px-4 md:px-6 mt-12">
        <Card className="w-full max-w-4xl mx-auto">
          <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-r border-gray-200 dark:border-gray-800 px-4 py-2">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Customizable Templates
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 border-r border-gray-200 dark:border-gray-800 px-4 py-2">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Happy Recipients
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2 px-4 py-2">
                <div className="text-3xl font-bold">5 min</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Average Creation Time
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
