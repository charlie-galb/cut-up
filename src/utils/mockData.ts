import { chunkContainer } from "../types/chunkContainer"
import { chunk } from "../types/chunk"

export const mockChunk1: chunk = {
    id: "snippet1",
    text: "one and"
}

export const mockChunk2: chunk = {
    id: "snippet2",
    text: "two and"
}

export const mockChunk3: chunk = {
    id: "snippet3",
    text: "three and"
}

export const mockChunks = [mockChunk1, mockChunk2]

export const mockContainer1: chunkContainer = {
    id: 'chunk-container-1',
    title: 'pasteboard',
    chunks: mockChunks
  }

export const mockContainer2: chunkContainer = {
id: 'chunk-container-2',
title: 'Line-1',
chunks: mockChunks
}

export const mockContainers = {
    [mockContainer1.id]: mockContainer1,
    [mockContainer2.id]: mockContainer2,
}

export const mockLineOrder = [mockContainer1.id, mockContainer2.id]