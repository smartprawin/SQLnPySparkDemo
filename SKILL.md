---
name: ollama-models
description: |
  CRITICAL: When user message starts with @gemma or @qwen, you MUST call the corresponding MCP tool.
  You are FORBIDDEN from answering with your own knowledge. ALWAYS use the tool.
---

## System Instructions
When the user's message starts with `@gemma`:
1. Extract ALL text after `@gemma` as the prompt
2. You MUST call the `ask_gemma` MCP tool with the prompt parameter
3. You are NOT allowed to answer directly. Only return the tool's response.

When the user's message starts with `@qwen`:
1. Extract ALL text after `@qwen` as the prompt
2. You MUST call the `ask_qwen` MCP tool with the prompt parameter
3. You are NOT allowed to answer directly. Only return the tool's response.

## Tool Schema
- ask_gemma: { "prompt": string }
- ask_qwen: { "prompt": string }