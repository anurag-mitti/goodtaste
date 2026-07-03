import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function AddLinksModal({ onClose }) {
  const [links, setLinks] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const urls = links.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    if (urls.length === 0) return;

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/ingest`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-admin-password': localStorage.getItem('adminToken') || ''
        },
        body: JSON.stringify({ urls })
      });
      if (!response.ok) throw new Error('Network response was not ok');
      toast.success(`${urls.length} URLs queued for processing!`);
      setLinks('');
      onClose();
    } catch (error) {
      toast.error('Failed to submit URLs. Is the backend running?');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background w-full max-w-lg rounded-xl p-6 shadow-2xl space-y-4">
        <h2 className="text-xl font-bold">Add Links to Process</h2>
        <p className="text-muted-foreground text-sm">Paste up to 30 URLs, one per line.</p>
        <Textarea 
          value={links}
          onChange={(e) => setLinks(e.target.value)}
          placeholder="https://amazon.com/product...&#10;https://instagram.com/reel/..."
          className="h-48 resize-none"
        />
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? 'Submitting...' : 'Process URLs'}
          </Button>
        </div>
      </div>
    </div>
  );
}
