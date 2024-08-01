import Calc from "@/components/Calc";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col  p-8">

			<div className="z-10 w-full  items-center justify-between font-mono text-sm md:flex">
				<p className="fixed left-0 top-0 flex w-full justify-center 
				border-b border-gray-300 
				bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl 
				dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit
				md:static md:w-auto md:rounded-xl md:border md:bg-gray-200 md:p-4 md:dark:bg-zinc-800/30">
					Frais de donation de nue-propriété
				</p>
				<div className="fixed bottom-0 left-0 flex h-14 w-full items-center justify-center 
				bg-gradient-to-t from-white via-white dark:from-blue-950 dark:via-blue-900
				md:static md:size-auto md:bg-none lg:p-1">
					<Link
						href={"https://www.eshome.fr"}
						className="mr-2 text-xs"
					>
						&copy; ESHome33 2024
					</Link>
					|
					<Link
						href={"/data"}
						className="ml-2 text-xs text-blue-200"
					>
						données calculs
					</Link>
				</div>
				
			</div>

			<div className="mx-auto mt-20 lg:mt-4 w-full px-2 lg:max-w-lg ">
				<Calc />
			</div>

			

		</main>
	);
}
