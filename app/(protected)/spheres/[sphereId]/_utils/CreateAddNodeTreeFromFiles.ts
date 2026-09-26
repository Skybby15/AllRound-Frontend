import { NodeAddDTO } from "@/api";


export default function CreateAddNodeTreeFromFiles(files: File[])
{
    const clientInfoList : Map<string,File> = new Map();
    const nodes : NodeAddDTO[] = []

    files.forEach((file) => {
        const clientId = crypto.randomUUID();

        const dto : NodeAddDTO = {
            name: file.name,
            type: "FILE",

            fileSize: file.size,
            fileContentType: file.type,
            fileClientId: clientId,

            folderChildren: null
        }

        nodes.push(dto)
        clientInfoList.set(clientId,file)
    })

    return {nodes, clientInfoList}
}