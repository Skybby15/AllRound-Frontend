import { NodeAddDTO } from "@/api";


export default function CreateAddNodeTreeFromFiles(files: File[])
{
    return files.map((file) => {
        const dto : NodeAddDTO = {
            name: file.name,
            type: "FILE",
            fileSize: file.size,
            contentType: file.type,
            folderChildren: null
        }

        return dto;
    })
}