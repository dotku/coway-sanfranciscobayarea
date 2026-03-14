"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  type NodeProps,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

interface MemberAddress {
  label: string;
  address: string;
  zip_code: string | null;
}

interface TreeMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  referral_code: string;
  referred_by: string | null;
  created_at: string;
  visit_count: number;
  signup_count: number;
  addresses: MemberAddress[];
}

interface TreeNode extends TreeMember {
  children: TreeNode[];
}

function buildTree(members: TreeMember[]): TreeNode[] {
  const codeMap = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  for (const m of members) {
    codeMap.set(m.referral_code, { ...m, children: [] });
  }

  for (const m of members) {
    const node = codeMap.get(m.referral_code)!;
    if (m.referred_by && codeMap.has(m.referred_by)) {
      codeMap.get(m.referred_by)!.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

// Custom node component
function MemberNode({ data }: NodeProps) {
  const member = data as unknown as TreeMember & { isRoot?: boolean; selected?: boolean };

  return (
    <div
      style={{
        background: "white",
        borderRadius: 12,
        border: member.selected
          ? "2px solid #005A7A"
          : member.isRoot
            ? "2px solid #00A8E3"
            : "2px solid #E5E7EB",
        padding: "12px 16px",
        width: NODE_WIDTH,
        boxSizing: "border-box",
        boxShadow: member.selected
          ? "0 0 0 3px rgba(0,168,227,0.2)"
          : "0 1px 3px rgba(0,0,0,0.08)",
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: "#CBD5E1", width: 8, height: 8 }} />

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: member.isRoot ? "#00A8E3" : "#E6F7FC",
            color: member.isRoot ? "white" : "#005A7A",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: 14,
            flexShrink: 0,
          }}
        >
          {member.name.charAt(0).toUpperCase()}
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontWeight: 600, fontSize: 14, color: "#111827", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {member.name}
          </p>
          <p style={{ fontSize: 11, color: "#9CA3AF", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {member.email}
          </p>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontFamily: "monospace", fontSize: 11, background: "#E6F7FC", color: "#005A7A", padding: "2px 8px", borderRadius: 4 }}>
          {member.referral_code}
        </span>
        {member.isRoot && (
          <span style={{ fontSize: 10, background: "#00A8E3", color: "white", padding: "2px 6px", borderRadius: 4 }}>
            ROOT
          </span>
        )}
      </div>

      <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#6B7280" }}>
        <span><strong style={{ color: "#00A8E3" }}>{member.visit_count}</strong> visits</span>
        <span><strong style={{ color: "#00A8E3" }}>{member.signup_count}</strong> signups</span>
      </div>

      <Handle type="source" position={Position.Bottom} style={{ background: "#CBD5E1", width: 8, height: 8 }} />
    </div>
  );
}

const nodeTypes = { member: MemberNode };

// Layout constants
const NODE_WIDTH = 220;
const NODE_HEIGHT = 110;
const H_GAP = 60;
const V_GAP = 80;

interface LayoutResult {
  x: number;
  width: number;
  children: LayoutResult[];
  node: TreeNode;
}

function computeLayout(treeNode: TreeNode): LayoutResult {
  if (treeNode.children.length === 0) {
    return { x: 0, width: NODE_WIDTH, children: [], node: treeNode };
  }

  const childLayouts = treeNode.children.map((c) => computeLayout(c));
  const totalChildWidth = childLayouts.reduce((s, c) => s + c.width, 0) + H_GAP * (childLayouts.length - 1);
  const width = Math.max(NODE_WIDTH, totalChildWidth);

  let cx = 0;
  for (const child of childLayouts) {
    child.x = cx + child.width / 2 - NODE_WIDTH / 2;
    cx += child.width + H_GAP;
  }

  return {
    x: totalChildWidth / 2 - NODE_WIDTH / 2,
    width,
    children: childLayouts,
    node: treeNode,
  };
}

function flattenLayout(
  layout: LayoutResult,
  offsetX: number,
  depth: number,
  isRoot: boolean,
  selectedId: number | null,
  nodes: Node[],
  edges: Edge[]
) {
  const x = offsetX + layout.x;
  const y = depth * (NODE_HEIGHT + V_GAP);
  const nodeId = String(layout.node.id);

  nodes.push({
    id: nodeId,
    type: "member",
    position: { x, y },
    data: { ...layout.node, isRoot, selected: layout.node.id === selectedId },
  });

  for (const child of layout.children) {
    const childId = String(child.node.id);
    edges.push({
      id: `${nodeId}-${childId}`,
      source: nodeId,
      target: childId,
      type: "default",
      style: { stroke: "#CBD5E1", strokeWidth: 2 },
      animated: false,
    });
    flattenLayout(child, offsetX, depth + 1, false, selectedId, nodes, edges);
  }
}

// Detail panel component
function DetailPanel({
  member,
  referrerName,
  onClose,
  onDelete,
  onUpdate,
}: {
  member: TreeMember;
  referrerName: string | null;
  onClose: () => void;
  onDelete: (id: number, name: string) => void;
  onUpdate: (id: number, data: { name: string; email: string; phone: string }) => Promise<void>;
}) {
  const [copied, setCopied] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(member.name);
  const [editEmail, setEditEmail] = useState(member.email);
  const [editPhone, setEditPhone] = useState(member.phone || "");
  const [saving, setSaving] = useState(false);
  const referralLink = typeof window !== "undefined"
    ? `${window.location.origin}/r/${member.referral_code}`
    : `/r/${member.referral_code}`;

  function handleCopy() {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function startEdit() {
    setEditName(member.name);
    setEditEmail(member.email);
    setEditPhone(member.phone || "");
    setEditing(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await onUpdate(member.id, { name: editName, email: editEmail, phone: editPhone });
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-full rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-900 focus:border-[#00A8E3] focus:ring-2 focus:ring-[#00A8E3]/20 outline-none";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#E6F7FC] text-[#005A7A] flex items-center justify-center font-bold text-xl">
            {member.name.charAt(0).toUpperCase()}
          </div>
          <div>
            {editing ? (
              <input value={editName} onChange={(e) => setEditName(e.target.value)} className={inputClass} placeholder="Name" />
            ) : (
              <h3 className="text-lg font-semibold text-[#005A7A]">{member.name}</h3>
            )}
            <span className="font-mono text-sm bg-[#E6F7FC] text-[#005A7A] px-2 py-0.5 rounded mt-1 inline-block">
              {member.referral_code}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!editing && (
            <button
              onClick={startEdit}
              className="text-[#00A8E3] hover:text-[#0097CC] p-1"
              title="Edit"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Referral Link */}
      <div className="mb-4 bg-gray-50 border border-gray-200 rounded-lg p-3">
        <p className="text-xs text-gray-400 mb-1.5">Referral Link 推荐链接</p>
        <div className="flex items-center gap-2">
          <span className="flex-1 font-mono text-sm text-gray-700 truncate">
            {referralLink}
          </span>
          <button
            onClick={handleCopy}
            className="flex-shrink-0 px-3 py-1.5 rounded-md bg-[#00A8E3] text-white text-xs font-medium hover:bg-[#0097CC] transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Contact Info */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            Contact 联系方式
          </h4>
          {editing ? (
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Email</label>
                <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} className={inputClass} placeholder="Email" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Phone 电话</label>
                <input value={editPhone} onChange={(e) => setEditPhone(e.target.value)} className={inputClass} placeholder="Phone" />
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${member.email}`} className="text-sm text-[#00A8E3] hover:text-[#0097CC]">
                  {member.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href={`tel:${member.phone}`} className="text-sm text-[#00A8E3] hover:text-[#0097CC]">
                  {member.phone || "—"}
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            Stats 数据
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-[#00A8E3]">{member.visit_count}</p>
              <p className="text-xs text-gray-500">Visits</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-3 text-center">
              <p className="text-xl font-bold text-[#00A8E3]">{member.signup_count}</p>
              <p className="text-xs text-gray-500">Signups</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit action buttons */}
      {editing && (
        <div className="mt-4 flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-[#00A8E3] text-white text-sm font-medium hover:bg-[#0097CC] transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save 保存"}
          </button>
          <button
            onClick={() => setEditing(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel 取消
          </button>
        </div>
      )}

      {/* Referral Info */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {referrerName && (
            <div>
              <span className="text-gray-400">Referred by 推荐人: </span>
              <span className="text-gray-700 font-medium">{referrerName}</span>
              <span className="text-gray-400 ml-1">({member.referred_by})</span>
            </div>
          )}
          <div>
            <span className="text-gray-400">Joined 加入时间: </span>
            <span className="text-gray-700">{new Date(member.created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Addresses */}
      {member.addresses.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
            Locations 地址
          </h4>
          <div className="space-y-2">
            {member.addresses.map((addr, i) => (
              <div key={i} className="flex items-start gap-2">
                <svg className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-sm">
                  <span className="font-medium text-gray-700">{addr.label}</span>
                  <span className="text-gray-400 mx-1">·</span>
                  <span className="text-gray-500">
                    {addr.address}{addr.zip_code ? ` ${addr.zip_code}` : ""}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete */}
      {!editing && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => onDelete(member.id, member.name)}
            className="text-sm text-red-500 hover:text-red-700 font-medium"
          >
            Remove Member 删除成员
          </button>
        </div>
      )}
    </div>
  );
}

export default function GraphTree() {
  const [members, setMembers] = useState<TreeMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/team/tree")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMembers(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedId((prev) => (prev === Number(node.id) ? null : Number(node.id)));
  }, []);

  async function handleUpdate(id: number, data: { name: string; email: string; phone: string }) {
    const res = await fetch("/api/team", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...data }),
    });
    if (res.ok) {
      const updated = await res.json();
      setMembers((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, name: updated.name, email: updated.email, phone: updated.phone } : m
        )
      );
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Remove ${name} from the team? 确定要删除 ${name} 吗？`)) return;
    try {
      const res = await fetch(`/api/team?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMembers((prev) => prev.filter((m) => m.id !== id));
        setSelectedId(null);
      }
    } catch {
      /* ignore */
    }
  }

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading...</div>;
  }

  const tree = buildTree(members);
  const totalVisits = members.reduce((s, m) => s + m.visit_count, 0);
  const totalSignups = members.length;

  // Build React Flow nodes & edges
  const nodes: Node[] = [];
  const edges: Edge[] = [];

  let currentOffset = 0;
  for (const root of tree) {
    const layout = computeLayout(root);
    flattenLayout(layout, currentOffset, 0, true, selectedId, nodes, edges);
    currentOffset += layout.width + H_GAP * 2;
  }

  // Find selected member and referrer name
  const selectedMember = selectedId ? members.find((m) => m.id === selectedId) : null;
  const referrerName = selectedMember?.referred_by
    ? members.find((m) => m.referral_code === selectedMember.referred_by)?.name || null
    : null;

  return (
    <div>
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 text-center">
          <p className="text-2xl font-bold text-[#005A7A]">{totalSignups}</p>
          <p className="text-sm text-gray-500">Total Members</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 text-center">
          <p className="text-2xl font-bold text-[#00A8E3]">{totalVisits}</p>
          <p className="text-sm text-gray-500">Total Visits</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 text-center col-span-2 sm:col-span-1">
          <p className="text-2xl font-bold text-[#00A8E3]">
            {totalVisits > 0
              ? ((totalSignups / totalVisits) * 100).toFixed(1) + "%"
              : "—"}
          </p>
          <p className="text-sm text-gray-500">Conversion Rate</p>
        </div>
      </div>

      {/* React Flow Tree */}
      <div
        ref={containerRef}
        className={
          fullscreen
            ? "fixed inset-0 z-50 bg-white"
            : "bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        }
        style={fullscreen ? {} : { height: 550 }}
      >
        {/* Fullscreen toggle */}
        <button
          onClick={() => setFullscreen((f) => !f)}
          className="absolute top-3 left-3 z-10 bg-white border border-gray-200 rounded-lg p-2 shadow-sm hover:bg-gray-50 transition-colors"
          title={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
        >
          {fullscreen ? (
            <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          )}
        </button>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
          fitViewOptions={{ padding: 0.3 }}
          minZoom={0.2}
          maxZoom={2}
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#f1f5f9" gap={20} />
          <Controls position="top-right" />
          <MiniMap
            nodeColor={() => "#E6F7FC"}
            maskColor="rgba(0,0,0,0.05)"
            style={{ border: "1px solid #E5E7EB", borderRadius: 8 }}
          />
        </ReactFlow>

        {/* Detail Panel inside fullscreen */}
        {fullscreen && selectedMember && (
          <div className="absolute bottom-4 left-4 right-4 max-w-2xl z-10">
            <DetailPanel
              member={selectedMember}
              referrerName={referrerName}
              onClose={() => setSelectedId(null)}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          </div>
        )}
      </div>

      {/* Detail Panel outside fullscreen */}
      {!fullscreen && selectedMember && (
        <div className="mt-4">
          <DetailPanel
            member={selectedMember}
            referrerName={referrerName}
            onClose={() => setSelectedId(null)}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </div>
      )}
    </div>
  );
}
