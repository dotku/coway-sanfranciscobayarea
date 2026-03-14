"use client";

import { useEffect, useState } from "react";

interface TreeMember {
  id: number;
  name: string;
  email: string;
  referral_code: string;
  referred_by: string | null;
  created_at: string;
  visit_count: number;
  signup_count: number;
}

interface TreeNode extends TreeMember {
  children: TreeNode[];
}

function buildTree(members: TreeMember[]): TreeNode[] {
  const codeMap = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  // Create nodes
  for (const m of members) {
    codeMap.set(m.referral_code, { ...m, children: [] });
  }

  // Build parent-child relationships
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

function TreeNodeCard({
  node,
  depth = 0,
}: {
  node: TreeNode;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className={depth > 0 ? "ml-6 sm:ml-10" : ""}>
      <div className="relative">
        {/* Connector line */}
        {depth > 0 && (
          <div className="absolute -left-6 sm:-left-10 top-0 bottom-0 flex items-center">
            <div className="w-6 sm:w-10 border-t border-gray-300" />
            <div className="absolute -left-0 top-0 h-1/2 border-l border-gray-300" />
          </div>
        )}

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-4 mb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                {node.children.length > 0 && (
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                  >
                    <svg
                      className={`h-4 w-4 transition-transform ${
                        expanded ? "rotate-90" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                )}
                <h3 className="font-semibold text-gray-900">{node.name}</h3>
                <span className="font-mono text-xs bg-[#E6F7FC] text-[#005A7A] px-2 py-0.5 rounded">
                  {node.referral_code}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{node.email}</p>
            </div>
            <div className="flex gap-4 flex-shrink-0 text-center">
              <div>
                <p className="text-lg font-bold text-[#00A8E3]">
                  {node.visit_count}
                </p>
                <p className="text-xs text-gray-400">Visits</p>
              </div>
              <div>
                <p className="text-lg font-bold text-[#00A8E3]">
                  {node.signup_count}
                </p>
                <p className="text-xs text-gray-400">Signups</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {expanded &&
        node.children.map((child) => (
          <TreeNodeCard key={child.id} node={child} depth={depth + 1} />
        ))}
    </div>
  );
}

export default function ReferralTree() {
  const [members, setMembers] = useState<TreeMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/team/tree")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMembers(data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-12 text-gray-500">Loading...</div>;
  }

  const tree = buildTree(members);
  const totalVisits = members.reduce((s, m) => s + m.visit_count, 0);
  const totalSignups = members.length;

  return (
    <div>
      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
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

      {/* Tree */}
      <div className="space-y-2">
        {tree.map((node) => (
          <TreeNodeCard key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}
