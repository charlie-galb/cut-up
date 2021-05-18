import { chunk } from '../types/chunk'
import { chunkContainer } from '../types/chunkContainer'

interface initialState {
    activeId: string
    overId: string
    wordChunks: {
      [key: string]: string
    }
    chunkContainers: {
      [key: string]: chunkContainer
    }
    lineOrder: string[],
    poemAsText: string
  }

  const pasteBoard: chunkContainer = {
    id: 'chunk-container-1',
    title: 'pasteboard',
    nestedChunkIDs: []
  }

  const line1: chunkContainer = {
    id: 'chunk-container-2',
    title: 'line-1',
    nestedChunkIDs: []
  }

export const initialState: initialState = {
    activeId: "",
    overId: "",
    wordChunks: {},
    chunkContainers: {
      'chunk-container-1': pasteBoard,
      'chunk-container-2': line1
    },
    lineOrder: ['chunk-container-2'],
    poemAsText: ""
}