import { NodeTreeDTO } from "@/api";

export type TreeNode = NodeTreeDTO & {
    children: TreeNode[];
};
