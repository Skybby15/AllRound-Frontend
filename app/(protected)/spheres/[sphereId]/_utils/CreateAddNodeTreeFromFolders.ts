import { NodeAddDTO } from "@/api";

export type Folder = {
    children: Map<string, Folder | File>,
};

export default function CreateNodeAddDTOListFromFolders(
    folderMap: Map<string, Folder | File>
): NodeAddDTO[] {
    const nodes: NodeAddDTO[] = [];

    for (const [name, value] of folderMap) {
        if (value instanceof File) {
            // Leaf = file
            nodes.push({
                name,
                type: "FILE",
                fileSize: value.size,
                contentType: value.type,
                folderChildren: null,
            });
        } else {
            // Folder = recursively process its children
            nodes.push({
                name,
                type: "FOLDER",
                fileSize: null,
                contentType: null,
                folderChildren: CreateNodeAddDTOListFromFolders(value.children),
            });
        }
    }

    return nodes;
}