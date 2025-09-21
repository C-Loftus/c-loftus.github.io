/**
 * Copyright 2025 Colton Loftus
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { execSync } from "child_process";

// this plugin adds last modified time to frontmatter
// https://docs.astro.build/en/recipes/modified-time/
export function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.path; // instead of file.history[0]
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    file.data.astro.frontmatter.lastModified = result.toString();
  };
}
