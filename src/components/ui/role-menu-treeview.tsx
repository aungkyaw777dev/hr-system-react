import { useState, useEffect, useMemo } from 'react';

// shadcn/ui-style imports (adjust paths for your project structure)
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';

// Types
export type Permission = 'view' | 'create' | 'edit' | 'delete';

export type MenuNode = {
    id: string;
    title: string;
    permissions?: Permission[]; // permissions available for this node
    children?: MenuNode[];
};

export type SelectedState = Record<
    string,
    {
        checked: boolean;
        permissions: Partial<Record<Permission, boolean>>; // only keys present in permissions[] are relevant
    }
>;

// Example usage data (you can pass this as props instead)
const exampleTree: MenuNode[] = [
    {
        id: 'dashboard',
        title: 'Dashboard',
        permissions: ['view'],
    },
    {
        id: 'employees',
        title: 'Employees',
        permissions: ['view', 'create', 'edit', 'delete'],
        children: [
            { id: 'employees.list', title: 'List', permissions: ['view', 'edit'] },
            { id: 'employees.payroll', title: 'Payroll', permissions: ['view', 'create'] },
        ],
    },
    {
        id: 'settings',
        title: 'Settings',
        permissions: ['view', 'edit'],
        children: [
            { id: 'settings.roles', title: 'Roles', permissions: ['view', 'create', 'edit', 'delete'] },
        ],
    },
];

// Utility: walk tree and produce flat list of ids
function flattenNodes(nodes: MenuNode[]) {
    const out: MenuNode[] = [];
    function walk(list: MenuNode[]) {
        for (const n of list) {
            out.push(n);
            if (n.children) walk(n.children);
        }
    }
    walk(nodes);
    return out;
}

// Component
export function RoleMenuTreeView({
    tree = exampleTree,
    onChange,
}: {
    tree?: MenuNode[];
    onChange?: (state: SelectedState) => void;
}) {
    // create initial selected state: default unchecked
    const allNodes = useMemo(() => flattenNodes(tree), [tree]);

    const initialState: SelectedState = useMemo(() => {
        const s: SelectedState = {};
        for (const n of allNodes) {
            s[n.id] = {
                checked: false,
                permissions: {},
            };
            if (n.permissions) {
                for (const p of n.permissions) s[n.id].permissions[p] = false;
            }
        }
        return s;
    }, [allNodes]);

    const [selected, setSelected] = useState<SelectedState>(initialState);
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    useEffect(() => {
        onChange?.(selected);
    }, [selected, onChange]);

    // helpers for tree traversal
    function getChildren(node: MenuNode): MenuNode[] {
        return node.children ?? [];
    }

    function updateNodeChecked(nodeId: string, checked: boolean) {
        // set node and all descendants
        const next = { ...selected };
        function walkSet(id: string, value: boolean) {
            next[id] = { ...next[id], checked: value };
            // also set permission flags to value for that node
            const node = allNodes.find((n) => n.id === id);
            if (node?.permissions) {
                const perms = { ...next[id].permissions };
                for (const p of node.permissions) perms[p] = value;
                next[id].permissions = perms;
            }

            const children = allNodes.filter((n) => n.id.startsWith(id + '.'));
            for (const c of children) walkSet(c.id, value);
        }
        walkSet(nodeId, checked);
        setSelected(next);
    }

    function updatePermission(nodeId: string, permission: Permission, value: boolean) {
        const next = { ...selected };
        next[nodeId] = {
            ...next[nodeId],
            permissions: { ...next[nodeId].permissions, [permission]: value },
        };

        // derive checked state: if any permission true => checked = true
        const perms = next[nodeId].permissions;
        next[nodeId].checked = Object.values(perms).some(Boolean);

        // optionally propagate up: if all children checked -> parent checked
        // We'll update ancestors' checked/permission status conservatively: if all children have that permission true -> set parent permission true
        function updateAncestors(id: string) {
            const parts = id.split('.');
            while (parts.length > 1) {
                parts.pop();
                const parentId = parts.join('.');
                const parentNode = allNodes.find((n) => n.id === parentId);
                if (!parentNode) continue;
                // for each permission on parent, set true only if every child has it true
                const children = allNodes.filter((n) => {
                    const parentPrefix = parentId + '.';
                    return n.id.startsWith(parentPrefix) && n.id.split('.').length === parentId.split('.').length + 1;
                });
                const parentPerms = { ...next[parentId].permissions };
                if (parentNode.permissions) {
                    for (const p of parentNode.permissions) {
                        parentPerms[p] = children.length > 0 && children.every((c) => !!next[c.id].permissions[p]);
                    }
                }
                next[parentId].permissions = parentPerms;
                next[parentId].checked = Object.values(parentPerms).some(Boolean);
            }
        }

        updateAncestors(nodeId);

        setSelected(next);
    }

    // indeterminate helper: returns {checked, indeterminate}
    function nodeCheckboxState(node: MenuNode) {
        const nodeState = selected[node.id];
        if (!nodeState) return { checked: false, indeterminate: false };

        // If node has children, compute checked/partial from descendants
        const directChildren = getChildren(node);
        if (!directChildren || directChildren.length === 0) {
            return { checked: nodeState.checked, indeterminate: false };
        }

        const childStates = directChildren.map((c) => selected[c.id]?.checked ?? false);
        const allChecked = childStates.every(Boolean);
        const noneChecked = childStates.every((v) => !v);
        if (allChecked) return { checked: true, indeterminate: false };
        if (noneChecked) return { checked: false, indeterminate: false };
        return { checked: true, indeterminate: true };
    }

    // Render one node recursively
    function NodeRow({ node, level = 0 }: { node: MenuNode; level?: number }) {
        const { checked, indeterminate } = nodeCheckboxState(node);

        return (
            <div>
                <div className="flex items-center gap-2 pl-4" style={{ paddingLeft: level * 12 }}>
                    {node.children && node.children.length > 0 ? (
                        <button
                            aria-label="toggle"
                            className="h-6 w-6 flex items-center justify-center"
                            onClick={() => setExpanded((s) => ({ ...s, [node.id]: !s[node.id] }))}
                        >
                            {expanded[node.id] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>
                    ) : (
                        <div style={{ width: 24 }} />
                    )}

                    <div className="flex items-center gap-2 flex-1">
                        <Checkbox
                            checked={checked}
                            onCheckedChange={(v) => updateNodeChecked(node.id, !!v)}
                            aria-label={`Select ${node.title}`}
                            className={indeterminate ? 'opacity-80' : ''}
                        />

                        <div className="flex-1">
                            <div className="font-medium">{node.title}</div>
                            {node.permissions && (
                                <div className="flex gap-2 mt-1">
                                    {node.permissions.map((p) => (
                                        <label key={p} className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={!!selected[node.id]?.permissions[p]}
                                                onChange={(e) => updatePermission(node.id, p, e.target.checked)}
                                                className="h-4 w-4"
                                            />
                                            <span className="capitalize">{p}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="text-xs text-muted-foreground">{node.id}</div>
                    </div>
                </div>

                {node.children && node.children.length > 0 && expanded[node.id] && (
                    <div className="mt-1">
                        {node.children.map((c) => (
                            <NodeRow key={c.id} node={c} level={level + 1} />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    function renderTree() {
        return tree.map((n) => <NodeRow key={n.id} node={n} />);
    }

    return (
        <Card>
            <CardContent>
                <div className="space-y-2">{renderTree()}</div>
            </CardContent>
        </Card>
    );
}
