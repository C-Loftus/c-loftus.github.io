import { execSync } from "child_process";

// this plugin adds last modified time to frontmatter
// https://docs.astro.build/en/recipes/modified-time/
export function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    file.data.astro.frontmatter.lastModified = result.toString();
  };
}