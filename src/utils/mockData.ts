import { chunkContainer } from "../types/chunkContainer"

export const mockChunks = {
    "1": "one",
    "2": "two"
}

export const mockChunkIDs = ["1", "2"]

export const mockContainer1: chunkContainer = {
    id: 'chunk-container-1',
    title: 'pasteboard',
    nestedChunkIDs: mockChunkIDs
  }

export const mockContainer2: chunkContainer = {
id: 'chunk-container-2',
title: 'Line-1',
nestedChunkIDs: mockChunkIDs
}

export const mockContainers = {
    [mockContainer1.id]: mockContainer1,
    [mockContainer2.id]: mockContainer2,
}

export const mockLineOrder = [mockContainer1.id, mockContainer2.id]