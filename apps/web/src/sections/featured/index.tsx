import { Section } from "@/ui/Section";
import { SectionHeader } from "@/ui/Section/Header";
import { InnerSection } from "@/ui/Section/Inner";

export const FeaturedSection = () => {
	return (
		<Section>
			<SectionHeader color="green">
				<h2 className="section-title">Featured Article</h2>
			</SectionHeader>
			<InnerSection>
				<div className="flex flex-col justify-between gap-3 px-3 py-1 md:flex-row">
					<div className="flex flex-col gap-2">
						<h3 className="font-bold text-secondary text-sm">
							➤ Miforge ✦ Brazil Host Low Ping ✦
						</h3>
						<span className="max-w-xl text-secondary text-xs">
							Acesse nosso Discord e fique por dentro das novidades, eventos e
							atualizações dos maiores e mais completos servidores da
							atualidade.
						</span>
					</div>
					<img
						alt="featured-section"
						src="/assets/background/background-artwork.webp"
						className="max-w-56 rounded-sm"
					/>
				</div>
			</InnerSection>
		</Section>
	);
};
