import source from "@/lib/source";
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";

const pageAliases: Record<string, string[]> = {
    guides: ["tutorials"],
    "guides/migration": ["migration"],
    "resources/what-is-dragonfly": ["welcome"],
};

function resolveSlug(slug?: string[]) {
    if (!slug || slug.length === 0) {
        return ["getting-started"];
    }

    return pageAliases[slug.join("/")] ?? slug;
}

export default async function Page(props: {
    params: Promise<{ slug?: string[] }>;
}) {
    const params = await props.params;
    const page = source.getPage(resolveSlug(params.slug));
    if (!page) notFound();

    const MDX = page.data.body;

    return (
        <DocsPage toc={page.data.toc} full={page.data.full}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription>{page.data.description}</DocsDescription>
            <DocsBody>
                <MDX components={{ ...defaultMdxComponents }} />
            </DocsBody>
        </DocsPage>
    );
}

export async function generateStaticParams() {
    return [
        { slug: [] },
        ...Object.keys(pageAliases).map((slug) => ({ slug: slug.split("/") })),
        ...source.generateParams(),
    ];
}

export async function generateMetadata(props: {
    params: Promise<{ slug?: string[] }>;
}) {
    const params = await props.params;
    const page = source.getPage(resolveSlug(params.slug));
    if (!page) notFound();

    return {
        title: page.data.title,
        description: page.data.description,
    };
}
