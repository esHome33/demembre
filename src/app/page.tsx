import Calc from "@/components/Calc";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col  p-8">

			<div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
				<p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b 
        from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 
        dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
					Frais de donation de nue-propriété
				</p>
				<div className="fixed bottom-0 left-0 flex h-14 w-full items-center justify-center 
				bg-gradient-to-t from-white via-white dark:from-blue-950 dark:via-blue-900
				lg:static lg:size-auto lg:bg-none">
					<Link href={"https://www.eshome.fr"}>
						ESHome33 - &copy;2024
					</Link>
					
				</div>
			</div>

			<div className="mx-auto mt-20 lg:mt-4 lg:w-full lg:max-w-lg ">
				<Calc />
			</div>
		</main>
	);
}
