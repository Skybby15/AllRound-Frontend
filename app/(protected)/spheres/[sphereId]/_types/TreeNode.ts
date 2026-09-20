import { NodeTreeInfoDTO } from "@/api";

export type TreeNode = NodeTreeInfoDTO & {
    children: TreeNode[];
};
