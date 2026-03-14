"use client";

import { useEffect, useState } from "react";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  phone: string;
  referral_code: string;
  referred_by: string | null;
  created_at: string;
}

export default function TeamTable() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchMembers() {
    try {
      const res = await fetch("/api/team");
      const data = await res.json();
      setMembers(data);
    } catch {
      console.error("Failed to fetch team members");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number, name: string) {
    if (!confirm(`Remove ${name} from the team?`)) return;

    try {
      const res = await fetch(`/api/team?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMembers((prev) => prev.filter((m) => m.id !== id));
      }
    } catch {
      console.error("Failed to delete member");
    }
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">Loading...</div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-[#005A7A]">
          Team Members ({members.length})
        </h2>
        <button
          onClick={fetchMembers}
          className="text-sm text-[#00A8E3] hover:text-[#0097CC] font-medium"
        >
          Refresh
        </button>
      </div>

      {members.length === 0 ? (
        <div className="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
          <p className="text-gray-500 mb-2">No team members yet</p>
          <p className="text-sm text-gray-400">
            New signups will appear here after they complete their profile.
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Referral Code
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Referred By
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {member.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <a
                        href={`mailto:${member.email}`}
                        className="text-[#00A8E3] hover:text-[#0097CC]"
                      >
                        {member.email}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <a
                        href={`tel:${member.phone}`}
                        className="text-[#00A8E3] hover:text-[#0097CC]"
                      >
                        {member.phone}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono font-medium text-[#005A7A]">
                      {member.referral_code || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">
                      {member.referred_by || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(member.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(member.id, member.name)}
                        className="text-sm text-red-500 hover:text-red-700 font-medium"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-gray-100">
            {members.map((member) => (
              <div key={member.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">
                    {member.name}
                  </span>
                  <button
                    onClick={() => handleDelete(member.id, member.name)}
                    className="text-sm text-red-500 hover:text-red-700 font-medium"
                  >
                    Remove
                  </button>
                </div>
                <div className="text-sm text-gray-600">
                  <a
                    href={`mailto:${member.email}`}
                    className="text-[#00A8E3]"
                  >
                    {member.email}
                  </a>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <a
                    href={`tel:${member.phone}`}
                    className="text-[#00A8E3]"
                  >
                    {member.phone}
                  </a>
                  <span className="font-mono text-[#005A7A] font-medium">
                    {member.referral_code || "—"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <span>
                    {member.referred_by
                      ? `Referred by: ${member.referred_by}`
                      : ""}
                  </span>
                  <span>
                    {new Date(member.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
