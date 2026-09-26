import { NodeAddDTO } from "@/api";

export type Folder = {
    children: Map<string, Folder | File>,
};


export default function CreateNodeAddDTOListFromFolders(
    folderMap: Map<string, Folder | File>
) {
    const nodes: NodeAddDTO[] = [];
    let clientInfoList: Map<string,File> = new Map();

    for (const [name, node] of folderMap) {
        if (node instanceof File) {
            // Leaf = file
            const clientId = crypto.randomUUID();

            nodes.push({
                name,
                type: "FILE",
                fileSize: node.size,
                fileContentType: node.type,
                fileClientId: clientId,
                folderChildren: null,
            });

            clientInfoList.set(clientId,node)

        } else {
            // Folder = recursively process its children
            const {nodes: subNodes, clientInfoList: subClientInfo} = CreateNodeAddDTOListFromFolders(node.children)

            nodes.push({
                name,
                type: "FOLDER",
                fileSize: null,
                fileContentType: null,
                fileClientId: null,
                folderChildren: subNodes,
            });

            clientInfoList = new Map([
                ...clientInfoList,
                ...subClientInfo
            ])
        }
    }

    return {nodes, clientInfoList};
}