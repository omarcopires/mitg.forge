import { Link } from "@tanstack/react-router";
import { Section } from "@/ui/Section";
import { SectionHeader } from "@/ui/Section/Header";
import { InnerSection } from "@/ui/Section/Inner";
import { NewstickerItem } from "./item";

const content =
	"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint itaque quidem, quo enim maxime incidunt minus ullam voluptas, quod aliquam est repellendus natus voluptates vero illum ratione non animi corrupti. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint itaque quidem, quo enim maxime incidunt minus ullam voluptas, quod aliquam est repellendus natus voluptates vero illum ratione non animi corrupti.";

export const NewstickerSection = () => {
	return (
		<Section>
			<SectionHeader color="green">
				<h1 className="section-title">Newsticker</h1>
			</SectionHeader>
			<InnerSection>
				<div className="flex flex-col">
					<NewstickerItem icon="community" title="Battle Pass">
						<Link to="/" className="text-blue-800 hover:underline">
							Teste Link
						</Link>{" "}
						{content}
					</NewstickerItem>
					<NewstickerItem icon="community" title="Battle Pass" inverted>
						{content}
					</NewstickerItem>
					<NewstickerItem icon="community" title="Battle Pass">
						{content}
					</NewstickerItem>
					<NewstickerItem icon="community" title="Battle Pass" inverted>
						{content}
					</NewstickerItem>
					<NewstickerItem icon="community" title="Battle Pass">
						{content}
					</NewstickerItem>
				</div>
			</InnerSection>
		</Section>
	);
};
