import { chunk } from "./chunk"

export type chunkContainer = {
    id: string
    title: string
    nestedChunks: chunk[]
}