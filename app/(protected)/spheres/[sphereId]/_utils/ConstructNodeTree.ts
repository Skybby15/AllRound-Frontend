import { NodeTreeInfoDTO } from "@/api";
import { TreeNode } from "../_types/TreeNode";

export default function ConstructNodeTree(nodes: NodeTreeInfoDTO[]) {
    const nodeMap = new Map<number, TreeNode>();

    // Create TreeNodes
    for (const node of nodes) {
        nodeMap.set(node.id!, {
            ...node,
            children: [],
        });
    }

    const roots: TreeNode[] = [];

    // Connect parents and children
    for (const node of nodes) {
        const treeNode = nodeMap.get(node.id!)!;

        if (node.parentId == null) {
            roots.push(treeNode);
        } else {
            const parent = nodeMap.get(node.parentId!);

            if (parent) {
                parent.children.push(treeNode);
            }
        }
    }

    return roots;
}
