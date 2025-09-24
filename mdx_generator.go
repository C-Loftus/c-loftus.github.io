package main

import (
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"
)

func main() {
	// CLI flags
	title := flag.String("title", "", "Title of the post (required)")
	tags := flag.String("tags", "", "Comma-separated list of tags (required)")
	summary := flag.String("summary", "", "Short summary of the post (required)")
	draft := flag.Bool("draft", false, "Set draft status")
	filename := flag.String("filename", "", "Filename for the .mdx file (required, with or without .mdx extension)")
	flag.Parse()

	// Validate required flags
	missing := []string{}
	if *filename == "" {
		missing = append(missing, "filename")
	}

	if len(missing) > 0 {
		fmt.Printf("Error: missing required flags: %s\n\n", strings.Join(missing, ", "))
		flag.Usage()
		os.Exit(1)
	}

	// Ensure writings directory exists
	dir := "src/pages/writings"
	if err := os.MkdirAll(dir, os.ModePerm); err != nil {
		fmt.Println("Error creating writings directory:", err)
		os.Exit(1)
	}

	// Normalize filename
	if !strings.HasSuffix(*filename, ".mdx") {
		*filename += ".mdx"
	}

	// Build full path
	filePath := filepath.Join(dir, *filename)

	// Format tags
	tagList := []string{}
	for _, t := range strings.Split(*tags, ",") {
		tagList = append(tagList, fmt.Sprintf("\"%s\"", strings.TrimSpace(t)))
	}
	tagString := "[" + strings.Join(tagList, ", ") + "]"

	// Build frontmatter
	content := fmt.Sprintf(`---
title: "%s"
date: %s
draft: %t
tags: %s
summary: "%s"
layout: %s
---

`, *title, time.Now().UTC().Format(time.RFC3339), *draft, tagString, *summary, "../../layouts/CenteredText.astro")

	// Write file
	if err := os.WriteFile(filePath, []byte(content), 0644); err != nil {
		fmt.Println("Error writing file:", err)
		os.Exit(1)
	}

	fmt.Println("Created:", filePath)
}
