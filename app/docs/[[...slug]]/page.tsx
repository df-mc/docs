import source from "@/lib/source";
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from "fumadocs-ui/page";
import { notFound } from "next/navigation";
import defaultMdxComponents from "fumadocs-ui/mdx";

export default async function Page(props: {
    params: Promise<{ slug?: string[] }>;
}) {
    const params = await props.params;
    let page = source.getPage(params.slug);
    if (!page && !params.slug) {
        page = source.getPage(["getting-started"]);
    }
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
    return source.generateParams();
}

export async function generateMetadata(props: {
    params: Promise<{ slug?: string[] }>;
}) {
    const params = await props.params;
    let page = source.getPage(params.slug);
    if (!page && !params.slug) {
        page = source.getPage(["getting-started"]);
    }
    if (!page) notFound();

    return {
        title: page.data.title,
        description: page.data.description,
    };
}
