import { Section } from "@/ui/Section";
import { SectionHeader } from "@/ui/Section/Header";
import { InnerSection } from "@/ui/Section/Inner";

export const NewsSection = () => {
	return (
		<Section>
			<SectionHeader color="green">
				<h2 className="section-title">News</h2>
			</SectionHeader>
			<InnerSection>News</InnerSection>
		</Section>
	);
};
