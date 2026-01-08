import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import source from "@/lib/source";

export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
    const pages = source.getPages();
    let output = "# Dragonfly Documentation\n\n";
    output += "Dragonfly is a Minecraft Bedrock Edition server software written in Go.\n";
    output += "This file contains a concatenated, text-only version of documentation pages, optimized for Large Language Model consumption.\n\n";
    output += "---\n\n";

    // Sort pages by url/slug for consistent ordering
    pages.sort((a, b) => a.url.localeCompare(b.url));

    for (const page of pages) {
        const pageData = page as any;

        // Use 'path' property as confirmed by debug JSON
        if (!pageData.path) {
            continue;
        }

        const slug = page.slugs.join("/");

        // Construct absolute path: process.cwd() + 'content/docs' + relative path
        const filePath = path.join(process.cwd(), 'content', 'docs', pageData.path);

        try {
            const content = await fs.readFile(filePath, "utf8");

            // Simple frontmatter removal and title/desc extraction if needed
            // Fumadocs `page` object already has title/description from frontmatter
            const title = page.data.title;
            const description = page.data.description || "";
            const url = page.url;

            // Extract text from MDX content
            const textContent = extractTextFromMDX(content);

            output += `## ${title}\n\n`;
            if (description) {
                output += `${description}\n\n`;
            }
            output += `URL: ${url}\n\n`;
            output += `${textContent}\n\n`;
            output += "---\n\n";

        } catch (error) {
            console.error(`Error processing ${filePath}:`, error);
            // Continue to next file
        }
    }

    return new NextResponse(output, {
        headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": process.env.NODE_ENV === "development" ? "no-cache" : "public, max-age=3600",
        },
    });
}

function extractTextFromMDX(content: string): string {
    // Remove frontmatter
    let text = content.replace(/^---\n[\s\S]*?\n---\n/, "");

    // Remove import/export statements
    text = text.replace(/^import\s+.*$/gm, "");
    text = text.replace(/^export\s+.*$/gm, "");

    // Remove component tags but keep content if possible, or just strip lines starting with <
    // For simplicity, we'll keep the text mostly raw but clean up imports
    // A sophisticated extractor would strip HTML tags. 
    // Given "text-only version", let's strip HTML tags roughly.
    // This regex matches <TagName ...> or </TagName>
    // text = text.replace(/<[^>]+>/g, ""); // This might be too aggressive if code blocks contain <

    // Clean up multiple newlines
    text = text.replace(/\n{3,}/g, "\n\n");

    return text.trim();
}
