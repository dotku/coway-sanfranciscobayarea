"use client";

import { useState, useEffect } from "react";

interface Address {
  id: number;
  label: string;
  address: string;
  zip_code: string | null;
  created_at: string;
}

export default function AddressManager() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [label, setLabel] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [saving, setSaving] = useState(false);

  async function fetchAddresses() {
    try {
      const res = await fetch("/api/addresses");
      const data = await res.json();
      if (Array.isArray(data)) setAddresses(data);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAddresses();
  }, []);

  function resetForm() {
    setLabel("");
    setAddress("");
    setZipCode("");
    setEditingId(null);
    setShowForm(false);
  }

  function startEdit(addr: Address) {
    setEditingId(addr.id);
    setLabel(addr.label);
    setAddress(addr.address);
    setZipCode(addr.zip_code || "");
    setShowForm(true);
  }

  function startAdd() {
    resetForm();
    setLabel(`Office ${addresses.length + 1}`);
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        const res = await fetch("/api/addresses", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, label, address, zip_code: zipCode }),
        });
        if (res.ok) {
          const updated = await res.json();
          setAddresses((prev) =>
            prev.map((a) => (a.id === editingId ? updated : a))
          );
        }
      } else {
        const res = await fetch("/api/addresses", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ label, address, zip_code: zipCode }),
        });
        if (res.ok) {
          const created = await res.json();
          setAddresses((prev) => [...prev, created]);
        }
      }
      resetForm();
    } catch {
      /* ignore */
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number, addrLabel: string) {
    if (!confirm(`Delete "${addrLabel}"?`)) return;

    try {
      const res = await fetch(`/api/addresses?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setAddresses((prev) => prev.filter((a) => a.id !== id));
      }
    } catch {
      /* ignore */
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500 text-sm">Loading addresses...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#005A7A]">
          My Locations 我的地址
        </h2>
        {!showForm && (
          <button
            onClick={startAdd}
            className="text-sm text-[#00A8E3] hover:text-[#0097CC] font-medium"
          >
            + Add Address
          </button>
        )}
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
          <form onSubmit={handleSave} className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Label 标签
              </label>
              <input
                type="text"
                required
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-[#00A8E3] focus:ring-2 focus:ring-[#00A8E3]/20 outline-none"
                placeholder="e.g. Office 1, Home"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address 地址
              </label>
              <textarea
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-[#00A8E3] focus:ring-2 focus:ring-[#00A8E3]/20 outline-none resize-none"
                placeholder="123 Main St, San Francisco, CA"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Zip Code 邮编
              </label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-900 focus:border-[#00A8E3] focus:ring-2 focus:ring-[#00A8E3]/20 outline-none"
                placeholder="94102"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-[#00A8E3] text-white text-sm font-medium hover:bg-[#0097CC] transition-colors disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : editingId
                    ? "Update"
                    : "Add"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Address List */}
      {addresses.length === 0 && !showForm ? (
        <div className="px-6 py-8 text-center">
          <p className="text-gray-400 text-sm">
            No addresses yet. Add your first location.
          </p>
          <p className="text-gray-400 text-sm">
            还没有地址，请添加您的第一个地点。
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="px-6 py-4 flex items-start justify-between gap-4"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 text-sm">
                  {addr.label}
                </p>
                <p className="text-sm text-gray-500 mt-0.5 whitespace-pre-line">
                  {addr.address}{addr.zip_code ? ` ${addr.zip_code}` : ""}
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={() => startEdit(addr)}
                  className="text-xs text-[#00A8E3] hover:text-[#0097CC] font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(addr.id, addr.label)}
                  className="text-xs text-red-500 hover:text-red-700 font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
