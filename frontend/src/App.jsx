import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { Toaster, toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import AddLinksModal from './components/AddLinksModal';
import { ProductsGrid, WebsitesGrid, ReelsGrid, ManualUploadGrid, TrashGrid } from './components/DashboardSections';

const socket = io('http://localhost:3001');

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState({
    'Products': [],
    'Websites': [],
    'Reels': [],
    'Requires Manual Upload': [],
    'Trash': []
  });

  useEffect(() => {
    // Fetch initial data from MongoDB
    fetch('http://localhost:3001/api/urls')
      .then(res => res.json())
      .then(data => {
        const grouped = {
          'Products': [],
          'Websites': [],
          'Reels': [],
          'Requires Manual Upload': [],
          'Trash': []
        };
        data.forEach(item => {
          if (grouped[item.category]) {
            grouped[item.category].push(item);
          } else {
            grouped['Requires Manual Upload'].push(item);
          }
        });
        setItems(grouped);
      })
      .catch(err => console.error('Error fetching data:', err));
  }, []);

  useEffect(() => {
    socket.on('url_processed', (data) => {
      if (data.status === 'error') {
        toast.error(`Error processing ${data.url}`);
      } else {
        toast.success(`Categorized as ${data.category}: ${data.title}`);
      }

      setItems(prev => {
        const category = data.category || 'Requires Manual Upload';
        const list = prev[category] || [];
        if (list.find(i => i._id === data._id)) return prev;
        return {
          ...prev,
          [category]: [data, ...list]
        };
      });
    });

    return () => socket.off('url_processed');
  }, []);

  const handleUpdateFields = async (id, updates, currentCategory) => {
    try {
      const res = await fetch('http://localhost:3001/api/urls/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...updates })
      });
      
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }
      
      setItems(prev => {
        const list = prev[currentCategory] || [];
        const itemIndex = list.findIndex(i => i._id === id);
        if (itemIndex === -1) return prev;
        
        const itemToUpdate = { ...list[itemIndex], ...updates };
        const newList = [...list];
        
        if (updates.category && updates.category !== currentCategory) {
          newList.splice(itemIndex, 1);
          return {
            ...prev,
            [currentCategory]: newList,
            [updates.category]: [itemToUpdate, ...(prev[updates.category] || [])]
          };
        } else {
          newList[itemIndex] = itemToUpdate;
          return { ...prev, [currentCategory]: newList };
        }
      });
      if (updates.category && updates.category !== currentCategory) {
        toast.success(`Successfully moved to ${updates.category}`);
      } else {
        toast.success('Successfully updated');
      }
    } catch (err) {
      toast.error(`Failed to update: ${err.message}`);
    }
  };

  const handleDelete = async (id, currentCategory) => {
    try {
      const res = await fetch('http://localhost:3001/api/urls/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errText}`);
      }

      setItems(prev => {
        const list = prev[currentCategory] || [];
        const itemIndex = list.findIndex(i => i._id === id);
        if (itemIndex === -1) return prev;
        
        const itemToMove = list[itemIndex];
        const newList = [...list];
        newList.splice(itemIndex, 1);
        
        return {
          ...prev,
          [currentCategory]: newList,
          'Trash': [itemToMove, ...(prev['Trash'] || [])]
        };
      });
      toast('Item moved to Trash');
    } catch (err) {
      toast.error(`Failed to delete item: ${err.message}`);
    }
  };

  const handleClearTrash = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/urls/clear-trash', {
        method: 'POST'
      });
      if (!res.ok) throw new Error('Failed to clear trash');
      
      setItems(prev => ({
        ...prev,
        'Trash': []
      }));
      toast.success('Trash emptied successfully');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <Toaster position="bottom-right" richColors />
      
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">URL Ingestion Engine</h1>
            <p className="text-muted-foreground mt-1">Auto-categorize and extract metadata concurrently.</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Add Links
          </Button>
        </header>

        <main>
          <Tabs defaultValue="Products" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="Products">Products ({items['Products'].length})</TabsTrigger>
              <TabsTrigger value="Websites">Websites ({items['Websites'].length})</TabsTrigger>
              <TabsTrigger value="Reels">Reels ({items['Reels'].length})</TabsTrigger>
              <TabsTrigger value="Manual">Requires Manual Upload ({items['Requires Manual Upload'].length})</TabsTrigger>
              <TabsTrigger value="Trash">Trash ({items['Trash'].length})</TabsTrigger>
            </TabsList>
            
            <div className="mt-6 rounded-lg min-h-[500px]">
              <TabsContent value="Products" className="m-0">
                <ProductsGrid items={items['Products']} onUpdate={handleUpdateFields} onDelete={handleDelete} />
              </TabsContent>
              <TabsContent value="Websites" className="m-0">
                <WebsitesGrid items={items['Websites']} onUpdate={handleUpdateFields} onDelete={handleDelete} />
              </TabsContent>
              <TabsContent value="Reels" className="m-0">
                <ReelsGrid items={items['Reels']} onUpdate={handleUpdateFields} onDelete={handleDelete} />
              </TabsContent>
              <TabsContent value="Manual" className="m-0">
                <ManualUploadGrid items={items['Requires Manual Upload']} onUpdate={handleUpdateFields} onDelete={handleDelete} />
              </TabsContent>
              <TabsContent value="Trash" className="m-0">
                <TrashGrid items={items['Trash']} onClearTrash={handleClearTrash} />
              </TabsContent>
            </div>
          </Tabs>
        </main>
      </div>

      {isModalOpen && <AddLinksModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default App;
